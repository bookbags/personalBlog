/**
 * 
 * @param {需要转化为响应式的对象} obj 
 * 使用ES5的形式
 */
export default function objToRes(vm, obj) { //会递归调用 所以，obj的值只可能是对象
    if (obj instanceof Object) {
        const keys = Object.keys(obj);
        for (const item of keys) {
            defineProperty(vm, item, obj[item]);
        }
    } else {
        throw new TypeError("参数错误");
    }
}

function arrayToRes(vmArray, array) {
    let length = 0;
    for (const item of array) {
        vmArray.push(item);
        length += 1;
        if (item instanceof Array) {
            arrayToRes(vmArray[lenth - 1] = [], item);
        } else if (item instanceof Object) {
            objToRes(vmArray[length - 1] = {}, item);
        }
    }
    switchProto(vmArray);//修改原型
    console.log("vmArray", vmArray);
}

function switchProto(array) {//本质还是调用Array.prototype的方法，只不过进行了包装
    const prop = {};
    ["push", "pop", "shift", "unshift", "splice", "reverse", "sort"].forEach(item => {
        prop[item] = function (...param) {
            console.log("我数组改变了");
            Array.prototype[item].apply(this, param);
        }
    })
    prop.__proto__ = Array.prototype;
    array.__proto__ = prop;
}

function defineProperty(vm, key, value) { //有闭包现象
    if (value instanceof Array) { //数组的监听，是通过修改原型来实现的
        arrayToRes(vm[key] = [], value);
        value = vm[key];
    } else if (value instanceof Object) { //对象的话，需要将对象内部也转换为响应式
        objToRes(vm[key] = {}, value); //防止嵌套的对象，全部，赋给组件实例
        value = vm[key]; //此时vm[key] 保存的是响应式对象，value还是普通对象，所以修改value
    } //原始值，直接转化为存取器属性,非原始值，将内部数据转化为响应式数据后，在将自身，转化为存取器属性
    Object.defineProperty(vm, key, {
        configurable: true,
        enumerable: true,
        get() {
            console.log("有人想得到我");
            return value;
        },
        set(newValue) {
            console.log(value, "我变了");
            value = newValue;
        }
    })
}