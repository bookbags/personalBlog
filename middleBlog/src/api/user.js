import request from '@/utils/request'

export function loginApi(data) {
  //data就是需要携带的数据
  return request({
    url: '/api/user/login',
    method: 'post',
    data//这是简写，完整写法为data:data
  })
}

export function getInfoApi() {
  return request({
    url: '/api/user/whoami',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
