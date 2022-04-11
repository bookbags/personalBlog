const leaveWord = require("../tables/leaveWord");
const user = require("../tables/user");
user.hasMany(leaveWord,{
    soruceKey: "name",
    foreignKey: "ownerName"
});
leaveWord.belongsTo(user, {
    targetKey: "name",
    foreignKey: "ownerName"
});
leaveWord.sync({force: true}).then(()=>{
    console.log("初始化完成");
})