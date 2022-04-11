const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
module.exports = sequelize.define("blog",{
    id:{
        primaryKey: true,
        type: DataTypes.STRING
    },
    title: {
        unique: true,
        type:DataTypes.STRING
    },
    description: DataTypes.STRING,
    createDate: DataTypes.STRING,
    scanNumber: DataTypes.INTEGER,
    commentNumber: DataTypes.INTEGER,
    htmlContent: DataTypes.TEXT,
    blogTypeName: DataTypes.STRING, 
    thumb:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
});