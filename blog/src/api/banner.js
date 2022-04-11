import request from "@/utils/request.js";

export function getBannerApi(){
    return request({
        url: "/api/banner",
        method: "get"
    })
}