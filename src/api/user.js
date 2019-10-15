import request from '@/utils/request'
import axios from 'axios'
// 登录
export function login(data) {
  return request({
    // url: 'http://132.232.89.22:8998/login',
    url: 'http://127.0.0.1:8998/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo(token) {
  return request({
    // url: 'http://132.232.89.22:8998/getadmin',
    url: 'http://127.0.0.1:8998/getadmin',
    method: 'get',
    params: { token }
  })
}
// 退出登录
export function logout() {
  return request({
    // url: 'http://132.232.89.22:8998/logout',
    url: 'http://127.0.0.1:8998/logout',
    method: 'post'
  })
}
// 创建用户
export function createUser(data) {
  // return axios.post('http://132.232.89.22:8998/register', data)
  return axios.post('http://127.0.0.1:8998/register', data)
}
