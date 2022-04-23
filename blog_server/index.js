const express = require("express");
const path = require("path");
const app = express();
const staticBaseUrl = path.resolve(__dirname);
const setRouter = require("./module/globalSet");
const bannerRouter = require("./module/banner")
const blogTypeRouter = require("./module/blogType");
const blogRouter = require("./module/blog");
const messageRouter = require("./module/message");
const projectRouter = require("./module/project");
const userRouter = require("./module/user");
const aboutMeRouter = require("./module/aboutMe");
const judegPower = require("./module/judgePower");
const cookieParser = require("cookie-parser");
const svg = require("./module/api/captureCode");
const upload = require("./module/api/upload");
const HtmlUrl = path.resolve(__dirname, "./dist");

//查看请求
app.use((req, res, next)=>{
    console.log("请求路径为", req.path);
    console.log("请求方式为", req.method);
    next();
})

//获取post的数据
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//获取cookie
app.use(cookieParser());

//用户访问的一件事就是鉴权，判断用户的权限
// app.use(judegPower);

//获取静态资源
app.use(express.static(staticBaseUrl));
app.use(express.static(HtmlUrl));

//选择API接口
app.use("/api/setting", setRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/blogType", blogTypeRouter);
app.use("/api/blog", blogRouter);
app.use("/api/message", messageRouter);
app.use("/api/project", projectRouter);
app.use("/api/user", userRouter);
app.use("/api/about", aboutMeRouter);

//获取验证码
app.get("/api/capture", (req, res)=>{
    res.send(svg.getSvg());
})
//上传接口, 只允许上传图片
app.post("/api/upload", upload.single("file"), (req, res)=>{
    console.log(req.file);
    res.send("./static/img/" + req.file.filename);
});

//错误处理
app.use((err, req, res, next)=>{
    res.status(500).send(JSON.stringify(err));
})
app.listen("8080", ()=>{
    console.log('服务器启动, 监听8080端口');
})