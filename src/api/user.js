import request from './request'

// 用户登录
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

// 获取用户列表
export function getUserList() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

// 根据条件查询用户
export function getUserByCondition(data) {
  return request({
    url: '/user/listByCondition',
    method: 'get',
    params: {
      user: data
    }
  })
}

// 获取用户详情
export function getUserDetail(id) {
  return request({
    url: `/user/get/${id}`,
    method: 'get'
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 更新用户
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'delete'
  })
} 