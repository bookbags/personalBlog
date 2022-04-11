/**
 * 博客管理
 *  增
 *  删
 *  改
 *  查
 */
const express = require("express");
const {
    blog
} = require("../dataBase/index");
const resData = require("./resData");
const blogRouter = express.Router();

//增加文章
blogRouter.post("/", (req, res) => {
    const reqData = req.body;
    reqData.id = new Date().getTime() + parseInt(Math.random() * 100) + "";
    reqData.createDate = new Date().getTime() + "";
    blog.create(reqData).then(() => {
        resData.data = reqData;
        res.send(resData);
    }).catch((err) => {
        resData.code = 500;
        resData.msg = "标题重复";
        console.log(err);
        res.send(resData);
    })
});

//删除文章
blogRouter.delete("/:id", async (req, res) => {
    await blog.destroy({
        where: {
            id: req.params.id
        }
    });
    resData.code = 0;
    resData.msg = "";
    resData.data = "true";
    res.send(resData);
});

//修改文章
blogRouter.put("/:id", async (req, res) => {
    await blog.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    resData.data = (await blog.findAll({
        where: {
            id: req.params.id
        }
    }))[0];
    res.send(resData);
});

//获取文章
blogRouter.get("/", async (req, res) => {
    let {
        page,
        limit
    } = req.query;
    page = Number(page), limit = Number(limit);
    if(page !== page) page = 0;
    if(limit !== limit) limit = 10;
    const total = await blog.count(); //获取数据的总数
    resData.data = {
        total,
        rows: []
    };
    resData.data.rows = await blog.findAll({
        limit,
        offset: page * limit
    })
    res.send(resData);
});

//获取具体某一篇文章
blogRouter.get("/:id", async (req, res)=>{
    resData.data = await blog.findOne({
        where:{id: req.params.id}
    })
    res.send(resData);
})

module.exports = blogRouter;