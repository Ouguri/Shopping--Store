import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/'
// 临时游客身份模块uuid------生成一个随机字符串（不能再变了）
import { getUUID } from '@/utils/uuid_token.js'

const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const actions = {
  // 获取产品信息的action
  async getGoodInfo({commit}, skuId) {
    let result = await reqGoodsInfo(skuId)
    if(result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart(context, {skuId, skuNum}) {
     /* 说明书
     加入购物车返回的解构
     加入购物车以后（发请求），前台将参数带给服务器
     服务器写入数据成功，返回code==200，而没有返回其他数据，代表这次操作成功
     因为服务器没有返回其余数据，因此我们不惜要三连环存储数据
     发请求:前端带一些参数给服务器[需要存储这些数据], 存储成功了, 没有给返回数据
     */
    
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if(result.code == 200) {
      // 代表服务器加入购物车成功
      return "ok"
    }else{
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const getters = {
  categoryView(state) {
    // 比如state.goodInfo初始状态是空对象，空对象的categoryName属性是undefined，返回undefined会带来假报错，所以至少要返回一个空对象
    return state.goodInfo.categoryView || {}
  },
  // 商品详情数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 商品选择配置参数信息
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

// state actions mutations getters