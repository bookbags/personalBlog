import request from "@/utils/request.js";
export function loginApi(user){
    return request({
        url: "/api/user/login",
        data: user,
        method: "post"
    })
}