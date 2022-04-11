import request from '@/utils/request'

export function getSetApi(){
    return request({
        url: "/api/set",
        method: "get"
    })
}
export function setSetApi(data){
    return request({
        url: "/api/set",
        method: "put",
        data
    })
}