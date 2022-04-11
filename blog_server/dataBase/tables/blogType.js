const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
module.exports = sequelize.define("blogType",{
    name: {
        unique:true,
        type: DataTypes.STRING
    },
    articleCount: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    id: {
        primaryKey: true,
        type:DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
});