
import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const rolesArr = ["admin", "teacher", "student"];

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: { len: [1,32] }
    },
    surname: {
        type: DataTypes.STRING(64),
        allowNull: true,
        validate: { len: [0,64] }
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: { isEmail: true, len: [1,128] }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
            notNull: {
                msg: "Haslo jest wymagane"
            },
            notEmpty: {
                msg: "Podaj hasło"
            },
            isNotEasy: function(val) {
                val = val.toLowerCase();

                if (val.includes("12345") || val.includes("54321") || val.includes("admin") ||
                val.includes("password") || val.includes("123123") || val.includes("qwerty") ||
                val.includes("abc123") || val.includes("111111") || val.includes("password1") ||
                val.includes("qwerty123") || val.includes("1234") || val.includes("123456789")) {
                    throw new Error ("Wpisane hasło jest zbyt proste. Spróbuj coś trudniejszego.");
                }
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { 
            isInt: true,
            min: 0,
            max: 120
        }
    },
    address: {
        type: DataTypes.STRING(256),
        allowNull: true,
        validate: { len: [0,256] }
    },
    role: {
        type: DataTypes.ENUM({
            values: rolesArr
        }),
        defaultValue: "student",
        allowNull: false,
        validate: { len: [1, 12] }
    }
});

export {
    User,
    rolesArr
};