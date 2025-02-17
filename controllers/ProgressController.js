import { Progress, User, Lesson } from "../models/schemas.js";

export class ProgressController {
    async createProgress(userId, lessonId) {
        try {
            const progress = await Progress.findOne({
                where: {
                    userId: userId,
                    lessonId: lessonId,
                },
            });
    
            if (!progress) {
                await Progress.create({
                    userId: userId,
                    lessonId: lessonId,
                });
                console.log("Postęp utworzony");
            } else {
                console.log("Postęp już istnieje");
            }
        } catch (error) {
            console.error("Error:", error.message);
            throw error;
        }
    }

    async getUserProgress(userId) {
        return await Progress.findAll({
            where: {
                userId: userId
            },
            include: [
                { model: Lesson }
            ]
        });
    }
    
    async deleteProgress(userId, lessonId) {
        try {
            const deleted = await Progress.destroy({
                where: {
                    userId: userId,
                    lessonId: lessonId,
                },
            });
    
            if (deleted) {
                console.log("Postęp usunięty");
            } else {
                throw new Error("Brak postępu");
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }

    async getUserProgressForLessons(userId) {
        return await Progress.findAll({
            where: { userId }
        });
    }
    
    async calculateCourseCompletion(userId, courseId) {
        const totalLessons = await Lesson.count({ where: { courseId } });
    
        const completedLessons = await Progress.count({
            include: {
                model: Lesson,
                where: { courseId },
            },
            where: { userId },
        });
    
        if (totalLessons === 0) return 0;
        return Math.round((completedLessons / totalLessons) * 100);
    }
}
