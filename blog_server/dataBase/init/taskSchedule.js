const taskSchedule = require("../tables/taskSchedule.js");
const task = require("../tables/aboutMe.js");
task.hasMany(taskSchedule, {
    sourceKey: "taskName",
    foreignKey: "ownTaskName"
})
taskSchedule.belongsTo(task, {
    targetKey: "taskName",
    foreignKey: "ownTaskName"
})
taskSchedule.sync({force: true}).then(()=>{
    console.log("初始化完成");
})