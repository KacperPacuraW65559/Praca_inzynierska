
import { permissions } from "./permissions.js";

function getGuestDefaultUser() {
    return {
        role: "student"
    };
}

// Middleware do autoryzacji
function authRole(req, res, next) {

    //return next(); 

    console.log("authRole() - middleware");

    const resource = req.route.path;
    const method = req.method.toLowerCase();
    console.log("resource:", resource, "method:", method);

    if (!req.user) {
        req.user = getGuestDefaultUser();  
    }

    console.log("req.user", req.user);
    
    if (permissions.isResourceAllowedForUser(req.user.role, resource, method)) {
        return next();
    } else {
        res.status(403);
        return res.render("pages/access_forbidden.ejs", {
        user: req.user
    });
    }
};

export {
    authRole
};
