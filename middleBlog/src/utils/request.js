import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers["authorization"] = "Bearer " + localStorage.getItem("adminData");
    return config;
  }
)

// // response interceptor
service.interceptors.response.use(
  response => {//拦截响应，返回响应的数据对象
    if(response.headers.authorization){//将用户的token保存到localStorage
      localStorage.adminData = response.headers.authorization;
    }
    return response.data
  }
)

export default service
