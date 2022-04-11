import request from "@/utils/request.js";

export function getCaptureApi(){
    return request({
        url: "/api/capture",
        method: "get"
    })
}