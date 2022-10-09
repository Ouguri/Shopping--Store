import axios from 'axios'
import nprogress from 'nprogress'

const requests = axios.create({
  baseURL: "/mock",
  timeout:5000
})

requests.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (err) => {
  alert("服务器响应失败", err)
})

export default requests