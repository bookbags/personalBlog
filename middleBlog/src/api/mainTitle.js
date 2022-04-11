import request from '@/utils/request'

export function getBanner() {
  return request({
    url: '/api/banner',
    method: 'get',
  })
}
export function setBanner(id, data){
  return request({
    url: `/api/banner/${id}`,
    method: "put",
    data
  })
}