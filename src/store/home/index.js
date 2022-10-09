// home模块的小仓库
// 引入axios请求
import {reqCategoryList, reqGetBannerList, reqFloorList} from '@/api'

const state = {
  // state中默认初始值别瞎写，服务器返回对象，起始值就是对象
  categoryList: [],
  BannerList: [],
  floorList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, BannerList) {
    state.BannerList = BannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({commit}) {
    let result = await reqCategoryList()
    if(result.code == 200){
      commit("CATEGORYLIST", result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({commit}) {
    let result = await reqGetBannerList()
    if(result.code == 200) {
      commit("GETBANNERLIST", result.data)
    }
  },
  async getFloorList({commit}) {
    let result = await reqFloorList()
    if(result.code == 200) {
      // 提交 mutations
      commit("GETFLOORLIST", result.data)
    }
  }
}
// 计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}


  //  categoryList(context) {
  //   console.log('action中的categoryList被调用了');
  //   reqCategoryList().then((resolve)=>{
  //     if(resolve.code == 200){
  //       context.commit("CATEGORYLIST", resolve.data)
  //     }
  //   })
  // }