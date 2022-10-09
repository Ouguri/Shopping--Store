// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
// 为了拿到token，需要引入store
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace


// 重写push|replace
// 第一个参数:原来的push方法,往哪里跳转(传递那些参数)
// 第二个参数:成功的回调
// 第三个回调:失败的回调
VueRouter.prototype.push = function(location,resolve,reject) {
  if(resolve && reject) {
    // call||apply:相同点,都可以调用函数一次,都可以篡改函数的上下文一次
    // 不同点:call与apply传递参数,call用逗号隔开,apply方法执行,传递数组
    originPush.call(this,location,resolve,reject)
  }else {
    originPush.call(this,location, ()=>{}, ()=>{})
  }
},
VueRouter.prototype.replace = function(location, resolve, reject) {
  if(resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  }else {
    originReplace.call(this, location, ()=>{}, ()=>{})
  }
}

// 配置路由
let router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为 三个参数：to from savePostition
  scrollBehavior() {
    return { y:0 }
  }
})

// 全局守卫：前置守卫
router.beforeEach(async (to, from, next)=>{
  // to---去哪，跳转到哪个路由信息
  // from---从哪来，从哪个路由来的信息
  // next---放行函数 next()放行 next(path)放行到指定的路由 next(false)
  // next()
  let token = store.state.user.token
  // 用户信息 要判断字符串，因为判断userInfo这个对象，即使对象为空也会返回真
  let name = store.state.user.userInfo.name
  if(token) {
    // 阻止用户登录再去login
    if(to.path=='/login') {
       next('/')
    }else {
      // 登录---去的不是login【home，search，detail等】
      // 如果用户名已经存在
      if(name){
        next()
      }else{
        // 没有用户信息，派发action让仓库存储用户信息再跳转
              // 获取用户信息在首页展示
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了
          // 清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  }else{
    // 未登录---不能去交易相关、支付相关【pay、paysuccess】、不能去个人中心
    // 未登录去这些地方统一跳转到登录页，其他地方放行【home、search、shopCart】
    let toPath = to.path
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
      // 把未登录的时候想去的而没去的地方存储于地址栏中【路由地址存在了地址栏】
      next('/login?redirect='+toPath)
    }else{
      // 其他地方放行【home、search、shopCart】
      next()
    }
  }
})

export default router