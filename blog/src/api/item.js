import request from "@/utils/request.js";

export function getItemApi(){
    return request({
        url: "/api/project",
        method: "get"
    })
}