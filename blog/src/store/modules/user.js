import {
    loginApi
} from "@/api/user.js";

export default {
    namespace: true,//启动命名空间
    state: { //保存用户的登录信息
        admin: ""
    },
    mutations: {
        editAdmin(store, msg) {
            store.admin = msg;
        },
        removeAdmin(store) {
            store.admin = "";
        },
    },
    actions: {
        async loginIn({
            commit
        }, msg) { //解构，提取出commit方法
            const res = await loginApi(msg);
            if (res.data) {
                commit("editAdmin", res.data);
                localStorage.setItem("admin", res.data);
            } else { //登录失败
                console.log(res);
            }
            return res
        }
    }
}