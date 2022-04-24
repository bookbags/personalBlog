import request from "@/utils/request.js";
export default function(){
    return request({
        url: "/api/about",
        method: "get"
    })
}