import request from "@/utils/request.js";

export function getMainApi(){
    return request({
        url: "/api/setting",
        method: "get"
    })
}