import objToRes from "../utils/objToRes.js";
export default function init(constructor){
    constructor.prototype._init = function(option){//用于初始化组件实例，option就是组件实例
        //将data转化为响应式数据, 赋给组件实例
        objToRes(this, option.data);
    }
    return constructor;
}