import axios from "axios"

axios.interceptors.response.use(function (response) {
    return response.data;//axious封装，得到服务器响应的结果
});

export default axios;