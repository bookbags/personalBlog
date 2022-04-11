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
    console.log(reqData);
    item.create(reqData).then(() => {
        resData.data = reqData;
        resData.code = 0;
        resData.msg = "";
        res.send(resData);
    }).catch(() => {
        resData.code = 500;
        resData.msg = "项目名称冲突";
        res.send(resData);
    })
});
//删除一个项目
itemRouter.delete("/:id", async (req, res) => {
    await item.destroy({
        where: {
            id: req.params.id
        }
    })
    resData.data = "success";
    res.send(resData);
});

//修改项目
itemRouter.put("/:id", async (req, res) => {
    await item.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    resData.data = await item.findOne({
        where:{
            id: req.params.id
        }
    })
    res.send(resData);
});

//获取
itemRouter.get("/", async (req, res) => {
    resData.data = await item.findAll();
    res.send(resData);
});

module.exports = itemRouter;