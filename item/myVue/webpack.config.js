const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const entryPath = path.resolve(__dirname, "./src/index.js");
const outputPath = path.resolve(__dirname, "./dist");
const pagePath = path.resolve(__dirname, "./page", "./index.html");
module.exports = function(){
    return {
        mode: "development",
        entry: entryPath,
        output:{//因为只有一个文件，所以使用静态文件名
            filename: "myVue.js",
            path: outputPath
        },
        devtool: "eval-source-map",
        //watch:true,
        plugins:[
            new CleanWebpackPlugin(),//清空生成目录
            new HtmlWebpackPlugin({//自动加载html
                title: "this is myVue test page",
                filename: "index.html",
                template: pagePath,
                chunks:["main"]
            }),
        ],
        devServer:{//打开浏览器，配合webpack-server-blugin
            static:{
                directory: path.resolve(__dirname, "page")
            },
            port: 8090,
            open:true
        }
        
    }
}