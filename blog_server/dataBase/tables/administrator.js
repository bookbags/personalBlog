const sequelize = require("./connectDataBase");
const {DataTypes} = require("sequelize");
const administrator = sequelize.define("administrator",{
    loginId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});
module.exports = administrator;