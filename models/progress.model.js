
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Progress = sequelize.define("Progress", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    }
});

export {
    Progress
};