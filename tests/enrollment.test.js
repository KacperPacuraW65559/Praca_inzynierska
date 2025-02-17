
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/schemas.js', () => ({
  Enrollment: {
    create: jest.fn(),
    destroy: jest.fn(),
  },
  User: {},
  Course: {},
}));

const { Enrollment } = await import('../models/schemas.js');
const { EnrollmentController } = await import('../controllers/EnrollmentsController.js');

describe('EnrollmentController', () => {
  let controller;
  beforeEach(() => {
    controller = new EnrollmentController();
    jest.clearAllMocks();
  });

  it('enrollUser: ', async () => {
    const fakeEnrollment = { id: 1, UserId: 1, CourseId: 101, enrolled: true };
    Enrollment.create.mockResolvedValue(fakeEnrollment);

    const result = await controller.enrollUser(1, 101);

    expect(Enrollment.create).toHaveBeenCalledWith({
      UserId: 1,
      CourseId: 101,
      enrolled: true,
    });
    expect(result).toEqual(fakeEnrollment);
  });

  it('removeEnrollment: ', async () => {
    Enrollment.destroy.mockResolvedValue(0);

    await expect(controller.removeEnrollment(1, 101)).rejects.toThrow('Enrollment not found');
  });
});
