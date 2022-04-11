import axios from "axios"
axios.interceptors.request.use(function (config) { //请求拦截
    console.log("请求拦截", config);
    return config;
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("响应拦截", response);
    return response.data;//axious封装，得到服务器响应的结果
});
export default axios;