// 登录与注册
// vuex存储数据不是持久化的
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token.js'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清楚本地数据
  CLEAR(state) {
    // 把仓库的用户信息清空
    state.token = ''
    state.userInfo = {}
    // 本地存储清空
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode({commit}, phone) {
    // 获取验证码的接口：把验证码返回，但是正常情况是后台把验证码发到用户手机上
    let result = await reqGetCode(phone)
    if(result.code == 200){
      commit('GETCODE', result.data)
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister(context, user) {
    let result = await reqUserRegister(user)
    console.log(result);
    if(result.code == 200) {
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登录 token
  async userLogin({commit}, data) {
    let result = await reqUserLogin(data)
    console.log(result);
    // 服务器下发的token,是用户唯一标识符
    // 经常通过token找服务器要用户信息进行展示
    if(result.code == 200) {
      commit('USERLOGIN', result.data.token)
      // 本地持久化存储token
      setToken(result.data.token)
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}) {
    let result = await reqUserInfo()
    if(result.code == 200) {
      // 提交用户信息
      commit('GETUSERINFO', result.data)
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({commit}) {
    // 向服务器发起一次请求通知服务器清除token
    let result = await reqLogout()
    if(result.code == 200) {
      // action不能操作state，要提交给mutation
      commit('CLEAR')
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}