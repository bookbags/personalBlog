const resData = require("./resData");
const express = require("express")
const {
    aboutMe
} = require("../dataBase/index");
const aboutMeRouter = express.Router();
const taskType = ["第一序列", "第二序列", "日常"];
//分页获取任务
aboutMeRouter.get("/", async (req, res) => {
    let {
        page,
        limit
    } = req.query;
    page = Number(page);
    limit = Number(limit);
    if (page != page) page = 0;
    if (limit != limit) limit = 10;
    const sum = await aboutMe.count();
    try {
        const data = await aboutMe.findAll({
            offset: page * limit,
            limit,
        });
        res.send(resData(200, "", {
            sum,
            data
        }));
    } catch (e) {
        res.send(resData(500, "查询错误", e));
    }
})

//设置任务状态，是否完成
aboutMeRouter.put("/:createDate", async (req, res) => {
    let {
        page,
        limit
    } = req.query;
    page = Number(page);
    limit = Number(limit);
    if (page != page) page = 0;
    if (limit != limit) limit = 10;
    const createDate = req.params.createDate;
    const task = req.body;
    await aboutMe.update(task, {
        where: {
            createDate: createDate
        }
    }).catch(e => console.log(e));
    const taskList = await aboutMe.findAll({
        offset: page * limit,
        limit,
    });;
    res.send(resData(200, "修改完成", taskList));
})
//创建新任务
aboutMeRouter.post("/", async (req, res) => {
    let {
        page,
        limit
    } = req.query;
    page = Number(page);
    limit = Number(limit);
    if (page != page) page = 0;
    if (limit != limit) limit = 10;
    const task = req.body;
    task.createDate = "" + (new Date).getTime();
    await aboutMe.create(task);
    const data = await aboutMe.findAll({
        offset: page * limit,
        limit,
    });;
    res.send(resData(200, "添加完成", data));
});

//获取任务类型
aboutMeRouter.get("/taskType", (req, res) => {
    res.send(resData(200, "", taskType));
})



module.exports = aboutMeRouter;