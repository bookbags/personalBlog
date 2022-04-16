/**
 *  项目管理
 *  增加demo
 *  删除demo
 *  修改demo
 *  获取demo
 */
const express = require("express");
const {
    item
} = require("../dataBase/index");
const resData = require("./resData");
const itemRouter = express.Router();

//增加一个项目
itemRouter.post("/", async (req, res) => {
    const reqData = req.body;
    reqData.id = new Date().getTime() + parseInt(Math.random() * 100) + "";

    item.create(reqData).then(() => {
        res.send(resData(200, "添加成功", reqData));
    }).catch(() => {
        res.send(resData(500, "项目名称冲突", ""))
    })
});

//删除一个项目
itemRouter.delete("/:id", async (req, res) => {
    await item.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(resData(200, "删除成功", ""));
});

//修改项目
itemRouter.put("/:id", async (req, res) => {
    await item.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await item.findOne({
        where:{
            id: req.params.id
        }
    })
    res.send(resData(200, "修改完成", data));
});

//获取
itemRouter.get("/", async (req, res) => {
    const data = await item.findAll();
    res.send(resData(200, "success", data));
});

module.exports = itemRouter;