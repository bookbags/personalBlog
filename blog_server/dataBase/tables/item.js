const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
module.exports = sequelize.define("item",{
    name: {
        type:DataTypes.STRING,
        unique: true
    },
    url: DataTypes.STRING,
    gitee:DataTypes.STRING,
    thumb: DataTypes.STRING,
    order: DataTypes.INTEGER,
    description:DataTypes.STRING,
    id:{
        type: DataTypes.STRING,//项目名称+构建时间
        primaryKey: true
    }
},{
    timestamps: false,
    freezeTableName: true
});