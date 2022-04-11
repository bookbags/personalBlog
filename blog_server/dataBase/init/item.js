const item = require("../tables/item");
item.sync({force: true}).then(()=>{
    console.log("添加完成");
})