
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Lesson = sequelize.define("Lesson", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: { len: [1, 64] }
    },
    intro: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    example_1: {
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    example_1_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    example_2: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    example_2_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    order_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { 
            isInt: true,
            min: 1
        }
    }
});

export {
    Lesson
};