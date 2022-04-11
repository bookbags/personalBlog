 const resData = require("./resData");
 const jwt = require("./api/jwt");
 whiteList = [{
     path: "/api/user",
     method: "POST"
 }, {
     path: "/api/user/login",
     method: "POST"
 },{
     path: "/api/capture",
     method: "GET"
 },{
     path: "/api/user/whoami",
     method: "GET"
 }] //白名单，不需要登录也可以方法

 module.exports = function (req, res, next) {
    console.log(req.path, req.path.split("/")[1]);
     const result = whiteList.some((item) => { //判断是否是白名单中的路径
         return item.path === req.baseUrl + req.path && item.method == req.method || req.path.split("/")[1] !== "api";
     });
     console.log("白名单", result);
     if (result) return next();

     //不是，判断是否具有token
     const cookie = req.cookies || req.headers.authorization;
     if (!cookie) { //没有则返回错误
         resData.code = 500;
         resData.msg = "没有权限";
         resData.data = null;
         res.send(resData);
         return;
     } else { //有，判断用户是否存在, token是否正确
        console.log("cookie", cookie);
         const token = jwt.decodeToken(cookie.login);
         console.log("token", token);
         if (token) {
             next();
         } else {
             resData.code = 500;
             resData.msg = "用户不存在";
             resData.data = null;
             res.send(resData);
             return;
         }
     }
 }