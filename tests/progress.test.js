
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/schemas.js', () => ({
  Progress: {
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    count: jest.fn(),
  },
  Lesson: {
    count: jest.fn(),
  },
}));

const { Progress, Lesson } = await import('../models/schemas.js');
const { ProgressController } = await import('../controllers/ProgressController.js');

describe('ProgressController', () => {
  let controller;
  beforeEach(() => {
    controller = new ProgressController();
    jest.clearAllMocks();
  });

  it('createProgress: ', async () => {
    Progress.findOne.mockResolvedValue(null);
    const userId = 1;
    const lessonId = 100;
    
    await controller.createProgress(userId, lessonId);
    
    expect(Progress.findOne).toHaveBeenCalledWith({ where: { userId, lessonId } });
    expect(Progress.create).toHaveBeenCalledWith({ userId, lessonId });
  });

  it('deleteProgress: ', async () => {
    Progress.destroy.mockResolvedValue(0);
    
    await expect(controller.deleteProgress(1, 100)).rejects.toThrow();
  });

  it('calculateCourseCompletion: ', async () => {
    Lesson.count.mockResolvedValue(10);
    Progress.count.mockResolvedValue(7);
    
    const result = await controller.calculateCourseCompletion(1, 10);
    
    expect(Lesson.count).toHaveBeenCalledWith({ where: { courseId: 10 } });
    expect(Progress.count).toHaveBeenCalledWith({
      include: { model: Lesson, where: { courseId: 10 } },
      where: { userId: 1 },
    });
    expect(result).toBe(70);
  });
});
