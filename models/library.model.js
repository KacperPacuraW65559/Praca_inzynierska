
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Library = sequelize.define("Library", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("chord", "scale"),
        allowNull: false
    },
    imagePath: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

export {
    Library
};
