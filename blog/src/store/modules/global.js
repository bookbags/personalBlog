import {
    getMainApi
} from "@/api/main.js";

export default {
    state: {
        globalData: null
    },
    mutations: {
        editGlobalData(state, data) {
            state.globalData = data.data;
        }
    },
    actions: {
        async getGlobalData({
            commit
        }) {
            try {
                const data = await getMainApi();
                commit("editGlobalData", data);
                return data;
            } catch (e) {
                console.log("全局数据请求", e);
            }
        }
    }
}