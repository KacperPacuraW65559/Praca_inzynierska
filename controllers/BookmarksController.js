import { Bookmark, Lesson, Library } from "../models/schemas.js";
import { Op } from "sequelize";

export class BookmarksController {
    async createBookmark(userId, lessonId) {
        try {
            const bookmark = await Bookmark.findOne({
                where: {
                    userId: userId,
                    lessonId: lessonId,
                },
            });
    
            if (!bookmark) {
                await Bookmark.create({
                    userId: userId,
                    lessonId: lessonId,
                });
                console.log("Zakladka dodana");
            } else {
                console.log("Zakladaka już istnieje");
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }

    async createChordBookmark(userId, libraryId) {
        try {
            const bookmark = await Bookmark.findOne({
                where: {
                    userId: userId,
                    libraryId: libraryId,
                },
            });
    
            if (!bookmark) {
                await Bookmark.create({
                    userId: userId,
                    libraryId: libraryId,
                });
                console.log("Utworzono zakaldkę");
            } else {
                console.log("Zakładka istnieje");
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }
    
    async deleteChordBookmark(userId, libraryId) {
        try {
            const deleted = await Bookmark.destroy({
                where: {
                    userId: userId,
                    libraryId: libraryId,
                },
            });
    
            if (deleted) {
                console.log("Usunięto zakładkę");
            } else {
                console.log("Brak zakładek");
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }
    
    async deleteById(id) {
        return await Bookmark.destroy({
            where: {
                id
            }
        });
    }

    async deleteBookmark(userId, lessonId) {
        try {
            const deleted = await Bookmark.destroy({
                where: {
                    userId: userId,
                    lessonId: lessonId,
                },
            });
    
            if (deleted) {
                console.log("Usunięto zakładkę");
            } else {
                console.log("Brak zakładki");
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }

    
    async getUserBookmarks(userId) {
        try {
            return await Bookmark.findAll({
                where: { userId },
                attributes: ["libraryId"],
            });
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }

    async getUserBookmarksLesson(userId) {
        try {
            return await Bookmark.findAll({
                where: { userId },
                attributes: ["lessonId"],
            });
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }
    
    async getUserAllBookmarks(userId) {
        try {
            const libraryBookmarks = await Bookmark.findAll({
                where: { userId, libraryId: { [Op.ne]: null } },
                include: [{ model: Library }]
            });
    
            const lessonBookmarks = await Bookmark.findAll({
                where: { userId, lessonId: { [Op.ne]: null } },
                include: [{ model: Lesson }]
            });

            const formattedBookmarks = [
                ...libraryBookmarks.map(bookmark => ({
                    id: bookmark.id,
                    type: bookmark.Library.type,
                    name: bookmark.Library.name,
                    imagePath: bookmark.Library.imagePath,
                    description: bookmark.Library.description,
                })),
                ...lessonBookmarks.map(bookmark => ({
                    id: bookmark.id,
                    type: "lesson",
                    name: bookmark.Lesson.title,
                    imagePath: bookmark.Lesson.example_1,
                    description: bookmark.Lesson.intro,
                }))
            ];
    
            return formattedBookmarks;
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }
}
