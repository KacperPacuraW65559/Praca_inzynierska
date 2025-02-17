
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Course = sequelize.define("Course", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    title: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: { len: [1, 256] }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    difficulty: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: { len: [1, 64] }
    }
});

export {
    Course
};