import request from '@/utils/request'

export function getProjectApi(){
    return request({
        url: "/api/project",
        method: "get"
    })
}
export function setProjectApi(id, data){
    return request({
        url: `/api/project/${id}`,
        method: "put",
        data
    })
}
export function delProjectApi(id){
    return request({
        url: `/api/project/${id}`,
        method: "delete"
    })
}
export function addProjectApi(data){
    return request({
        url: "/api/project",
        method: "post",
        data
    })
}