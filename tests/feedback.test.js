
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/schemas.js', () => ({
  Feedback: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  User: {},
}));

const { Feedback, User } = await import('../models/schemas.js');
const { FeedbackController } = await import('../controllers/FeedbackController.js');

describe('FeedbackController', () => {
  let controller;

  beforeEach(() => {
    controller = new FeedbackController();
    jest.clearAllMocks();
  });

  it('createFeedback: ', async () => {
    const fakeFeedback = { id: 1, userId: 1, subject: 'Test Subject', body: 'Test Body' };
    Feedback.create.mockResolvedValue(fakeFeedback);

    const result = await controller.createFeedback(1, 'Test Subject', 'Test Body');

    expect(Feedback.create).toHaveBeenCalledWith({
      userId: 1,
      subject: 'Test Subject',
      body: 'Test Body',
    });
    expect(result).toEqual(fakeFeedback);
  });

  it('replyToFeedback: ', async () => {
    const fakeFeedback = {
      id: 1,
      adminReply: null,
      save: jest.fn().mockResolvedValue(true),
    };
    Feedback.findByPk.mockResolvedValue(fakeFeedback);
    const replyText = 'Dziękujemy za przesłanie opinii.';

    const result = await controller.replyToFeedback(1, replyText);

    expect(Feedback.findByPk).toHaveBeenCalledWith(1);
    expect(fakeFeedback.adminReply).toBe(replyText);
    expect(fakeFeedback.save).toHaveBeenCalled();
    expect(result).toEqual(fakeFeedback);
  });
});
