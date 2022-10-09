// search模块的小仓库
import { reqGetSearchInfo } from "../../api"

const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList({commit},params = {}) {
    let result = await reqGetSearchInfo(params)
    if(result.code == 200) {
      commit("GETSEARCHLIST", result.data)
    }
  }
}
// 计算属性，在项目当中，为了简化(仓库)数据而生
// 把将来组件当中需要用的数据简化【方便组件获取数据】
// state当前仓库的state，非大仓库的state
const getters = {
  goodsList(state) {
    // return state.searchList.goodsList 如果服务器的数据回来了，是一个数组，加入网络不给力/没网络，这将会返回undefined
    // 
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}