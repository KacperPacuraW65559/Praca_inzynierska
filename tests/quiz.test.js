
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/schemas.js', () => ({
  Quiz: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  Question: {
  },
  Answer: {},
}));

const { Quiz } = await import('../models/schemas.js');
const { QuizzesController } = await import('../controllers/QuizzesController.js');

describe('QuizzesController', () => {
  let controller;
  beforeEach(() => {
    controller = new QuizzesController();
    jest.clearAllMocks();
  });

  it('getAllQuizzes: ', async () => {
    const fakeQuizzes = [{ id: 1, title: 'Quiz 1' }];
    Quiz.findAll.mockResolvedValue(fakeQuizzes);
    
    const result = await controller.getAllQuizzes();
    
    expect(Quiz.findAll).toHaveBeenCalled();
    expect(result).toEqual(fakeQuizzes);
  });

  it('evaluateQuiz: ', async () => {
    const fakeQuiz = {
      id: 1,
      Questions: [
        { id: 101, Answers: [{ id: 1001 }] },
        { id: 102, Answers: [{ id: 1002 }] },
      ],
    };
    Quiz.findByPk.mockResolvedValue(fakeQuiz);
    
    const userAnswers = {
      "question_101": "1001",
      "question_102": "9999",
    };
    
    const result = await controller.evaluateQuiz(1, userAnswers);
    
    expect(Quiz.findByPk).toHaveBeenCalledWith(1, {
      include: {
        model: expect.anything(),
        include: { model: expect.anything(), where: { is_correct: true } },
      },
    });
    expect(result).toEqual({ score: 1, totalQuestions: 2 });
  });

  it('deleteQuiz: ', async () => {
    Quiz.findByPk.mockResolvedValue(null);
    
    await expect(controller.deleteQuiz(999)).rejects.toThrow("Brak quizu.");
  });
});
