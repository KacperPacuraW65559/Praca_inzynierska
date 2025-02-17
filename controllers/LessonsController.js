import { Lesson, Course } from "../models/schemas.js";

export class LessonsController {

    async createLesson(lessonData, courseDb) {
        const lessonDb = await Lesson.create({
            ...lessonData
        });

        if (courseDb) {
            await lessonDb.setCourse(courseDb);
        }

        return lessonDb;
    }

    async getById(id) {
        return await Lesson.findByPk(id);
    }

    async getPreviousLesson(orderNumber, courseId) {
        return await Lesson.findOne({
            where: {
                order_number: orderNumber - 1,
                courseId: courseId
            }
        });
    }
    
    async getNextLesson(orderNumber, courseId) {
        return await Lesson.findOne({
            where: {
                order_number: orderNumber + 1,
                courseId: courseId
            }
        });
    }

    async getLessonsByCourse(courseId) {
        return await Lesson.findAll({
            where: {
                courseId: courseId
            },
            include: {
                model: Course
            },
            order: [["order_number", "ASC"]]
        });
    }

    async updateById(id, lessonData) {
        const updatedLesson = await Lesson.update({
            ...lessonData
        }, {
            where: {
                id
            }
        });

        return updatedLesson;
    }

    async deleteById(id) {
        return await Lesson.destroy({
            where: {
                id
            }
        });
    }
}
