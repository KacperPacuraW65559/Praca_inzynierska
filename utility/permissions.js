
const usersRoles = [
    {
        role: "admin",
        priority: 5,
        allows: [
            { resource: "/admin/dashboard", permissions: "*" },
            { resource: "/courses/add", permissions: "*" },
            { resource: "/courses/:id/edit", permissions: "*" },
            { resource: "/courses/view/:id", permissions: "*" },
            { resource: "/courses/:id/delete", permissions: "*" },
            { resource: "/courses/all", permissions: "*" },
            { resource: "/admin/enrollments", permissions: "*" },
            { resource: "/admin/enrollments/:courseId/users/:userId/remove", permissions: "*" },
            { resource: "/admin/users", permissions: "*" },
            { resource: "/admin/users/add", permissions: "*" },
            { resource: "/admin/users/:id/edit", permissions: "*" },
            { resource: "/admin/users/view/:id", permissions: "*" },
            { resource: "/admin/all_users", permissions: "*" },
            { resource: "/lessons/add", permissions: "*" },
            { resource: "/lessons/lesson/:id/edit", permissions: "*" },
            { resource: "/lessons/:id/delete", permissions: "*" },
            { resource: "/library/chords/add", permissions: "*" },
            { resource: "/library/chords/:id/edit", permissions: "*" },
            { resource: "/library/chords/:id/delete", permissions: "*" },
            { resource: "/library/scales/add", permissions: "*" },
            { resource: "/library/scales/:id/edit", permissions: "*" },
            { resource: "/library/scales/:id/delete", permissions: "*" },
            { resource: "/manage-files", permissions: "*" },
            { resource: "/manage-files/upload", permissions: "*" },
            { resource: "/manage-files/delete", permissions: "*" },
            { resource: "/quizzes/add", permissions: "*" },
            { resource: "/quizzes/:id/edit", permissions: "*" },
            { resource: "/quizzes/:id/delete", permissions: "*" },
        ]
    },
    {
        role: "teacher",
        priority: 4,
        allows: [
            { resource: "/teacher/dashboard", permissions: "*" },
            { resource: "/courses/add", permissions: "*" },
            { resource: "/courses/:id/edit", permissions: "*" },
            { resource: "/courses/view/:id", permissions: "*" },
            { resource: "/courses/:id/delete", permissions: "*" },
            { resource: "/courses/all", permissions: "*" },
            { resource: "/lessons/add", permissions: "*" },
            { resource: "/lessons/lesson/:id/edit", permissions: "*" },
            { resource: "/lessons/:id/delete", permissions: "*" },
            { resource: "/library/chords/add", permissions: "*" },
            { resource: "/library/chords/:id/edit", permissions: "*" },
            { resource: "/library/chords/:id/delete", permissions: "*" },
            { resource: "/library/scales/add", permissions: "*" },
            { resource: "/library/scales/:id/edit", permissions: "*" },
            { resource: "/library/scales/:id/delete", permissions: "*" },
            { resource: "/manage-files", permissions: "*" },
            { resource: "/manage-files/upload", permissions: "*" },
            { resource: "/manage-files/delete", permissions: "*" },
            { resource: "/quizzes/add", permissions: "*" },
            { resource: "/quizzes/:id/edit", permissions: "*" },
            { resource: "/quizzes/:id/delete", permissions: "*" },
        ]
    },
    {
        role: "student",
        priority: 3,
        allows: [
            { resource: "/dashboard", permissions: ["get"] },
            { resource: "/student/courses", permissions: ["get"] },
            { resource: "/student/lessons", permissions: ["get"] },
            { resource: "/student/progress", permissions: ["get"] },
        ]
    },
    {
        role: "guest",
        priority: 1,
        allows: [
            { resource: "/login", permissions: ["get", "post"] },
            { resource: "/signup", permissions: ["get", "post"] },
        ]
    }
];

const permissions = {
    usersRoles: usersRoles,

    addRoleParents: function(targetRole, sourceRole) {
        const targetData = this.usersRoles.find(v => v.role === targetRole);
        const sourceData = this.usersRoles.find(v => v.role === sourceRole);

        targetData.allows = targetData.allows.concat(sourceData.allows);
    },

    isResourceAllowedForUser: function(userRole, resource, method) {
        const roleData = this.usersRoles.find(v => v.role === userRole);

        if (!roleData) return false;

        const resourceData = roleData.allows.find(v => v.resource === resource);
        if (!resourceData) return false;

        if (!resourceData.permissions) return false;

        if (!Array.isArray(resourceData.permissions)) {
            if (resourceData.permissions === "*") return true; 
            if (resourceData.permissions === method) return true;
        } else {
            if (resourceData.permissions.find(v => v === "*")) return true;
            if (resourceData.permissions.find(v => v === method)) return true;
        }

        return false;
    },

    getPriorityByRole: function(role) {
        const user = this.usersRoles.find(v => v.role === role);
        if (user) return user.priority;

        return -1;
    }
};

permissions.addRoleParents("teacher", "student");
permissions.addRoleParents("admin", "teacher"); 

export {
    permissions
};
