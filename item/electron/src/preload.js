window.addEventListener("DOMContenLoaded", ()=>{
    const replaceText = (selector, text)=>{
        const element = document.getElementById(selector);
        if(element) element.innerText = text;
    }
    replaceText("app", "ou are my first app");
})
setTimeout(()=>{
    document.getElementById("app").innerText = "you are my first app";
}, 2000);