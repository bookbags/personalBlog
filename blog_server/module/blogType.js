/**
 * 文章分类：
 *  增
 *  删
 *  改
 *  查
 */
const express = require("express");
const {
    blogType
} = require("../dataBase/index");
const resData = require("./resData");
const blogTypeRouter = express.Router();

//修改分类
blogTypeRouter.put("/:id", async (req, res) => {
    await blogType.update(req.body, {
        where:{
            id: req.params.id
        }
    });
    resData.data = (await blogType.findAll({
        where:{
            id: req.params.id
        }
    }))[0];
    res.send(resData);
});

//删除分类
blogTypeRouter.delete("/:id", async (req, res) => {
    await blogType.destroy({
        where:{
            id: req.params.id
        }
    });
    resData.code = "0";
    resData.msg = "success";
    resData.data = await blogType.findAll();
    res.send(resData);
});

//增加分类
blogTypeRouter.post("/", async (req, res) => {
    const reqData = req.body;
    reqData.articleCount = 0;
    reqData.id = new Date().getTime() + parseInt(Math.random() * 100) + "";
    reqData.order = +reqData.order;
    blogType.create(reqData).then(async () => {//因为数据库中name设置为unique为ture，所以如果name相同会报错
        resData.data = (await blogType.findAll({
            where: {
                id: reqData.id
            }
        }))[0];
        resData.code = 0;
        resData.msg = "success";
        res.send(resData);
    }).catch(() => {
        resData.code = 400;
        resData.msg = "类名重复";
        res.send(resData);
    })
})

// 查找
blogTypeRouter.get("/", async (req, res) => {
    resData.data = await blogType.findAll();
    res.send(resData);
});
blogTypeRouter.get("/:id", async (req, res) => {
    resData.data = (await blogType.findAll({
        where: {
            id: req.params.id
        }
    }))[0];
    res.send(resData);
});

module.exports = blogTypeRouter;