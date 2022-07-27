const aboutMe = require("../tables/aboutMe");
aboutMe.sync({
    alert: true
}).then(()=>{
    console.log("aboutMe创建成功");
}).catch(err=>console.log("this is err", err));