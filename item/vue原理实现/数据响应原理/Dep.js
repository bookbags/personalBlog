export class Dep{
    constructor(){
        this.dep = [];//保存依赖
    }
    addDep(value){//当依赖调用响应式数据时，将自己赋值给window.target
        window.target && this.dep.push(value);
    }
    notifyDep(){//依赖需要提供update函数，当数据变化时，执行update函数
        for(let i = 0, j = this.dep.length; i < j; i ++){//上下文如何保证，执行其需要执行的地方？
            this.dep[i].update();
        }
    }
}