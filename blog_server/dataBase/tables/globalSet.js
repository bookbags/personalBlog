const sequelize = require("./connectDataBase");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define("globalSet", {
    avatar: DataTypes.STRING,
    siteTitle: DataTypes.STRING,
    gitee: DataTypes.STRING,
    qq: DataTypes.STRING,
    qqQrCode: DataTypes.STRING,
    weixin: DataTypes.STRING,
    weixinQrCode: DataTypes.STRING,
    mail: DataTypes.STRING,
    icp: DataTypes.STRING,
    giteeName: DataTypes.STRING,
    favicon: DataTypes.STRING,
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},{
    timestamps: false,
    freezeTableName: true
});