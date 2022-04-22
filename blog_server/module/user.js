/**
 * 用户设置
 *  增加
 *  修改
 */
const express = require("express");
const resData = require("./resData");
const svg = require("./api/captureCode");
const {
    user
} = require("../dataBase/index");
const {
    createToken,
    decodeToken
} = require("./api/jwt");
const userRouter = express.Router();

// 添加用户
userRouter.post("/", async (req, res) => {
    const token = createToken({
        loginId: req.body.loginId,
        loginPwd: req.body.loginPwd
    }, req.body.maxAge * 24 * 3600 || 24 * 3600); //7天免登陆或者1天免登陆
    console.log(req.body, "body is what");
    try {
        await user.create({
            name: req.body.loginId,
            password: req.body.loginPwd,
            avatar: req.body.avatar,
            uuid: token
        })
    } catch (err) {
        res.status(500).send(sendData(500, "用户名重复", ""));
        return;
    }
    res.header("authorization", token);
    res.send(resData(200, "注册成功", ""));
});

//用户登录
userRouter.post("/login", (req, res) => {
    console.log(req.body.capture,"验证码为" ,svg.getText(), svg.getText() !== req.body.capture);
    if(svg.getText().toLowerCase() !== req.body.capture.toLowerCase()){
        return res.send(resData(500, "验证码错误", ""));
    }
    //用户信息
    const userData = {
        name: req.body.loginId,
        password: req.body.loginPwd
    };

    //判断用户是否存在
    const result = user.findOne({
        where: {
            name: userData.name
        }
    });
    if(!result) return res.send(resData(500, "用户不存在，请注册"));

    //创建token
    const token = createToken(userData, req.body.maxAge * 24 * 3600 || 24 * 3600); //7天免登陆或者1天免登陆
    res.setHeader("authorization", token);
    res.send(resData(200, "", token));

})

//用户免登陆
userRouter.get("/whoami", (req, res)=>{
    console.log(req.headers.authorization);
    const result = decodeToken(req.headers.authorization.split(" ")[1]);
    console.log(result, "user is not login", req.headers.authorization.split(" ")[1]);
    if(result){
        res.send(resData(200, "", req.headers.authorization));
    }else{
        res.send(resData(500, "token过期或者被篡改", ""));
    }
})

module.exports = userRouter;