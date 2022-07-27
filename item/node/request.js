const http = require("node:http");
const Url = require("node:url");

http.request("https://www.baidu.com/", (res, err)=>{
    console.log(res);
    console.log(err);
});
