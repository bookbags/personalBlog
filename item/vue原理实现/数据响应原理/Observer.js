import {isObject} from "./utils.js";
import {Dep} from "./Dep.js";
/**
 * 
 * @param {目标对象} obj 
 * @param {键} key 
 * @param {值} value 
 */
function switchObj(obj, key, value){//将对象转化为响应式对象；产生闭包现象
    if(isObject(value)){//对象
        new Observer(value);
    }
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get(){//用于截获依赖
            dep.addDep();//保存依赖
            return value;
        },
        set(newValue){//通知依赖
            value = newValue;
        }
    })
}

export class Observer{
    constructor(obj){//对象或者数组，将其数据转化为响应式
        this.value = obj;

        if(isObject(obj)){//确保obj必须是一个对象{}
            walk(obj);
        }
    }
    walk(obj){
        const keys = Object.keys(obj);//自有的可遍历的属性
        for(let i = 0, j = keys.length; i < j; i ++){
            switchObj(obj, keys[i], obj[keys[i]]);
        }

    }
}