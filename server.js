// inicjalizacja node: npm init -y
// aplikacja: npm install express ejs express-session bcryptjs passport passport-local mysql2 sequelize multer
// uruchamianie: npx nodemon server.js
// testy: npm install supertest jest selenium-webdriver chromedriver glob@latest

import express from "express";
import { passport } from "./utility/auth.js";
import upload from "./utility/upload.js";
import expressSession from "express-session";
import * as path from "path";
import fs from "fs"
import { dirname } from "path";
import { fileURLToPath } from "url";
import { authRole } from "./utility/aclauth.js";
import { htmlHelper } from "./helpers/htmlHelper.js";

import { usersController, coursesController, lessonsController, progressController, enrollmentController, bookmarksController, libraryController, quizzesController, feedbackController } from "./controllers/controllers.js";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.urlencoded({ extended: true }));

app.locals.htmlHelper = htmlHelper;

app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    next();
}

const checkRole = (requiredRole) => (req, res, next) => {
    if (req.isAuthenticated() && htmlHelper.hasAccessForUserRoleOrHigher(req.user.role, requiredRole)) {
        return next();
    }
    res.status(403);
    return res.render("pages/access_forbidden.ejs", {
        user: req.user
    });
};

const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.static("./public"));

const imagesPath = path.join(__dirname, "public", "resources", "images");
function getImagesList() {
    try {
        return fs.readdirSync(imagesPath).filter(file => {
            return /\.(png|jpg|jpeg|gif)$/i.test(file);
        });
    } catch (err) {
        console.error("Error: ", err.message);
        return [];
    }
}

// Rejestracja
app.get("/register", checkLoggedIn, async (req, res) => {
    const courses = await coursesController.getAll();
    res.render("pages/register.ejs", {
        user: req.user,
        courses: courses
    });
});

app.post("/register", passport.authenticate("local-signup", {
    successRedirect: "/login?reg=success",
    failureRedirect: "/register?reg=failure"
}));

// Logowanie
app.get("/login", checkLoggedIn, (req, res) => {
    res.render("pages/login.ejs", {
        user: req.user
    });
});

app.post("/login", passport.authenticate("local-login", {
    successRedirect: "/dashboard",
    failureRedirect: "/login?log=failure"
}));

// Wylogowanie
app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect("/");
    });
});

// Dashboard po logowaniu
app.get("/dashboard", checkAuthenticated, (req, res) => {
    if (req.user.role === "admin") {
        return res.redirect("/admin/dashboard");
    } else {
        res.render("pages/dashboard.ejs", {
            user: req.user
        });
    }
});

//******************
//***** PROFIL *****
//******************
app.get("/profile/view", checkAuthenticated, async (req, res) => {
    try {
        const user = await usersController.getById(req.user.id);
        res.render("pages/profile/profile_view", { user });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania profilu.");
    }
});

app.get("/profile/edit", checkAuthenticated, async (req, res) => {
    try {
        const user = await usersController.getById(req.user.id);
        const courses = await coursesController.getAll();
        res.render("pages/profile/profile_edit", { user, courses });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania edycji profilu.");
    }
});

app.post("/profile/edit", checkAuthenticated, async (req, res) => {
    const { name, surname, email, address, age, password, confirmPassword } = req.body;
    const userId = req.user.id;

    try {
        const userData = {
            name,
            surname,
            email,
            address,
            age
        };

        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                return res.status(400).send("Hasła się nie zgadzają.");
            }
            userData.password = await usersController.hashPassword(password);
        }

        await usersController.updateById(userId, userData);
        res.redirect("/profile/view");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd aktualizacji profilu.");
    }
});

//*****************
//***** ADMIN *****
//*****************
app.get("/admin/dashboard", checkAuthenticated, checkRole("admin"), async (req, res) => {
    try {
        res.render("pages/admin/dashboard", { user: req.user });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania dashboardu.");
    }
});

app.get("/admin/users", checkAuthenticated, checkRole("admin"), async (req, res) => {
    try {
        const adminCount = await usersController.getAllUsersByRole("admin").then(users => users.length);
        const teacherCount = await usersController.getAllUsersByRole("teacher").then(users => users.length);
        const studentCount = await usersController.getAllUsersByRole("student").then(users => users.length);
        const recentUsers = await usersController.getRecentUsers();
        
        res.render("pages/admin/users", {
            user: req.user,
            adminCount,
            teacherCount,
            studentCount,
            recentUsers
        });
    } catch (error) {
        console.error("Error loading user dashboard:", error.message);
        res.status(500).send("Błąd ładowania dashboardu");
    }
});

