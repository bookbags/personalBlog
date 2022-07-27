const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
const aboutMe = sequelize.define("aboutMe",{
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    taskType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createDate:{
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    taskStatus:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    achieveTime:{
        type:DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
});
module.exports = aboutMe;