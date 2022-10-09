// 配置axios第二步
// 当前这个模块：API进行统一管理
import requests from "./request"
import mockRequests from "./mockAjax.js"

// 三级联动接口
// /api/product/getBaseCategoryList （get请求 无参数）
// 发请求：axios发请求返回promise对象

// 获取产品详情信息的接口 /api/item/{ skuId }
export const reqCategoryList = () =>
    requests({ url: "/product/getBaseCategoryList", method: "get" })
// 获取产品详情信息的接口 /api/item/{ skuId }
export const reqGoodsInfo = skuId => requests({ url: `/item/${skuId}`, method: "get" })
// 将产品添加到购物车中或者更新某一个产品的参数
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
    requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })
// 模拟数据 mock 请求
export const reqFloorList = () => mockRequests.get("/floor")
export const reqGetBannerList = () => mockRequests.get("/banner")
// 获取搜索模块 Search 的数据 地址：/api/list 方式:post 参数：需要
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }

// 当前函数是否要传参（外部）---post->data  get->params(至少是一个空对象)
export const reqGetSearchInfo = params =>
    requests({
        url: "/list",
        method: "post",
        data: params,
    })
// 获取购物车列表数据接口 /api/cart/cartList
export const reqCarList = () => requests({ url: "/cart/cartList", method: "get" })
// 删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = skuId =>
    requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })
// 修改购物车商品选中状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) =>
    requests({ url: `cart/checkCart/${skuId}/${isChecked}`, method: "get" })
// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = phone =>
    requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })
// 注册 /api/user/passport/register POST 带
export const reqUserRegister = data =>
    requests({ url: "/user/passport/register", method: "post", data })
// 登录 /api/user/passport/login
export const reqUserLogin = data => requests({ url: "/user/passport/login", method: "post", data })
// 登录获取用户信息【带着token向服务器要用户信息】 /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: "/user/passport/auth/getUserInfo", method: "get" })
// 退出登录 /api/user/passport/logout
export const reqLogout = () => requests({ url: "/user/passport/logout", method: "get" })
// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () =>
    requests({ url: "/user/userAddress/auth/findUserAddressList", method: "get" })
// 获取订单交易信息 /api/order/auth/trade
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: "get" })
// 提交订单信息 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) =>
    requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: "post", data })
// 获取订单支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = orderId =>
    requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })
// 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = orderId =>
    requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })
// 获取个人中心列表 /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page, limit) =>
    requests({ url: `/order/auth/${page}/${limit}`, method: "get" })
