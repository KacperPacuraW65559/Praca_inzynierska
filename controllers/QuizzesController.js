
import { Quiz, Question, Answer } from "../models/schemas.js";

export class QuizzesController {

    async getAllQuizzes() {
        return await Quiz.findAll();
    }

    async getQuizDetails(quizId) {
        return await Quiz.findByPk(quizId, {
            include: {
                model: Question,
                include: Answer,
            },
        });
    }

    async evaluateQuiz(quizId, userAnswers) {
        const quiz = await Quiz.findByPk(quizId, {
            include: {
                model: Question,
                include: { model: Answer, where: { is_correct: true } },
            },
        });
    
        let score = 0;
    
        quiz.Questions.forEach((question) => {
            const correctAnswerId = question.Answers[0].id; // Pobieramy poprawną odpowiedź
            const userAnswerId = parseInt(userAnswers[`question_${question.id}`], 10); // Pobieramy odpowiedź użytkownika
    
            if (userAnswerId === correctAnswerId) {
                score++;
            }
        });
    
        return { score, totalQuestions: quiz.Questions.length };
    }
    
    async addQuestionToQuiz(quizId, questionData) {
        try {
            const question = await Question.create({
                ...questionData,
                quizId: quizId,
            });
            return question;
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }
    
    async addAnswerToQuestion(questionId, answerData) {
        try {
            const answer = await Answer.create({
                ...answerData,
                questionId: questionId,
            });
            return answer;
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }

    async createQuiz(data) {
        return await Quiz.create(data);
    }
    
    async updateQuiz(quizId, updatedData) {
        const { title, description, questions } = updatedData;
    
        const quiz = await Quiz.findByPk(quizId, {
            include: {
                model: Question,
                include: Answer,
            },
        });
    
        if (!quiz) throw new Error("Brak quizu");
    
        quiz.title = title;
        quiz.description = description;
        await quiz.save();
    
        for (const questionData of questions) {
            const question = await Question.findByPk(questionData.id);
            if (question) {
                question.question_text = questionData.text;
                await question.save();
    
                for (const answerData of questionData.answers) {
                    const answer = await Answer.findByPk(answerData.id);
                    if (answer) {
                        answer.answer_text = answerData.text;
                        answer.is_correct = answer.id === parseInt(questionData.correct_answer, 10);
                        await answer.save();
                    }
                }
            }
        }
    }
   
    async createQuizWithQuestions(quizData, questionsData) {
        try {
            const quiz = await Quiz.create({
                title: quizData.title,
                description: quizData.description,
            });
    
            for (const [questionIndex, questionData] of questionsData.entries()) {
                const question = await Question.create({
                    question_text: questionData.text,
                    quizId: quiz.id,
                });
    
                for (const [answerIndex, answerData] of questionData.answers.entries()) {
                    await Answer.create({
                        answer_text: answerData.text,
                        is_correct: parseInt(questionData.correct, 10) === answerIndex, // Porównanie indeksów
                        questionId: question.id,
                    });
                }
            }
    
            return quiz;
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }    

    async deleteQuiz(quizId) {
        try {
            const quiz = await Quiz.findByPk(quizId, {
                include: { model: Question, include: Answer },
            });
    
            if (!quiz) {
                throw new Error("Brak quizu");
            }

            for (const question of quiz.Questions) {
                await Answer.destroy({ where: { questionId: question.id } });
            }
    
            await Question.destroy({ where: { quizId } });
    
            await Quiz.destroy({ where: { id: quizId } });
    
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }
}
