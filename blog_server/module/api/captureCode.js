const svgCaptcha = require('svg-captcha');
let text = "";
module.exports.getSvg = function(){
    const captcha = svgCaptcha.create({
        noise: 4,
        color: "#fff",
        background: "#666"
    });
    text = captcha.text;
    return captcha.data;
};
module.exports.getText = function(){
    return text;
}