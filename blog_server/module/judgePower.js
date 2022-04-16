 const resData = require("./resData");
 const jwt = require("./api/jwt");
 whiteList = [{
     path: "/api/user",//用户注册
     method: "POST"
 }, {
     path: "/api/user/login",//用户登录
     method: "POST"
 },{
     path: "/api/capture",//获取验证码
     method: "GET"
 },{
     path: "/api/user/whoami",//token验证
     method: "GET"
 }] //白名单，不需要登录也可以使用，get请求都允许

 module.exports = function (req, res, next) {
    console.log(req.path, req.path.split("/")[1]);
     const result = whiteList.some((item) => { //判断是否是白名单中的路径
         return item.path === req.baseUrl + req.path && item.method == req.method || item.method === "GET";
     });
     console.log("白名单", result);
     if (result) return next();

     //不是，判断是否具有token
     const cookie = req.cookies || req.headers.authorization;
     if (!cookie) { //没有则返回错误
         res.send(resData(500, "权限不足", ""));
         return;
     } else { //有，判断用户是否存在, token是否正确
         const token = jwt.decodeToken(cookie.login);
         if (token) {
             next();
         } else {
             return res.send(resData(500, "token已过期或者被篡改", ""));
         }
     }
 }