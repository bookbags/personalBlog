import Vuex from "vuex"
import Vue from 'vue'
import user from "./modules/user.js"
import global from "./modules/global.js"
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user,
        global
    }
});