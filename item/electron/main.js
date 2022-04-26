const { app, BrowserWindow } = require('electron');
const path = require("path");

const createwindow = ()=>{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.resolve(__dirname, "./src/preload.js")
        }
    })
    win.loadFile("./page/index.html");
}

app.whenReady().then(()=>{
    createwindow();
});

app.on("window-all-closed", ()=>{
    app.quit();//ignore Mac OS
})