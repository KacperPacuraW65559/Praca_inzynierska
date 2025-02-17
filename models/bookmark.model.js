
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Bookmark = sequelize.define("Bookmark", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    }
});

export {
    Bookmark
};