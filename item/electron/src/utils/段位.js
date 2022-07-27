const {
    opendir,
    stat,
    readFile,
    writeFile
} = require("node:fs/promises");
const path = require("path");
const basePath = path.resolve(__dirname, "personalBlog");
let allFineLineNumber = 0;
let ignoreArray = [/.gitignore/, /node_modules/, /dist/, /.git/, /img/, /.jpg/, /assets/, /\.svg$/, /.ico$/, /.json/];

async function getFileLineNumber(filePath) {
    const content = await readFile(filePath, "utf-8");
    const lineNumber = content.match(/\n/g);
    if(lineNumber){
        return lineNumber.length + 1;//最后一行一般没有\n
    }else{
        return 0;
    }
}
async function getFileInfo(basePath, ignoreFileType) { //ignore exp
    const fileHandle = await opendir(basePath);
    for await (const file of fileHandle) {
        const nextBasePath = path.resolve(basePath, file.name);
        const isIgnore = ignoreFileType.some(item => {
            return item.test(nextBasePath);
        });
        if (!isIgnore) {
            const fileState = await stat(nextBasePath); //返回一个对象fs.stats对象
            if (fileState.isFile()) {
                const lineNumber = await getFileLineNumber(nextBasePath);
                console.log(nextBasePath);
                allFineLineNumber += lineNumber;
            } else {
                await getFileInfo(nextBasePath, ignoreArray);
            }
        } else {
            console.log(nextBasePath, "is ignore file");
        }
    }
}

getFileInfo(basePath, ignoreArray).then(()=>{
    console.log("总行数为", allFineLineNumber);
    const filePath = path.resolve(__dirname, "段位.txt");
    writeFile(filePath, new Date() + " : "  + allFineLineNumber + "行有效代码\n", {encoding: "utf-8", flag: "a+"});
})