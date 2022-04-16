/**
 * 全局设置，可以进行
 *  修改
 *  获取
 */
const express = require("express");
const resData = require("./resData");
const {globalSet} = require("../dataBase/index");
const setRouter = express.Router();

setRouter.put("/", async (req, res)=>{
    await globalSet.update(req.body, {//条件可以不写，但是where必须要有
        where:{}
    });
    const data = (await globalSet.findAll())[0]
    res.send(resData(200, "修改完成", data));
    
});

setRouter.get("/", async (req, res)=>{
    const data = (await globalSet.findAll())[0];
    res.send(resData(200, "success", data));
})
module.exports = setRouter;
