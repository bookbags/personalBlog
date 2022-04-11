import request from '@/utils/request'

export function getAboutMeApi(){
    return request({
        url: "/api/about",
        method: "get"
    })
}
export function setAboutMeApi(data){
    return request({
        url: "/api/about",
        method: "post",
        data
    })
}