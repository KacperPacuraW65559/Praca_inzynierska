
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Answer = sequelize.define("Answer", {
    answer_text: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    is_correct: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false 
    },
});


export {
    Answer
};