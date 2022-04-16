import {
  loginApi,
  logoutApi,
  getInfoApi
} from '@/api/user'

import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

import {
  resetRouter
} from '@/router'

const getDefaultState = () => {
  return {
    // token: getToken(),
    // name: '',
    // avatar: ''
    user: ""
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USER: (state, user) => {
    state.user = user;
  }
}

const actions = {
  login({
    commit
  }, userInfo) {
    //commit 是全局的commit
    //userInfo 就是表单数据
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(res => {
        const {
          data
        } = res; //截取出需要的数据
        //如果data没有数据，表明密码或者账号或者验证码出错
        if (data) {
          commit("SET_USER", data); //在仓库中保存响应的数据
          resolve(data);
        } else {
          reject(res);
        }
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfoApi().then((data) => { //得到服务器对localStorage的判断结果
        if (data.data) {
          commit("SET_USER", data.data);
          resolve(data);
        } else {
          console.log("无效cookie", data);
          reject("登录已过期");
        }
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE') //重置vuex中的用户数据
      resolve()
      // logoutApi(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')//重置vuex中的用户数据
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE') //初始化state
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
