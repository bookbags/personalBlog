const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
module.exports = sequelize.define("banner",{
    midImg: DataTypes.STRING,
    bigImg: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING
},{
    timestamps: false,
    freezeTableName: true
});