const administrator = require("../tables/administrator");
administrator.sync({
    force: true
}).then(() => {
    administrator.create({
        loginId: "bookbag",
        loginPwd: "bookbags"
    });
}).catch((err)=>{
    console.log(err);
})