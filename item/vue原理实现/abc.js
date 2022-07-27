const lines = document.querySelectorAll("[id^=i_]");
const class1 = "typing";
const class2 = 'typing typing_on';
(async ()=>{
    for(const line of lines){
        line.className = class2;
        const test = line.getElementsByTagName("span")[1].innerText;
        const input = line.getElementsByTagName("input")[1];
        await new Promise((resolve)=>{
            setTimeout(()=>{resolve()}, 1000);
        })
        input.value = test;
        line.className = class1;
    }
})()