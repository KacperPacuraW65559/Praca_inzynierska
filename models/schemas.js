
import { sequelize } from "../utility/db.js";
import { User } from "./user.model.js";
import { Lesson } from "./lesson.model.js";
import { Course } from "./course.model.js";
import { Bookmark } from "./bookmark.model.js";
import { Library } from "./library.model.js";
import { Progress } from "./progress.model.js";
import { Enrollment } from "./enrollment.model.js";
import { Quiz } from "./quiz.model.js";
import { Answer } from "./answer.model.js";
import { Question } from "./question.model.js";
import { Feedback } from "./feedback.model.js";

// User i kurs
const UserCourse = sequelize.define("UserCourse", {}, { timestamps: false });
User.belongsToMany(Course, {
    through: UserCourse,
    foreignKey: "userId"
});
Course.belongsToMany(User, {
    through: UserCourse,
    foreignKey: "courseId"
});

// Kurs i lekcje
Course.hasMany(Lesson, {
    foreignKey: "courseId"
});
Lesson.belongsTo(Course, {
    foreignKey: "courseId"
});

// userzy i kursy
User.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(User, { through: Enrollment });


// user zakładki lekcje
User.hasMany(Bookmark, {
    foreignKey: "userId"
});
Bookmark.belongsTo(User, {
    foreignKey: "userId"
});

// user zakladki biblioteka
Library.hasMany(Bookmark, {
    foreignKey: "libraryId",
});
Bookmark.belongsTo(Library, {
    foreignKey: "libraryId",
});

// lekcja zakładki
Lesson.hasMany(Bookmark, {
    foreignKey: "lessonId"
});
Bookmark.belongsTo(Lesson, {
    foreignKey: "lessonId"
});

// user postęp
User.hasMany(Progress, {
    foreignKey: "userId"
});
Progress.belongsTo(User, {
    foreignKey: "userId"
});

// lekcja progres
Lesson.hasMany(Progress, {
    foreignKey: "lessonId"
});
Progress.belongsTo(Lesson, {
    foreignKey: "lessonId"
});

// kursy nauczyciele
Course.belongsTo(User, {
    as: 'teacher',
    foreignKey: 'teacherId',
});
User.hasMany(Course, {
    as: 'courses',
    foreignKey: 'teacherId',
});

//Admin opinia
User.hasMany(Feedback, { foreignKey: "userId" });
Feedback.belongsTo(User, { foreignKey: "userId" });

//quizy
Quiz.hasMany(Question, { foreignKey: "quizId" });
Question.belongsTo(Quiz, { foreignKey: "quizId" });
Question.hasMany(Answer, { foreignKey: "questionId" });
Answer.belongsTo(Question, { foreignKey: "questionId" });

// Reset bazy danych i utworzenie rekordów i tabel od nowa
await sequelize.sync( { force: true } );

export {
    User,
    Lesson,
    Course,
    Bookmark,
    Library,
    Progress,
    Enrollment,
    Quiz,
    Answer,
    Question,
    Feedback
}