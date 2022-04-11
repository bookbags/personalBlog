import request from '@/utils/request'

export function setControlApi(data){
    request({
        url: "/api/admin",
        method: "put",
        data
    })
}