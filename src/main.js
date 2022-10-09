import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import Llazy from './assets/images/lazy.gif'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav/index.vue'
import Carousel from '@/components/Carousel/index.vue'
// import Pagination from '@/components/Pagination/index.vue'
import PaginationMy from '@/components/PaginationMy/index.vue'
import { Button, MessageBox } from 'element-ui';

// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
// Vue.component(Pagination.name, Pagination)
Vue.component(PaginationMy.name, PaginationMy)
// 注册全局组件的elementUI
Vue.component(Button.name, Button)
// 挂载在vue的原型对象上
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$msgbox = MessageBox
// 使用懒加载 是指调用了插件对象中的install方法
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: Llazy
})

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mock
import '@/mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接收api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api' 

// 引入自定义插件
// import myPlugins from './plugins/myPlugins'
// Vue.use(myPlugins, {
//   name: 'upper'
// })

// 引入表单校验插件
import "@/plugins/validate.js"

new Vue({
  render: h => h(App),
  // 全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus = this
    // 全局都可以找这个对象使用
    Vue.prototype.$API = API
  },
  // kv一致省略v
  router,
  // 注册仓库：组件实例的身上会多一个$store属性
  store
}).$mount('#app')
