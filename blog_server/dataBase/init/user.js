const user = require("../tables/user");
user.sync({force: true}).then(()=>console.log("add success"))