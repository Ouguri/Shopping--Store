import { reqCarList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
  cartList: []
}
const actions = {
  // 获取购物车列表数据
  async getCarList({commit}) {
    let result = await reqCarList()
    if(result.code == 200) {
      commit('GETCARLIST',result.data)
    }
  },
  // 删除购物车的商品
  async deleteCartListById(context, skuId) {
    let result = await reqDeleteCartById(skuId)
    if(result.code == 200) {
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车产品选中状态 无返回数据没必要存仓库state
  async updateCheckedById(context, {skuId, isChecked}) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if(result.code == 200) {
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的产品
  async deleteAllCheckCart({ dispatch, getters }) {
    // context：小仓库---commit【提交mutations修改state，getters计算属性，dispatch派发actions，state当前仓库数据】
    // 获取购物车中全部的产品（数组）
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item=>{
      // 需要判断每一次删除是否成功然后重新发请求渲染页面这里可以用Promise.all
      let result = item.isChecked==1 ? dispatch('deleteCartListById', item.skuId) : ''
      // 将每一次返回的Promise添加到数组当中
      PromiseAll.push(result) 
    })
    // 只要全部的promise{p1,p2......}都成功,返回的结果就成功,否则就会失败
    return Promise.all(PromiseAll)
  },
  // 修改全部产品的状态 --- 这里调用getters也行,都有这个cartList数组
  async updateAllCartIsChecked({dispatch, state}, isChecked) {
    // 数组
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item=>{
      let result = dispatch('updateCheckedById', {skuId:item.skuId, isChecked})
      PromiseAll.push(result)
    })
    return Promise.all(PromiseAll)
  }
}
const mutations = {
  GETCARLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}