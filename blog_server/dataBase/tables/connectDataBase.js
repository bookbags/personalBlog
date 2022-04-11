const Sequelize = require("sequelize");
const sequelize = new Sequelize("blogDataBase", "root", "bookbag",{
    localhost: "location",
    dialect: "mysql"
});
module.exports = sequelize;