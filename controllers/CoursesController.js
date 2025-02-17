
import { User, Lesson, Course} from "../models/schemas.js";

export class CoursesController {

    async getAll() {
        return await Course.findAll({});
    }
        
    async getFullDataById(id) {
        return await Course.findByPk(id, {
            include: [
                {
                    model: Lesson,
                },
                {
                    model: User,
                    as: 'teacher',
                    attributes: ['id', 'name', 'surname', 'email'],
                },
            ],
        });
    }
        
    async createCourse(courseData, teacherDb) {
        const courseDb = await Course.create(courseData);
    
        if (teacherDb) {
            await courseDb.setTeacher(teacherDb);
        }
    
        return courseDb;
    }

    async deleteById(id) {
        return await Course.destroy({
            where: { id }
        });
    }

    async getById(id) {
        return await Course.findByPk(id);
    }

    async updateById(id, courseData, teacherDb) {
        const course = await Course.findByPk(id);
        if (!course) throw new Error("Course not found");
    
        await course.update(courseData);
    
        if (teacherDb) {
            await course.setTeacher(teacherDb);
        } else {
            await course.setTeacher(null);
        }
    
        return course;
    }

    async getUserCourses(userId) {
        return await Course.findAll({
            include: [
                {
                    model: User,
                    where: { id: userId }
                }
            ]
        });
    }
    
    async getCoursesWithUsers() {
        return await Course.findAll({
            include: [
                {
                    model: User,
                    through: { attributes: [] }
                }
            ]
        });
    }

    async getCoursesByTeacher(teacherId) {
        return await Course.findAll({
            where: { teacherId },
            include: [{ model: User, as: "teacher" }]
        });
    }
}