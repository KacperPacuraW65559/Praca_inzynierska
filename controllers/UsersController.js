
import bcrypt from "bcryptjs";
import { User, Course } from "../models/schemas.js";

export class UsersController {

    async getAll() {
        return await User.findAll({});
    }

    async getAllUsersByRole(role) {
        return await User.findAll({
            where: {
                role
            }
        });
    }

    async getAllUsersByRoleAndCourseId(role, courseId) {
        return await User.findAll({
            where: {
                role,
                courseId
            }
        });
    }

    async createUser(userData, courseDb) {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        const userDb = await User.create(userData);

        if (courseDb) {
            await userDb.setCourse(courseDb);
        }

        return userDb;
    }

    async validPassword(password, userDb) {
        try {
            return await bcrypt.compare(password, userDb.password);
        } catch (err) {
            throw new Error(err);
        }
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    

    async setCourse(userDb, courseDb) {
        if (userDb && courseDb) {
            await userDb.setCourse(courseDb);
            return true;
        }

        return false;
    }

    async getById(id) {
        return await User.findByPk(id);
    }

    async getUserCourses(userId) {
        return await User.findByPk(userId, {
            include: {
                model: Course,
                through: { attributes: [] }
            }
        });
    }

    async updateById(id, userData) {
        const updatedUser = await User.update({
            ...userData
        }, {
            where: {
                id
            }
        });

        return updatedUser;
    }

    async getUserByEmail(email) {
        return await User.findOne({
           where: {
                email
           } 
        });
    }

    async getRecentUsers(limit = 5) {
        return await User.findAll({
            order: [["createdAt", "DESC"]],
            limit
        });
    }
    
    async deleteById(id) {
        return await User.destroy({
            where: {
                id
            }
        });
    }
}