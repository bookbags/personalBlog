const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
module.exports = sequelize.define("leaveWord",{
    content: DataTypes.STRING,
    createDate: DataTypes.STRING,
    ownerName: DataTypes.STRING,
    id:{
        type: DataTypes.STRING,
        primaryKey: true,//服务器提供，ownerName + createDate
    }
},{
    timestamps: false,
    freezeTableName: true
});