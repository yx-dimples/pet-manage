import axiso from 'axios'

import { baseURL } from '@/config/url'

const request = axiso.create({
  baseURL: baseURL,
  timeout: 3000
})

console.log(process.env.VUE_APP_BASE_URL)

request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default request
