
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/schemas.js', () => ({
  Course: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  },
  User: {},
  Lesson: {},
}));

const { Course, User, Lesson } = await import('../models/schemas.js');
const { CoursesController } = await import('../controllers/CoursesController.js');

describe('CoursesController', () => {
  let controller;

  beforeEach(() => {
    controller = new CoursesController();
    jest.clearAllMocks();
  });

  it('getAll: ', async () => {
    const fakeCourses = [{ id: 1, name: 'Course 1' }];
    Course.findAll.mockResolvedValue(fakeCourses);
    
    const result = await controller.getAll();
    
    expect(Course.findAll).toHaveBeenCalledWith({});
    expect(result).toEqual(fakeCourses);
  });

  it('getFullDataById: ', async () => {
    const fakeCourse = { id: 1, name: 'Test Course' };
    Course.findByPk.mockResolvedValue(fakeCourse);
    
    const result = await controller.getFullDataById(1);
    
    expect(Course.findByPk).toHaveBeenCalledWith(1, {
      include: [
        { model: Lesson },
        { model: User, as: 'teacher', attributes: ['id', 'name', 'surname', 'email'] },
      ],
    });
    expect(result).toEqual(fakeCourse);
  });

  it('createCourse: ', async () => {
    const courseData = { name: 'New Course' };
    const teacherDb = { id: 10, name: 'Teacher' };
    const fakeCourseInstance = {
      id: 1,
      ...courseData,
      setTeacher: jest.fn().mockResolvedValue(true),
    };

    Course.create.mockResolvedValue(fakeCourseInstance);
    
    const result = await controller.createCourse(courseData, teacherDb);
    
    expect(Course.create).toHaveBeenCalledWith(courseData);
    expect(fakeCourseInstance.setTeacher).toHaveBeenCalledWith(teacherDb);
    expect(result).toEqual(fakeCourseInstance);
  });

  it('updateById: ', async () => {
    const courseData = { name: 'Updated Course' };
    const teacherDb = { id: 20, name: 'New Teacher' };
    const fakeCourse = {
      id: 2,
      update: jest.fn().mockResolvedValue(true),
      setTeacher: jest.fn().mockResolvedValue(true),
    };

    Course.findByPk.mockResolvedValue(fakeCourse);
    
    const result = await controller.updateById(2, courseData, teacherDb);
    
    expect(Course.findByPk).toHaveBeenCalledWith(2);
    expect(fakeCourse.update).toHaveBeenCalledWith(courseData);
    expect(fakeCourse.setTeacher).toHaveBeenCalledWith(teacherDb);
    expect(result).toEqual(fakeCourse);
  });

  it('updateById: ', async () => {
    Course.findByPk.mockResolvedValue(null);
    
    await expect(controller.updateById(999, { name: 'Test' }))
      .rejects.toThrow("Brak kursu");
  });
});
