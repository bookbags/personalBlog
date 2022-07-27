const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
module.exports = sequelize.define("taskSchedule",{
    task: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    date:{
        type: DataTypes.STRING
    },
    ownTaskName:{
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
});