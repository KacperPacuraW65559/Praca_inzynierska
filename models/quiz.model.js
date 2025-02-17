
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Quiz = sequelize.define("Quiz", {
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
});

export {
    Quiz
};