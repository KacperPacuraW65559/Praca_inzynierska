import { Feedback, User } from "../models/schemas.js";

export class FeedbackController {
    async getAllFeedback() {
        return await Feedback.findAll({
            include: { model: User, attributes: ["name", "email"] },
            order: [["createdAt", "DESC"]],
        });
    }

    async getFeedbackById(feedbackId) {
        return await Feedback.findByPk(feedbackId, {
            include: { model: User, attributes: ["name", "email"] },
        });
    }

    async createFeedback(userId, subject, body) {
        return await Feedback.create({ userId, subject, body });
    }

    async replyToFeedback(feedbackId, replyText) {
        const feedback = await Feedback.findByPk(feedbackId);
        if (feedback) {
            feedback.adminReply = replyText;
            await feedback.save();
        }
        return feedback;
    }

    async getUserFeedback(userId) {
        return await Feedback.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });
    }
}
