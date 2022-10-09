// 路由配置信息
// 引入路由组件
// import Home from '@/page/Home/index.vue'
// import Login from '@/page/Login/index.vue'
// import Register from '@/page/Register/index.vue'
// import Search from '@/page/Search/index.vue'
// import Detail from '@/page/Detail/index.vue'
// import AddCartSuccess from '@/page/AddCartSuccess/index.vue'
// import ShopCart from '@/page/ShopCart/index.vue'
// import Trade from '@/page/Trade/index.vue'
// import Pay from '@/page/Pay/index.vue'
// import PaySuccess from '@/page/PaySuccess/index.vue'
// import Center from '@/page/Center/index.vue'
// 引入二级路由组件
// import MyOrder from '@/page/Center/myOrder/index.vue'
// import GroupOrder from '@/page/Center/groupOrder/index.vue'
// 路由懒加载
// const foo = () => import('@/page/Home')

export default [
    {
      path:"/communication",
      component:() => import('@/page/Communication/Communication.vue'),
      children:[
        {path:'event', component: () => import('@/page/Communication/EventTest/EventTest.vue')},
        {path:'model', component: () => import('@/page/Communication/ModelTest/ModelTest.vue')},
        {path:'sync', component: () => import('@/page/Communication/SyncTest/SyncTest.vue')},
        {path:'attrs-listeners', component: () => import('@/page/Communication/AttrsListenersTest/AttrsListenersTest.vue')},
        {path:'children-parent', component: () => import('@/page/Communication/ChildrenParentTest/ChildrenParentTest.vue')},
        {path:'scope-slot', component: () => import('@/page/Communication/ScopeSlotTest/ScopeSlotTest.vue')},
      ],
      meta:{show:false}
    },
    {
      path: "/center",
      // redirect: "/center/myorder",
      component: () => import('@/page/Center'),
      meta:{show:false},
      // 二级路由组件
      children:[
        {path:'myorder', component: () => import('@/page/Center/myOrder/index.vue')},
        {path:'grouporder', component: () => import('@/page/Center/groupOrder/index.vue')},
        {path:'/center', redirect:'/center/myorder'}
      ]
    },
    {
      path: "/paysuccess",
      component: () => import('@/page/PaySuccess'),
      meta:{show:true}
    },
    {
      path: "/pay",
      component: () => import('@/page/Pay'),
      meta:{show:true},
      beforeEnter: (to, from, next) => {
        if(from.path=="/trade"){
          next()
        }else{
          next(false)
        }
      }
    },
    {
        // 交易页
      path:"/trade",
      name:'trade',
      component:() => import('@/page/Trade'),
      meta:{show:true},
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        // 去交易页面，必须是从购物车来
        if(from.path=="/shopcart"){
          next()
        }else{
          // 停留在当前页
          next(false)
        }
      }
    },
    {
      // 购物车
      path:"/shopcart",
      name:"ShopCart",
      component:() => import('@/page/ShopCart'),
      meta:{show:true},
    },
    {
      // 加入购物车
      path:"/addCartSuccess",
      name:"addCartSuccess",
      component:() => import('@/page/AddCartSuccess'),
      meta:{show:true}
    },
    {
      // 详情页
      path:"/detail/:skuId",
      component:() => import('@/page/Detail'),
      meta:{show:true}
    },
    {
      // 首页
      path:"/home",
      component:() => import('@/page/Home'), // 直接简写
      meta:{show:true}
    },
    {
      // 搜索页
      // 该写法代表params参数可以传递|当然也可以不传递---？问号这种（正则：两次代表出现次数0|1）
      path:"/search/:keyword?",
      component:() => import('@/page/Search'),
      meta:{show:true},
      name:'search',
      // 布尔值传递
      // props:true,
      // 对象写法---额外给路由组件传递一些props
      // props:{a:1, b:2}
      // 函数写法---有params，query，通过props传递给路由组件
      props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
    },
    {
      // 登录页
      path:"/login",
      component:() => import('@/page/Login'),
      meta:{show:false}
    },
    {
      // 注册页
      path:"/register",
      component:() => import('@/page/Register'),
      meta:{show:false}
    },
    // 重定向
    {
      path:'',
      redirect:"/home"
    }
  ]