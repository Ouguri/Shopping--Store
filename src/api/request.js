// 配置axios第一步
// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// 引入进度条的样式 要改颜色就去他的css文件里面改，在node_modules里面
import "nprogress/nprogress.css"
// start: 进度条开始 done：进度条结束
// 在当前模块中引入store
import store from '@/store/index.js'

// 利用axios对象的方法create，去创建一个axios实例
// request就是axios，但可以稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求时路径会出现api
  baseURL:"/api",
  // 代表请求超时的时间5s
  timeout:5000
})

// 请求拦截器：在发请求之前，可以检测到并做一些事情
requests.interceptors.request.use((config)=>{
  // config：配置对象，里面有一个属性很重要，header请求头
  // 进度条开始动
  if(store.state.detail.uuid_token) {
    // 给请求头添加一个字段：
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 判断携带token带给服务器
  if(store.state.user.token) {
    
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
  // 成功的回调函数：服务器响应数据回来后，响应拦截器可以检测到并做一些事情
  nprogress.done()
  return res.data
},(error)=>{
  // 响应失败的回调函数
  return Promise.reject(new error('faile')) // 终止promise链
})

// 对外暴露
export default requests
