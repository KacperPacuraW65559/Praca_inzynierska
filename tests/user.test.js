
import { jest } from '@jest/globals';
import bcrypt from "bcryptjs";

jest.unstable_mockModule('../models/schemas.js', () => ({
  User: {
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
  },
  Course: {},
}));

const { User } = await import('../models/schemas.js');
const { UsersController } = await import('../controllers/UsersController.js');

describe('UsersController', () => {
  let controller;

  beforeEach(() => {
    controller = new UsersController();
    jest.clearAllMocks();
  });

  it('getAll: ', async () => {
    const fakeUsers = [{ id: 1, name: 'User One' }];
    User.findAll.mockResolvedValue(fakeUsers);

    const result = await controller.getAll();

    expect(User.findAll).toHaveBeenCalledWith({});
    expect(result).toEqual(fakeUsers);
  });

  it('createUser: ', async () => {
    const userData = { name: 'Jan Kowalski', email: 'jan@example.com', password: 'test123' };
    const fakeCourse = { id: 5 };
    const fakeUser = { 
      id: 1, 
      ...userData, 
      password: 'hashedPassword', 
      setCourse: jest.fn().mockResolvedValue(true) 
    };

    User.create.mockResolvedValue(fakeUser);

    const result = await controller.createUser(userData, fakeCourse);

    expect(User.create).toHaveBeenCalled();
    expect(fakeUser.setCourse).toHaveBeenCalledWith(fakeCourse);
    expect(result).toEqual(fakeUser);
  });

  it('validPassword: ', async () => {
    const password = 'secret';
    const hashed = await bcrypt.hash(password, 10);
    const fakeUser = { id: 1, password: hashed };

    const result = await controller.validPassword(password, fakeUser);

    expect(result).toBe(true);
  });

  it('getById: ', async () => {
    const fakeUser = { id: 1, name: 'Jan Kowalski' };
    User.findByPk.mockResolvedValue(fakeUser);

    const result = await controller.getById(1);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(fakeUser);
  });
});
