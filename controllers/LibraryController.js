import { Library } from "../models/schemas.js";

export class LibraryController {
    async getAllChords() {
        return await Library.findAll({ where: { type: "chord" } });
    }

    async getAllScales() {
        return await Library.findAll({ where: { type: "scale" } });
    }

    async createEntry(entryData) {
        return await Library.create({ ...entryData });
    }

    async getById(id) {
        return await Library.findByPk(id);
    }

    async updateById(id, entryData) {
        return await Library.update(
            { ...entryData },
            { where: { id } }
        );
    }

    async deleteById(id) {
        return await Library.destroy({ where: { id } });
    }
}
