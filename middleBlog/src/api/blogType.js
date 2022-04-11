import request from '@/utils/request'

export function getBlogType(){
    return request({
        url: "/api/blogtype",
        method:"get"
    })
}
export function setBlogType(id, data){
    return request({
        url: `/api/blogtype/${id}`,
        method: "put",
        data
    })
}
export function delBlogType(id){
    return request({
        url: `/api/blogtype/${id}`,
        method: "delete"
    })
}
export function addBlogType(data){
    return request({
        url: "/api/blogtype",
        method:"post",
        data
    })
}
export function getOneBlogType(id){
    return request({
        url: `/api/blogtype/${id}`,
        method: "get"
    })
}