let html = '<div class="son" id="mySon>">hello world<div class="son1" id="mySon1>"></div></div>'

function parseHTML(html) {
    const tagName = /^\s*<(\w+)/;
    const tag = html.match(tagName);
    html = html.substring(tag[0].length);
    const collectAttr = [];
    html = getAttr(html);
    console.log("剩余html is ", html);
    console.log("attr is ", collectAttr);

    function getAttr(html) {
        const attrExp = /^\s+(\w+)(?:\s*=\s*(?:([\w\s\._$]+)|'([^']+)'|"([^"]+)")){1}/;
        while (html) {
            const attr = html.match(attrExp);
            if (attr) {
                collectAttr.push(attr);
                html = html.substring(attr[0].length);
            } else { //标签是自闭合的，标签不是自闭合的
                const selfEnd = /^\s*\/>/;
                const notSelfEnd = /^\s*>/;
                const selfEndResult = html.match(selfEnd);
                if (selfEndResult) {
                    return html.substring(selfEndResult[0].length);
                } else {
                    const result = html.match(notSelfEnd);
                    if (result) {
                        html.substring(result[0].length);
                        return html;
                    } else {
                        throw new Error("标签不完整");
                    }
                }
            }
        }
    }
    let text = "";

    function getText(html) {
        const textExp = /^([\w\W]*?)(<\/[\w]+>|<)/
        const result = html.match(textExp);
        text = result[1];
        const end = result[2];
        console.log("文本为 ", text);
        console.log((/</).test(end), end);
        if((/<\/[\w]+>/).test(end)){//结束
            html = html.substring(result[0].length);
            console.log("截取文本", html);
            return html;
        }else if((/</).test(end)){//子元素
            console.log("子元素");
            html = html.substring(result[1].length);
            console.log("截取文本", html);
            html = parseHTML(html);
            return html;
        }
    }
    html = getText(html);
    return collectAttr;
}
const AST = {};
console.log("属性列表", parseHTML(html));