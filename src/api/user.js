import request from '@/utils/request'
import axios from 'axios'
export function login(data) {
  return request({
    url: 'http://localhost:3000/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:3000/getadmin',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://localhost:3000/logout',
    method: 'post'
  })
}

export function createUser(data) {
  return axios.post('http://localhost:3000/register', data)
}