app.get("/users/admins", checkAuthenticated, checkRole("admin"), async (req, res) => {
    try {
        const admins = await usersController.getAllUsersByRole("admin");
        res.render("pages/admin/user_admin_list", {
            user: req.user,
            admins
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania listy administratorów.");
    }
});

app.get("/admin/users/:id/edit", checkAuthenticated, checkRole("admin"), async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    try {
        const user = await usersController.getById(userId);
        if (!user) {
            return res.status(404).send("Nie znaleziono użytkownika");
        }

        res.render("pages/admin/user_edit", {
            user: req.user,
            editUser: user
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania edycji");
    }
});

app.post("/admin/users/:id/edit", checkAuthenticated, checkRole("admin"), async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    try {
        const updatedData = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            address: req.body.address,
            age: req.body.age,
            role: req.body.role,
        };

        if (req.body.password && req.body.password === req.body.confirmPassword) {
            updatedData.password = await usersController.hashPassword(req.body.password);
        }

        await usersController.updateById(userId, updatedData);
        res.redirect("/admin/users"); // Powrót do listy użytkowników
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd edytcji danych");
    }
});

app.get("/admin/users/:id/view", checkAuthenticated, checkRole("admin"), async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    try {
        const user = await usersController.getById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("pages/admin/user_view", {
            user: req.user,
            viewUser: user,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania danych z profilu");
    }
});


app.get("/users/add", checkAuthenticated, checkRole("admin"), (req, res) => {
    res.render("pages/admin/user_add", {
        user: req.user
    });
});

app.post("/users/add", checkAuthenticated, checkRole("admin"), async (req, res) => {
    const { name, surname, email, password, confirmPassword, address, age, role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send("Hasła się nie zgadzają");
    }

    try {
        const newUser = await usersController.createUser({
            name,
            surname,
            email,
            password,
            address,
            age,
            role
        });
        res.redirect("/admin/users");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania użytkownika");
    }
});

app.get("/admin/users/students", checkAuthenticated, checkRole("admin"), async (req, res) => {
    try {
        const students = await usersController.getAllUsersByRole("student");
        res.render("pages/admin/user_student_list", {
            user: req.user,
            students
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania listy studentów");
    }
});

app.post("/admin/users/:id/delete", checkAuthenticated, checkRole("admin"), async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    try {
        const user = await usersController.getById(userId);
        if (!user) {
            return res.status(404).send("Nie znaleziono użytkownika");
        }

        await usersController.deleteById(userId);
        res.redirect("/admin/users");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia użytkownika");
    }
});

app.get("/admin/users/teachers", checkAuthenticated, checkRole("admin"), async (req, res) => {
    try {
        const teachers = await usersController.getAllUsersByRole("teacher");
        res.render("pages/admin/user_teacher_list.ejs", {
            user: req.user,
            teachers
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania listy nauczycieli");
    }
});

app.get("/admin/all_users", checkAuthenticated, authRole, async (req, res) => {
    try {
        const admins = await usersController.getAllUsersByRole("admin");
        const teachers = await usersController.getAllUsersByRole("teacher");
        const students = await usersController.getAllUsersByRole("student");

        res.render("pages/admin/all_users.ejs", {
            user: req.user,
            admins,
            teachers,
            students,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania listy użytkowników");
    }
});

//*******************
//****** KURSY ******
//*******************
app.get("/courses", async (req, res) => {
    const courses = await coursesController.getAll();
    res.render("pages/courses/index.ejs", {
        user: req.user,
        courses: courses
    });
});

app.get("/courses/add", checkAuthenticated, authRole, async (req, res) => {
    try {
        const teachers = await usersController.getAllUsersByRole("teacher");
        res.render("pages/courses/course_add", {
            user: req.user,
            teachers,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania widoku dodania kursu");
    }
});

app.post("/courses/add", checkAuthenticated, authRole, async (req, res) => {
    try {
        const { title, description, difficulty, teacherId } = req.body;

        const teacher = teacherId ? await usersController.getById(teacherId) : null;

        await coursesController.createCourse({ title, description, difficulty }, teacher);
        res.redirect("/courses");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania kursu");
    }
});

app.get("/courses/mycourses", checkAuthenticated, async (req, res) => {
    try {
        const userCourses = await coursesController.getUserCourses(req.user.id);
        const allCourses = await coursesController.getAll();

        for (const course of userCourses) {
            course.completionPercentage = await progressController.calculateCourseCompletion(req.user.id, course.id);
        }

        res.render("pages/courses/my_courses", {
            user: req.user,
            userCourses: userCourses,
            allCourses: allCourses
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania kursów");
    }
});

app.get("/courses", async (req, res) => {
    try {
        const allCourses = await coursesController.getAll();
        res.render("pages/courses/index.ejs", {
            user: req.user,
            courses: allCourses,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania listy kursów");
    }
});

app.get("/courses/all", checkAuthenticated, checkRole(["admin", "teacher"]), async (req, res) => {
    try {
        const courses = await coursesController.getAll();
        res.render("pages/courses/all_courses", { user: req.user, courses });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania listy wszystkich kursów.");
    }
});

app.get("/courses/:id/details", async (req, res) => {
    const courseId = parseInt(req.params.id, 10);

    try {
        const course = await coursesController.getFullDataById(courseId);
        if (!course) {
            return res.status(404).send("Nie znaleziono kursu.");
        }

        const userCourses = req.user
            ? await coursesController.getUserCourses(req.user.id)
            : [];

        const lessonCount = course.Lessons ? course.Lessons.length : 0;
        res.render("pages/courses/course_details.ejs", {
            user: req.user,
            course,
            userCourses,
            lessonCount
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania szczegółów kursów");
    }
});

app.post("/courses/:id/delete", checkAuthenticated, authRole, async (req, res) => {
    const courseId = parseInt(req.params.id, 10);

    try {
        await coursesController.deleteById(courseId);
        res.redirect("/courses");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usuwania kursu");
    }
});

app.get("/courses/:id/edit", checkAuthenticated, authRole, async (req, res) => {
    try {
        const courseId = parseInt(req.params.id, 10);
        const course = await coursesController.getById(courseId);

        if (!course) {
            return res.status(404).send("Nie znaleziono kursu");
        }

        const teachers = await usersController.getAllUsersByRole("teacher");
        res.render("pages/courses/course_edit", {
            user: req.user,
            course,
            teachers,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania widoku edycji kursu");
    }
});

app.post("/courses/:id/edit", checkAuthenticated, authRole, async (req, res) => {
    try {
        const courseId = parseInt(req.params.id, 10);
        const { title, description, difficulty, teacherId } = req.body;

        const teacher = teacherId ? await usersController.getById(teacherId) : null;

        await coursesController.updateById(courseId, { title, description, difficulty }, teacher);
        res.redirect("/courses");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd edycji kursu");
    }
});

app.get("/courses/:id", checkAuthenticated, async (req, res) => {
    const courseId = req.params.id;

    try {
        const course = await coursesController.getById(courseId);
        if (!course) {
            return res.status(404).send("Nie znaleziono kursu");
        }

        const lessons = await lessonsController.getLessonsByCourse(courseId) || [];
        let userProgress = [];
        let userBookmarks = [];

        try {
            userProgress = await progressController.getUserProgressForLessons(req.user.id);
            userBookmarks = await bookmarksController.getUserBookmarksLesson(req.user.id);
        } catch (error) {
            console.error("Error: ", error.message);
        }

        const lessonsWithStatus = lessons.map(lesson => ({
            ...lesson.dataValues,
            completed: userProgress.some(progress => progress.lessonId === lesson.id),
            bookmarked: userBookmarks.some(bookmark => bookmark.lessonId === lesson.id)
        }));

        res.render("pages/courses/course_view", {
            user: req.user,
            course,
            lessons: lessonsWithStatus
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania widoku kursu");
    }
});

app.get("/teacher/mycourses", checkAuthenticated, checkRole("teacher"), async (req, res) => {
    try {
        const teacherCourses = await coursesController.getCoursesByTeacher(req.user.id);
        res.render("pages/teacher/my_courses", { user: req.user, teacherCourses });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania kursów nauczyciela");
    }
});

app.get("/admin/enrollments", checkAuthenticated, authRole, async (req, res) => {
    try {
        const coursesWithUsers = await coursesController.getCoursesWithUsers();
        res.render("pages/courses/admin_courses", {
            user: req.user,
            courses: coursesWithUsers
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania zapisów na kurs");
    }
});

//******************
//***** LEKCJE *****
//******************
app.get("/lessons/lesson/:id", async (req, res) => {
    const lessonId = req.params.id;

    try {
        const lesson = await lessonsController.getById(lessonId);

        if (!lesson) {
            return res.status(404).send("Lesson not found");
        }

        const course = await coursesController.getById(lesson.courseId);
        const previousLesson = await lessonsController.getPreviousLesson(lesson.order_number, lesson.courseId);
        const nextLesson = await lessonsController.getNextLesson(lesson.order_number, lesson.courseId);

        const userBookmarks = req.user
            ? await bookmarksController.getUserBookmarksLesson(req.user.id)
            : [];

        const userProgress = req.user
        ? await progressController.getUserProgress(req.user.id)
        : [];

        res.render("pages/lessons/lesson.ejs", {
            user: req.user,
            lesson,
            course,
            previousLessonId: previousLesson ? previousLesson.id : null,
            nextLessonId: nextLesson ? nextLesson.id : null,
            userBookmarks,
            userProgress
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania widoku lekcji");
    }
});

app.get("/lessons/add", checkAuthenticated, authRole, async (req, res) => {
    const courses = await coursesController.getAll(); // Pobierz listę kursów
    const images = await getImagesList(); // Pobierz listę obrazków
    res.render("pages/lessons/lesson_add", {
        user: req.user,
        courses,
        images
    });
});

app.post("/lessons/add", checkAuthenticated, authRole, async (req, res) => {
    const {
        courseId,
        title,
        intro,
        content,
        example_1,
        example_1_description,
        example_2,
        example_2_description,
        summary,
        order_number
    } = req.body;

    try {
        const course = await coursesController.getById(courseId);
        if (!course) {
            return res.status(404).send("Nie znaleziono kursu");
        }

        await lessonsController.createLesson({
            title,
            intro,
            content,
            example_1: example_1 || null,
            example_1_description,
            example_2: example_2 || null,
            example_2_description,
            summary,
            order_number
        }, course);

        res.redirect(`/courses/${courseId}`); // Przekierowanie do widoku kursu
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania lekcji");
    }
});

app.get("/lessons/lesson/:id/edit", checkAuthenticated, authRole, async (req, res) => {
    const lessonId = parseInt(req.params.id, 10);

    const lesson = await lessonsController.getById(lessonId);

    if (!lesson) {
        return res.status(404).send("Nie znaleziono lekcji");
    }

    const images = await getImagesList();

    res.render("pages/lessons/lesson_edit.ejs", {
        user: req.user,
        lesson,
        images
    });
});

app.post("/lessons/lesson/:id/edit", checkAuthenticated, authRole, async (req, res) => {
    const lessonId = parseInt(req.params.id, 10);

    try {
        await lessonsController.updateById(lessonId, {
            title: req.body.title,
            intro: req.body.intro,
            content: req.body.content,
            example_1: req.body.example_1 === "" ? null : req.body.example_1, 
            example_1_description: req.body.example_1_description,
            example_2: req.body.example_2 === "" ? null : req.body.example_2,
            example_2_description: req.body.example_2_description,
            summary: req.body.summary,
            order_number: req.body.order_number
        });

        res.redirect(`/lessons/lesson/${lessonId}`);
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd edycji lekcji");
    }
});

app.post("/lessons/:id/delete", checkAuthenticated, authRole, async (req, res) => {
    const lessonId = parseInt(req.params.id, 10);

    try {
        await lessonsController.deleteById(lessonId);
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia lekcji");
    }
});

//********************
//***** ZAKŁADKI *****
//********************
app.get("/bookmarks", checkAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const bookmarks = await bookmarksController.getUserAllBookmarks(userId);
        res.render("pages/bookmarks", { bookmarks, user: req.user });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładoawania widoku zakładek");
    }
});

app.post("/bookmarks/:id/remove", checkAuthenticated, async (req, res) => {
    try {
        const bookmarkId = parseInt(req.params.id, 10);
        await bookmarksController.deleteById(bookmarkId);
        res.redirect("/bookmarks");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia zakładki");
    }
});

app.post("/lessons/lesson/:id/add-bookmark", checkAuthenticated, async (req, res) => {
    const lessonId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    try {
        await bookmarksController.createBookmark(userId, lessonId);
        res.redirect(`/lessons/lesson/${lessonId}`);
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania zakładki");
    }
});

app.post("/lessons/lesson/:id/remove-bookmark", checkAuthenticated, async (req, res) => {
    const lessonId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    try {
        await bookmarksController.deleteBookmark(userId, lessonId);
        res.redirect(`/lessons/lesson/${lessonId}`);
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia zakładki w lekcji");
    }
});

app.post("/library/chords/:id/add-bookmark", checkAuthenticated, async (req, res) => {
    const chordId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    try {
        await bookmarksController.createChordBookmark(userId, chordId);
        res.redirect("/library/chords");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania zakładki na akordzie");
    }
});

app.post("/library/chords/:id/remove-bookmark", checkAuthenticated, async (req, res) => {
    const chordId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    try {
        await bookmarksController.deleteChordBookmark(userId, chordId);
        res.redirect("/library/chords");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia zakładki na akordzie");
    }
});

app.post("/library/scales/:id/add-bookmark", checkAuthenticated, async (req, res) => {
    const scaleId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    try {
        await bookmarksController.createChordBookmark(userId, scaleId);
        res.redirect("/library/scales");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania zakładki na skali");
    }
});

app.post("/library/scales/:id/remove-bookmark", checkAuthenticated, async (req, res) => {
    const scaleId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    try {
        await bookmarksController.deleteChordBookmark(userId, scaleId);
        res.redirect("/library/scales");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia zakładki na skali");
    }
});

//*******************
//***** POSTĘP ******
//*******************
app.post("/lessons/lesson/:id/add-progress", checkAuthenticated, async (req, res) => {
    const lessonId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    try {
        await progressController.createProgress(userId, lessonId);
        res.redirect(`/lessons/lesson/${lessonId}`);
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania ukończenia lekcji");
    }
});

app.post("/lessons/lesson/:id/remove-progress", checkAuthenticated, async (req, res) => {
    const lessonId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    try {
        await progressController.deleteProgress(userId, lessonId);
        res.redirect(`/lessons/lesson/${lessonId}`);
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia ukończenia lekcji");
    }
});


//************************
//**** ZAPIS NA KURS *****
//************************
app.post("/courses/:id/enroll", checkAuthenticated, async (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    if (req.user.role === "admin" || req.user.role === "teacher") {
        return res.status(403).send("Admini i nauczyciele nie mogą zapisywać się na kursy.");
    }

    try {
        const enrollment = await enrollmentController.enrollUser(userId, courseId);
        res.redirect("/courses/mycourses");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd zapisu użytkownika na kurs.");
    }
});

app.post("/admin/enrollments/:courseId/users/:userId/remove", checkAuthenticated, authRole, async (req, res) => {
    const courseId = parseInt(req.params.courseId, 10);
    const userId = parseInt(req.params.userId, 10);

    try {
        await enrollmentController.removeEnrollment(userId, courseId);
        res.redirect("/admin/enrollments");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia zapisu użytkownika na kurs");
    }
});


//***********************
//***** BIBLIOTEKA ******
//***********************
app.get("/library", checkAuthenticated, async (req, res) => {
    res.render("pages/library/dashboard", { user: req.user });
});

app.get("/library/chords", checkAuthenticated, async (req, res) => {
    try {
        const chords = await libraryController.getAllChords();
        let userBookmarks = [];

        if (req.user) {
            userBookmarks = await bookmarksController.getUserBookmarks(req.user.id);
        }

        res.render("pages/library/chords", { chords, user: req.user, userBookmarks });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania akordów");
    }
});

app.get("/library/chords/add", checkAuthenticated, authRole, (req, res) => {
    const images = getImagesList();
    res.render("pages/library/add_chord", {
        user: req.user,
        images
    });
});

app.post("/library/chords/add", checkAuthenticated, authRole, async (req, res) => {
    try {
        await libraryController.createEntry({
            name: req.body.name,
            type: "chord",
            imagePath: req.body.imagePath,
            description: req.body.description
        });
        res.redirect("/library/chords");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania akordu");
    }
});

app.get("/library/chords/:id/edit", checkAuthenticated, authRole, async (req, res) => {
    try {
        const images = getImagesList();
        const chord = await libraryController.getById(req.params.id);
        if (!chord) {
            return res.status(404).send("Nie znaleziono akordu");
        }
        res.render("pages/library/edit_chord", { chord, user: req.user, images });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania widoku edycji akordu");
    }
});

app.post("/library/chords/:id/edit", checkAuthenticated, authRole, async (req, res) => {
    try {
        await libraryController.updateById(req.params.id, {
            name: req.body.name,
            imagePath: req.body.imagePath,
            description: req.body.description
        });
        res.redirect("/library/chords");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd edycji akordu");
    }
});

app.post("/library/chords/:id/delete", checkAuthenticated, authRole, async (req, res) => {
    try {
        await libraryController.deleteById(req.params.id);
        res.redirect("/library/chords");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia akordu");
    }
});

app.get("/library/scales", checkAuthenticated, async (req, res) => {
    try {
        const scales = await libraryController.getAllScales();
        const userBookmarks = req.user
            ? await bookmarksController.getUserBookmarks(req.user.id)
            : [];
        res.render("pages/library/scales", { scales, user: req.user, userBookmarks });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Bład ładowania skal");
    }
});

app.get("/library/scales/add", checkAuthenticated, authRole, (req, res) => {
    const images = getImagesList();
    res.render("pages/library/add_scale", {
        user: req.user,
        images
    });
});

app.post("/library/scales/add", checkAuthenticated, authRole, async (req, res) => {
    try {
        await libraryController.createEntry({
            name: req.body.name,
            type: "scale",
            imagePath: req.body.imagePath,
            description: req.body.description
        });
        res.redirect("/library/scales");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania skali");
    }
});

app.get("/library/scales/:id/edit", checkAuthenticated, authRole, async (req, res) => {
    try {
        const images = getImagesList();
        const scale = await libraryController.getById(req.params.id);
        if (!scale) {
            return res.status(404).send("Nie znaleziono skali");
        }
        res.render("pages/library/edit_scale", { scale, user: req.user, images });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania widoku edycji skali");
    }
});

app.post("/library/scales/:id/edit", checkAuthenticated, authRole, async (req, res) => {
    try {
        await libraryController.updateById(req.params.id, {
            name: req.body.name,
            imagePath: req.body.imagePath || null,
            description: req.body.description
        });
        res.redirect("/library/scales");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd edycji skali");
    }
});

app.post("/library/scales/:id/delete", checkAuthenticated, authRole, async (req, res) => {
    try {
        await libraryController.deleteById(req.params.id);
        res.redirect("/library/scales");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia skali");
    }
});

//*************************
//***** UPLOAD PLIKÓW *****
//*************************
app.get("/manage-files/upload", checkAuthenticated, authRole, (req, res) => {
    res.render("pages/manage_files/upload", { user: req.user });
});

app.post("/manage-files/upload", checkAuthenticated, authRole, upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("Nie wysłano pliku.");
        }
        res.render("pages/manage_files/upload_success", {
            user: req.user,
            fileName: req.file.filename,
            filePath: `/resources/images/${req.file.filename}`,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd przesłania pliku.");
    }
});

app.post("/manage-files/delete", checkAuthenticated, authRole, (req, res) => {
    const { fileName } = req.body;
    const filePath = path.join(__dirname, "public/resources/images", fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error: ", err.message);
            return res.status(500).send("Błąd usunięcia pliku");
        }

        res.render("pages/manage_files/delete_success", { user: req.user });
    });
});


app.get("/manage-files", checkAuthenticated, authRole, (req, res) => {
    const directoryPath = path.join(__dirname, "public/resources/images");

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error("Error: ", err.message);
            return res.status(500).send("Błąd ładowania plików");
        }

        res.render("pages/manage_files/dashboard", { user: req.user, files });
    });
});

//*****************
//***** QUIZY *****
//*****************
app.get("/quizzes", checkAuthenticated, async (req, res) => {
    const quizzes = await quizzesController.getAllQuizzes();
    res.render("pages/quizzes/index", { user: req.user, quizzes });
});

app.get("/quizzes/:id/details", checkAuthenticated, async (req, res) => {
    const quizId = parseInt(req.params.id, 10);

    try {
        const quizDetails = await quizzesController.getQuizDetails(quizId);

        if (!quizDetails) {
            return res.status(404).send("Nie znaleziono quizu.");
        }

        res.render("pages/quizzes/details", {
            user: req.user,
            quiz: quizDetails,
            questions: quizDetails.Questions,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania szczegółów quizu.");
    }
});

app.post("/quizzes/:id/submit", async (req, res) => {
    const quizId = parseInt(req.params.id, 10);
    const userAnswers = req.body;

    try {
        const { score, totalQuestions } = await quizzesController.evaluateQuiz(quizId, userAnswers);
        const percentage = Math.round((score / totalQuestions) * 100);

        res.render("pages/quizzes/results", {
            user: req.user,
            score,
            totalQuestions,
            percentage,
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Błąd ukończenia quizu.");
    }
});

app.get("/quizzes/add", checkAuthenticated, checkRole(["admin", "teacher"]), (req, res) => {
    res.render("pages/quizzes/add", { user: req.user });
});

app.post("/quizzes/add", checkAuthenticated, checkRole(["admin", "teacher"]), async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        if (!title || !questions || questions.length === 0) {
            return res.status(400).send("Brak wymaganych danych.");
        }

        await quizzesController.createQuizWithQuestions(
            { title, description },
            questions
        );

        res.redirect("/quizzes");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd dodania quizu.");
    }
});

app.get("/quizzes/:id/edit", checkAuthenticated, checkRole(["admin", "teacher"]), async (req, res) => {
    const quizId = parseInt(req.params.id, 10);

    try {
        const quiz = await quizzesController.getQuizDetails(quizId);

        if (!quiz) {
            return res.status(404).send("Nie znaleziono quizu.");
        }

        res.render("pages/quizzes/edit", {
            user: req.user,
            quiz,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania widoku edycji kursu.");
    }
});

app.post("/quizzes/:id/edit", async (req, res) => {
    const quizId = parseInt(req.params.id, 10);

    try {
        await quizzesController.updateQuiz(quizId, req.body);
        res.redirect(`/quizzes/${quizId}/details`);
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Bład edycji kursu.");
    }
});

app.post("/quizzes/:id/delete", checkAuthenticated, checkRole("admin", "teacher"), async (req, res) => {
    const quizId = parseInt(req.params.id, 10);

    try {
        await quizzesController.deleteQuiz(quizId);
        res.redirect("/quizzes");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd usunięcia quizu.");
    }
});

//******************
//***** OPINIE *****
//******************
app.get("/feedback", checkAuthenticated, async (req, res) => {
    try {
        const feedbacks = await feedbackController.getUserFeedback(req.user.id);
        res.render("pages/feedback/feedback_user_list", { user: req.user, feedbacks });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd ładowania listy opinii.");
    }
});

app.get("/feedback/send", checkAuthenticated, (req, res) => {
    res.render("pages/feedback/feedback_send", { user: req.user });
});

app.post("/feedback/send", checkAuthenticated, async (req, res) => {
    const { subject, body } = req.body;
    try {
        await feedbackController.createFeedback(req.user.id, subject, body);
        res.redirect("/feedback");
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd wysyłania opinii.");
    }
});

app.get("/admin/feedback", checkAuthenticated, checkRole("admin"), async (req, res) => {
    const feedbacks = await feedbackController.getAllFeedback();
    res.render("pages/feedback/feedback_admin_list", { user: req.user, feedbacks });
});

app.get("/admin/feedback/:id", checkAuthenticated, checkRole("admin"), async (req, res) => {
    const feedback = await feedbackController.getFeedbackById(req.params.id);
    res.render("pages/feedback/feedback_view", { user: req.user, feedback });
});

app.post("/admin/feedback/:id/reply", checkAuthenticated, checkRole("admin"), async (req, res) => {
    const { reply } = req.body;
    try {
        await feedbackController.replyToFeedback(req.params.id, reply);
        res.redirect(`/admin/feedback/${req.params.id}`);
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).send("Błąd wysłania odpowiedzi na opinię.");
    }
});

// Metronom
app.get('/metronome', checkAuthenticated, (req, res) => {
    res.render('pages/metronome', { 
        user: req.user 
    });
});

// Warunki użytkowania
app.get("/tos", (req, res) => {
    res.render("pages/tos", { 
        user: req.user
    });
});

app.get("/privacy", (req, res) => {
    res.render("pages/privacy", {
        user: req.user
    });
});

// Strona główna
app.get("/", (req, res) => {
    res.render("pages/index.ejs", {
        user: req.user
    });
});

// Start serwera port 3010
app.listen(3010, () => {
    console.log("\nServer started at port 3010.");
});

export default app;