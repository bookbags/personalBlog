import request from '@/utils/request'
export default function () {
    return request({
      url: '/api/capture',
      method: 'get'
    })
  }