
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/schemas.js', () => ({
  Library: {
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

const { Library } = await import('../models/schemas.js');
const { LibraryController } = await import('../controllers/LibraryController.js');

describe('LibraryController', () => {
  let controller;
  beforeEach(() => {
    controller = new LibraryController();
    jest.clearAllMocks();
  });

  it('getAllChords: ', async () => {
    const fakeChords = [{ id: 1, type: 'chord', name: 'C Major' }];
    Library.findAll.mockResolvedValue(fakeChords);

    const result = await controller.getAllChords();

    expect(Library.findAll).toHaveBeenCalledWith({ where: { type: "chord" } });
    expect(result).toEqual(fakeChords);
  });

  it('createEntry: ', async () => {
    const entryData = { type: 'chord', name: 'Akord D Dur', imagePath: 'Akord_D_Dur.png', description: 'Akord D Dur' };
    const fakeEntry = { id: 5, ...entryData };
    Library.create.mockResolvedValue(fakeEntry);

    const result = await controller.createEntry(entryData);

    expect(Library.create).toHaveBeenCalledWith({ ...entryData });
    expect(result).toEqual(fakeEntry);
  });

  it('updateById and deleteById: ', async () => {
    const id = 5;
    const entryData = { name: 'Updated D Dur' };
    const fakeUpdateResult = [1];
    const fakeDeleteResult = 1;
    Library.update.mockResolvedValue(fakeUpdateResult);
    Library.destroy.mockResolvedValue(fakeDeleteResult);

    const updateResult = await controller.updateById(id, entryData);
    expect(Library.update).toHaveBeenCalledWith({ ...entryData }, { where: { id } });
    expect(updateResult).toEqual(fakeUpdateResult);

    const deleteResult = await controller.deleteById(id);
    expect(Library.destroy).toHaveBeenCalledWith({ where: { id } });
    expect(deleteResult).toEqual(fakeDeleteResult);
  });
});
