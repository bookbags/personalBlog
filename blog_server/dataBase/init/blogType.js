const blogType = require("../tables/blogType");
blogType.sync({force: true}).then(()=>{
    blogType.bulkCreate([
        {
            name: "js",
            articleCount: 0,
            order: 0,
            id: new Date().getTime() + ""
        },{
            name: "css",
            articleCount: 0,
            order: 1,
            id: new Date().getTime() + 1 + ""
        },{
            name: "vue",
            articleCount: 0,
            order: 2,
            id: new Date().getTime() + 2 + ""
        },
    ])
}).catch((err)=>{
    console.log(err);
})