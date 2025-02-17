
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Question = sequelize.define("Question", {
    question_text: { 
        type: DataTypes.TEXT, 
        allowNull: false },
});
export {
    Question
};