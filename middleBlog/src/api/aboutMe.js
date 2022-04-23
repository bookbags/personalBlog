import request from '@/utils/request'

export function getTaskApi() {
  return request({
    url: "/api/about",
    method: "get"
  })
}

export function addTaskApi(data) {
  return request({
    url: "/api/about",
    method: "post",
    data
  })
}

export function setTaskApi(data) {
  return request({
    url: "/api/about/" + data.createDate,
    method: "put",
    data
  })
}
export function getTaskTypeApi() {
  return request({
    url: "/api/about/taskType",
    method: "get"
  })
}
