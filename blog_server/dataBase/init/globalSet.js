const globalSet = require("../tables/globalSet");
const {baseUrl} = require("./common");
globalSet.sync({
    force: true
}).then(() => {
    globalSet.create({
        "avatar": baseUrl + "img0.jpg", // 博主照片
        "siteTitle": "舍予三水兽的博客", // 网站标题
        "gitee": "https://gitee.com/qianyuzhu/study", // 博主github主页
        "qq": "3147079725", // 博主 qq
        "qqQrCode": baseUrl + "QQ.jpg", // 博主qq二维码
        "weixin": "RGBA25500", // 博主微信号
        "weixinQrCode": baseUrl + "weixin.jpg", // 博主微信二维码
        "mail": "19114033589@aliyun", // 博主邮箱
        "icp": "黑ICP备17001719号", // 网站备案号
        "giteeName": "舍予三水兽", // 博主github名称
        "favicon": baseUrl + "favicon/1.ico", // 网站图标
        "id": new Date().getTime() + ""
    }).then(() => {
        console.log("数据添加成功");
    })
}).catch(()=>{
    console.log("error");
})