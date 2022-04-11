const blogType = require("../tables/blogType");
const blog = require("../tables/blog");
blogType.hasMany(blog,{
    sourceKey: "name",
    foreignKey: "blogTypeName"
});
blog.belongsTo(blogType,{
    targetKey: "name",
    foreignKey: "blogTypeName"
});
blog.sync({force: true}).then(()=>{
    console.log("同步成功");
}).catch(err=>console.log(err));