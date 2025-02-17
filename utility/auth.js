
import passport from "passport";
import LocalStrategy from "passport-local";
import { usersController } from "../controllers/controllers.js";
import { permissions } from "../utility/permissions.js";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const userDb = await usersController.getById(id);
        done(null, userDb);
    } catch (err) {
        done(err);    
    }
});

// Rejestracja użytkownika
passport.use(
    "local-signup",
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const userExists = await usersController.getUserByEmail(email);
            if (userExists) {
                return done(null, false); 
            }

            const userDb = await usersController.createUser({
                name: req.body.name,
                surname: req.body.surname,
                email: email,
                password: password,
                address: req.body.address,
                age: req.body.age,
                role: req.body.role || "student",
            });
            return done(null, userDb);
        } catch (err) {
            done(err);
        }
    })
);

// Autoryzacja
const authUser = async (req, email, password, done) => {
    try {
        const authenticatedUser = await usersController.getUserByEmail(email);

        if (!authenticatedUser) {

            return done(null, false);
        }

        const isPasswordValid = await usersController.validPassword(password, authenticatedUser);
        if (!isPasswordValid) {
            return done(null, false, { message: "Invalid password" });
        }

        return done(null, authenticatedUser);
    } catch (err) {
        return done(err);
    }
}

// Logowanie
passport.use(
    "local-login",
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    authUser)
);

export function checkUserRoleAccess(user, requiredRole) {
    const userRolePriority = permissions.getPriorityByRole(user.role);
    const requiredRolePriority = permissions.getPriorityByRole(requiredRole);

    if (userRolePriority >= requiredRolePriority) {
        return true;
    }

    return false;
}

export { passport };
