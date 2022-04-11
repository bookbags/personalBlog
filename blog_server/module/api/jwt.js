const jwt = require("jsonwebtoken");
const key = "hello world";
module.exports.createToken = function (body, maxAge) {
    return jwt.sign(body, key, {
        expiresIn: maxAge
    });
};
module.exports.decodeToken = function (token) {
    try{
        return jwt.verify(token, key);
    }catch{
        return false;
    }
}