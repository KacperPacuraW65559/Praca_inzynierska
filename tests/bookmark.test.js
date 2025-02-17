
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/schemas.js', () => ({
  Bookmark: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
  },
  User: {},
  Lesson: {},
  Library: {},
}));

const { Bookmark, User, Lesson, Library } = await import('../models/schemas.js');
const { BookmarksController } = await import('../controllers/BookmarksController.js');

describe('BookmarksController', () => {
  let controller;
  beforeEach(() => {
    controller = new BookmarksController();
    jest.clearAllMocks();
  });

  it('createBookmark: ', async () => {
    Bookmark.findOne.mockResolvedValue(null);
    const userId = 1;
    const lessonId = 101;
    
    await controller.createBookmark(userId, lessonId);
    
    expect(Bookmark.findOne).toHaveBeenCalledWith({
      where: { userId, lessonId },
    });
    expect(Bookmark.create).toHaveBeenCalledWith({
      userId,
      lessonId,
    });
  });

  it('getUserAllBookmarks: ', async () => {
    const userId = 7;
    const libraryBookmarks = [
      {
        id: 1,
        Library: {
          type: 'chord',
          name: 'Chord Name',
          imagePath: 'chord.png',
          description: 'Chord description'
        }
      }
    ];
    const lessonBookmarks = [
      {
        id: 2,
        Lesson: {
          title: 'Lesson Title',
          example_1: 'lesson.png',
          intro: 'Lesson intro'
        }
      }
    ];


    Bookmark.findAll
      .mockResolvedValueOnce(libraryBookmarks)
      .mockResolvedValueOnce(lessonBookmarks);

    const result = await controller.getUserAllBookmarks(userId);

    expect(Bookmark.findAll).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        where: expect.objectContaining({ userId, libraryId: expect.any(Object) }),
        include: [{ model: Library }]
      })
    );
    expect(Bookmark.findAll).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        where: expect.objectContaining({ userId, lessonId: expect.any(Object) }),
        include: [{ model: Lesson }]
      })
    );

    expect(result).toEqual([
      {
        id: 1,
        type: 'chord',
        name: 'Chord Name',
        imagePath: 'chord.png',
        description: 'Chord description'
      },
      {
        id: 2,
        type: 'lesson',
        name: 'Lesson Title',
        imagePath: 'lesson.png',
        description: 'Lesson intro'
      }
    ]);
  });
});
