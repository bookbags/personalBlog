/**
 * 留言板
 *  增加
 *  获取
 *  删除
 */
const express = require("express");
const {
    leaveWord: message,
    user
} = require("../dataBase/index");
const resData = require("./resData");
const messageRouter = express.Router();

//获取留言
messageRouter.get("/", async (req, res) => { //可以做成分页的形式
    res.send(resData(200, "success", await message.findAll({include: user})));
});
//删除留言
messageRouter.delete("/:id", async (req, res) => {
    await message.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(resData(200, "删除成功", ""));
});

// 添加留言
messageRouter.post("/", async (req, res) => {
    const reqData = req.body;
    reqData.createDate = new Date().getTime() + "";
    reqData.id = new Date().getTime() + Number(Math.random() * 100)
    await message.create(reqData);
    res.send(200, "添加完成", reqData);
});

module.exports = messageRouter;