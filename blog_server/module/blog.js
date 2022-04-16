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
        res.send(resData(200, "添加完成", reqData));
    }).catch((err) => {
        resData.code = 500;
        resData.msg = "标题重复";
        res.send(resData(500, "标题重复", err));
    })
});

//删除文章
blogRouter.delete("/:id", async (req, res) => {
    await blog.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send(resData(200, "删除完成", ""));
});

//修改文章
blogRouter.put("/:id", async (req, res) => {
    await blog.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = (await blog.findAll({
        where: {
            id: req.params.id
        }
    }))[0];
    res.send(resData(200, "修改完成"), data);
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
    const rows = await blog.findAll({
        limit,
        offset: page * limit
    })
    res.send(resData(200, "success", {
        total, 
        rows
    }));
});

//获取具体某一篇文章
blogRouter.get("/:id", async (req, res)=>{
    const data = await blog.findOne({
        where:{id: req.params.id}
    })
    res.send(resData(200, "success", data));
})

module.exports = blogRouter;