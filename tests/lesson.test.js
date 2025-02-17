
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/schemas.js', () => ({
  Lesson: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
  },
  Course: {},
}));

const { Lesson, Course } = await import('../models/schemas.js');
const { LessonsController } = await import('../controllers/LessonsController.js');

describe('LessonsController', () => {
  let controller;
  beforeEach(() => {
    controller = new LessonsController();
    jest.clearAllMocks();
  });

  it('createLesson: ', async () => {
    const lessonData = { title: 'Test Lesson', order_number: 1 };
    const courseDb = { id: 10 };
    const fakeLessonInstance = {
      id: 1,
      ...lessonData,
      setCourse: jest.fn().mockResolvedValue(true),
    };

    Lesson.create.mockResolvedValue(fakeLessonInstance);

    const result = await controller.createLesson(lessonData, courseDb);

    expect(Lesson.create).toHaveBeenCalledWith(lessonData);
    expect(fakeLessonInstance.setCourse).toHaveBeenCalledWith(courseDb);
    expect(result).toEqual(fakeLessonInstance);
  });

  it('getById: ', async () => {
    const fakeLesson = { id: 5, title: 'Test Lesson' };
    Lesson.findByPk.mockResolvedValue(fakeLesson);

    const result = await controller.getById(5);

    expect(Lesson.findByPk).toHaveBeenCalledWith(5);
    expect(result).toEqual(fakeLesson);
  });

  it('getNextLesson: ', async () => {
    const orderNumber = 2;
    const courseId = 10;
    const fakeLesson = { id: 6, order_number: 3, courseId: 10 };
    Lesson.findOne.mockResolvedValue(fakeLesson);

    const result = await controller.getNextLesson(orderNumber, courseId);

    expect(Lesson.findOne).toHaveBeenCalledWith({
      where: {
        order_number: orderNumber + 1,
        courseId: courseId,
      },
    });
    expect(result).toEqual(fakeLesson);
  });
});
