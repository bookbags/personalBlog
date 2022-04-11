import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {//获取本地的用户登录信息
  return localStorage.getItem("adminData");
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {//移除错误的cookie
  return localStorage.removeItem("adminData");
}
