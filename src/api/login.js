import request from './request'

// 登录
export const login = data => {
  return request({
    url: '/admin/login',
    data,
    method: 'POST'
  })
}

// 管理员信息
export const getAdminInfo = () => {
  return request({
    url: '/admin/info',
    method: 'GET'
  })
}

// 退出
export const signout = () => {
  return request({
    url: '/admin/signout',
    method: 'GET'
  })
}
