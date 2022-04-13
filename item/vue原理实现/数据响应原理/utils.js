/**
 * 
 * @param {判断的数据} obj 
 * @returns 
 */
 function isObject(obj){
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}