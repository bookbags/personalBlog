import request from '@/utils/request'

export function getBlog(page = 0, limit = 10){
    return request({
        url: "/api/blog",
        method:"get",
        params:{
            page,
            limit
        }
    })
}
export function deleteBlog(id){
    return request({
        url: `/api/blog/${id}`,
        method: "delete"
    })
}
export function setBlogApi(id, data){
    return request({
        url: `/api/blog/${id}`,
        method: "put",
        data
    })
}
export function addBlogApi(data){
    return request({
        url: "/api/blog",
        method: "post",
        data
    })
}
export function getIdBlogApi(id){
    return request({
        url: `/api/blog/${id}`,
        method: "get"
    })
}