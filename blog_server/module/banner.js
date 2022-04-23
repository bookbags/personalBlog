/**
 * 标语实现：
 *  获取
 *  设置:设置时，传递id
 */
const express = require("express");
const bannerRouter = express.Router();
const resData = require("./resData");

const {
    banner
} = require("../dataBase/index");

bannerRouter.get("/", async (req, res) => {
    const data = await banner.findAll();
    res.send(resData(0, "success", data));
});

bannerRouter.put("/:id", async (req, res) => {
    console.log(req.params, req.body);
    await banner.update(req.body, {
        where: req.params
    });
    const data = await banner.findAll();
    res.send(resData(200, "修改完成", data));
});

module.exports = bannerRouter;