/**
 * 
 * @param {状态码} code 
 * @param {描述信息} msg 
 * @param {响应数据} data 
 * @returns 
 */
module.exports = function(code, msg, data=""){
    return {
        code,
        msg, 
        data
    }
}