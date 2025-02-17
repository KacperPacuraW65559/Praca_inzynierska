import { Enrollment } from "../models/schemas.js";

export class EnrollmentController {

    async enrollUser(userId, courseId) {
        try {
            const enrollment = await Enrollment.create({
                UserId: userId,
                CourseId: courseId,
                enrolled: true,
            });
            return enrollment;
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }   

    async removeEnrollment(userId, courseId) {
        try {
            const result = await Enrollment.destroy({
                where: {
                    userId: userId,
                    courseId: courseId,
                },
            });
    
            if (result === 0) {
                console.error("Brak zapisu do usunięcia");
                throw new Error;
            }
    
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }    
}
