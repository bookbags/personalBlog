const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
module.exports = sequelize.define("user",{
   name:{
       type: DataTypes.STRING,
       primaryKey: true
   },
   password:{
       type:DataTypes.STRING,
       allowNull: false
   },
   avatar: DataTypes.STRING,
   uuid: DataTypes.STRING
},{
    timestamps: false,
    freezeTableName: true
});