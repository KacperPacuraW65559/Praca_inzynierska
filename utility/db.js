
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("guitar_app", "root", "", {
    host: "localhost",
    dialect: "mysql",
    decimalNumbers: true
});

sequelize.authenticate().then(() => {
    console.log("Połączono z bazą danych.");
}).catch((error) => {
    console.log(error)
});

export {
    sequelize
};