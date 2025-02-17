
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Feedback = sequelize.define("Feedback", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true },
    },
    subject: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: { len: [1, 128] },
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    adminReply: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

export { 
    Feedback 
};
