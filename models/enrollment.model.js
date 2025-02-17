
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Enrollment = sequelize.define("Enrollment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    enrolled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export { Enrollment };
