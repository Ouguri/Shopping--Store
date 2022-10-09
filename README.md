
babel.config.js:配置文件（babel相关）

package.json:认为是项目的身份证，记录了项目叫什么，项目依赖和运行

package-lock.json:缓存性文件

浏览器自动打开vue：package.json-"script"-serve-加上“ --open”

eslint校验功能关闭
---在根目录下创建一个vue.config.js文件
向外暴露module.exports = {lintOnSave:false}


项目路由的分析
vue-router
前端路由：kv键值对
key：URL
value：相应的路由组件
注意：是上中下解结构
路由组件：
Home首页路由，Search路由，login登录路由，Refister注册路由
非路由组件
Header【在首页、搜索页】
Footer【在首页、搜索页】登录|注册页没有
page文件夹: 放置路由组件
router文件夹：项目当中配置的路由一般放置在router文件夹中

关于路由跳转：
1、声明式导航：router-link(要有to属性)
2、编程式导航：利用组件实例的$router.push|replace（可以书写一些业务）
关于路由传参：
1、params参数：属于路径当中的一部分，需要注意，在配置路由的时候需要占位
设置params参数可传可不传：path:"/search/:keyword?",加上最后这个"?"即可
倘若传入了空字符串L: this.$router.push({name:'search', params: '', query:{k:this.keyword.toUpperCase()}})
--可使用undefinded解决this.$router.push({name:'search', params: ''||undefinded})

2、query参数：不属于路径当中的一部分，类似于ajax中的queryString /home?k=v&kv=,不需要占位

显示或者隐藏组件：v-if|v-show
Footer组件：在home，search显示，在登录、注册时隐藏
--1、麻烦写法：Footer v-show="$route.path=='/home'||$route.path=='/search'"
--2、正确：v-show="$route.meta.show"__先在定义路由的js文件为路由们添加meta属性


Home组件模块拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务

三级联动组件完成
---由于三级联动在Home、Search、Detail，把三级联动注册为全局组件。
好处：只需要注册一次，就可以在项目任意地方使用

6：axios二次封装
  XMLHttpRequest、fetch、JQ、axios
  6.1：为什么要进行二次封装axios
  请求拦截器、响应拦截器：
    请求拦截器：可以在发请求之前处理一些业务
    响应拦截器：当服务器数据返回以后，可以处理一些事情

  6.2：在项目中经常有API文件夹【axios】
  接口当中：路径都带有/api
  baseURL:"/api"

7：接口统一管理

  项目很小：完全可以在组件的生命周期中发请求（created mounted）

  项目大：axios.get('xxx')

7.1：跨域问题
  协议、域名、端口号不同会出现跨域问题
  http://localhost:8080/#/home ----前端项目的本地服务器
  http://39.98.123.211 ----要获取的后台服务器

  解决方案：JSONP、CROS、代理服务器

8：nprogress进度条的使用(插件)

  import nprogress from "nprogress"
  引入进度条的样式 要改颜色就去他的css文件里面改，在node_modules里面
  import "nprogress/nprogress.css"

  start: 进度条开始 done：进度条结束

9：vuex状态管理库
  9.1：vuex时官方提供的一个插件---状态管理库，集中式管理项目中组件公用的数据
  切记：并非全部项目都需要vuex，项目很大，组件很多，数据很多，数据维护很费劲时使用
  state
  mutations
  actions
  getters
  modules

  9.2：vuex基本使用

  9.3：vuex实现模块化开发
  如果项目过大，组件过多，接口很多，数据很多，可以让vuex实现模块化开发
  模拟state存储数据
  {
    count:1
  }

10：完成TypeNav三级联动展示数据业务

11: 完成1级分类（分类列表）添加背景颜色
  a. 采用css---hover
  b. 通过js完成

  节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量出发
  防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

12：三级联动组件的路由跳转与传递参数
三级联动用户可以点击：一级分类，二级分类，三级分类
Home跳转到search会把一级选中的产品名字id在路由跳转时进行传递

三级联动使用router-link可以实现跳转，但出现了卡顿的现象
因为rl可以是一个组件，当服务器数据返回，要循环很多rl组件

13：开发search模块中的TypeNav商品分类菜单（过渡动画效果）

  if(this.$route.path != '/home'){
            this.show = true
        }
        
  过渡动画：前提条件|元素要有v-if/v-show指令

三级列表的请求优化：在app根组件中发请求【根组件mounted/created】，这会只执行一次

14：合并参数----params和query参数

15：开发ListContainer和Floor组件
但是服务器返回的数据只有菜单分类的数据

  mock数据（模拟）：如果想mock数据，需要用到mock.js插件
    使用步骤：
      1、在src中创建mock文件夹
      2、准备json数据（在mock文件夹创建相应的JSON文件准备） 一定要格式化，别留空格
      3、把mock数据需要的图片放到public文件夹中【该文件夹在打包的时候会把public的文件资源原封不动的打包的dist文件夹中】
      4、创建mockServe.js，开始mock（虚拟的数据），通过mockjs模块实现
      5、mockServe.js文件在入口文件引入（至少需要执行一次，才能模拟数据）

ListContainer组件轮播图需要安装Swiper插件
安装swiper的5版本：npm i swiper@5 -S
  轮播图的最完美解决方案：
    watch数据监听：监听已有数据的变化 + nextTick

    $nextTick：可以保证页面中的结构是一定有的，经常和很多插件一起使用【都需要DOM】

16：开发floor组件
  在home的index中发请求---通过父传子传到floor
  props:父子通信
  自定义事件：@on-@emit 可以子传父
  全局事件总线：$bus 全能
  pubsub：vue不用-全能
  插槽
  vuex

16：拆分首页轮播图为一个公用的组件

17：search模块的开发
  a、静态页面+拆分静态组件
  b、发请求
  c、vuex、
  d、组件获取仓库数据，动态展示数据

18：动态开发面包屑中的分类名
  编程式导航路由【自己跳自己】
  动态开发面包屑的关键字
    当面包屑中的关键字清除以后，需要让兄弟组件header的关键字删除
    涉及到组件通信：$bus---全局事件总线

19：排序操作
  排序方式：
  1: 综合,2: 价格 asc: 升序,desc: 降序  
  示例: "1:desc"

  考虑的问题：
    谁应该有class----通过order属性值去判断
    谁应该有箭头----谁有类名谁有箭头
    箭头用什么制作

  分页器的动态展示？分为上中下部分
  v-for可以遍历数字

  20：分页器：
    为什么要分页------数据太多，无法一次加载，否则会造成卡顿和崩溃
    elementUI有相应组件，很简单，前台项目暂时不用
    需要知道分页器连续页码个数---一般是5|7个【奇数】因为对称
    1、pageNo:当前第几个
       pageSize:每页展示多少数据
       total:代表整个分页一共展示多少条数据 在vuex中
       continues:代表分页连续页码个数
    步骤：
      1、静态页面完成+注册全局组件使用
      2、根据上面参数，设立模拟数据测试  子传父---props  
      3、通过计算属性计算连续展示5|7页的页码
        此时情况：
          正常情况，即1...34567...10
          异常情况1：页数至1 2，但...仍在/页数至9 10，但...还在--- “6 7 8 9 10...10”
          异常情况2：由于计算页码的算法考虑为---pageNo +- (continues-1)/2---2，当pageNo为9 10 1 2，会出现得数大于负数和大于pageLast（最后一页）的情况
          异常情况3：连续5页，但是数据少于5页
      4、将点击页数的数据传给服务器并发送请求更新页面
        a、子传父---自定义事件emit
        b、接收数据，整理参数给searchParams并通过axios发送给服务器
  21：开发详情页
    静态页+发请求+vuex+组件获取仓库数据，动态展示数据
    当点击商品的图片,跳转到详情页面，在路由跳转的时候需要带上产品的ID给详情页面
    滚动行为
    2、API--->请求接口
    3、vuex---获取产品详情信息
        vuex还需要新增一个模块detail
        发送请求
    4、数据解释---售卖属性
      [
        {
          attr:"color",
          attrValue:['粉色','天蓝色']
        },
        {
          attr:"vertion",
          attrValue:['电信','移动','联通']
        }
      ]

  22: 加入购物车按钮
    1.在路由添砖之前发请求,成功路由跳转和参数传递
    2.浏览器存储功能,html5新增---本地存储(持久化---5m)和会话存储(非持久,关闭就没了---会话结束数据小时)---不能存对象

23、UUID临时游客身份---加入购物车后服务器不知道你是谁，无法返回你加入购物车的商品，需要一个东西认证你自己
24、动态展示购物车
  数据格式有点不完美，

25、删除购物车产品
26、删除选中的商品
  注意：没有一次删除很多产品的接口，但是有通过ID可以删除产品的接口【一次删除一个】
  那就多调用几次
  删除购物车商品的仓库actions返回可以是:
  Promise.all([p1, p2, p3])
  p1|p2|p3都是promise对象，如果有一个Promise失败，则都失败，如果都成功，则返回成功
27、全选--跟删除选中差不多

29、登陆注册和git是必须要会的技能
  3.1登陆注册的静态组件
  3.2assets防止全部组件公用的静态资源
  注册业务|登陆业务表单验证先不处理
  注册获取验证码接口：/api/user/passport/sendCode/{phone}

  当用户注册完成，用户登录【用户名+密码向服务器发请求】(组件派发action: userLogin)
  登陆成功获取到token，但是不是持久的，因为在仓库中
  因此在首页中（mounted）派发action:getUserInfo获取用户信息，动态展示hearder组件内容
  但此刻---刷新----token没了（vuex非持久化）

  29.2: 持久化存储token

30：导航守卫
  导航：表示路由正在发生改变。进行路由跳转
  守卫：护卫，看门的---当路由发生跳转判断其是否可以跳转
    全局守卫（前置，后置）：什么都要判断排查，只要发生路由变化就要判断
    路由独享守卫：相应的对应的路由守卫，如去首页前的守卫
    组件内守卫：进入了相应的路由后还要守卫判断
  比如：用户已经登陆，不应该回到登录页

    获取交易页面用户信息---要先登录

31: 
当点击提交订单，还需要向服务器发起一次请求
此为本请求带的data的数据
{
    "consignee": "admin",
    "consigneeTel": "15011111111",
    "deliveryAddress": "北京市昌平区2",
    "paymentWay": "ONLINE",
    "orderComment": "xxx",
    "orderDetailList": [
        {
            "id": null,
            "orderId": null,
            "skuId": 6,
            "skuName": " Apple iPhone 11 (A2223) 128GB 红色 移动联通电信22",
            "imgUrl": "http://182.92.128.115:8080//rBFUDF6V0JmAG9XGAAGL4LZv5fQ163.png",
            "orderPrice": 4343,
            "skuNum": 2,
            "hasStock": null
        },
        {
            "id": null,
            "orderId": null,
            "skuId": 4,
            "skuName": "Apple iPhone 11 (A2223) 128GB 红色",
            "imgUrl": "http://182.92.128.115:80800/rBFUDF6VzaeANzIOAAL1X4gVWEE035.png",
            "orderPrice": 5999,
            "skuNum": 1,
            "hasStock": null
        }
    ]

    别在生命周期函数中async
32: elementUI使用 + 按需引入 
    elementUI按需引入,项目文件发生变化,项目需要重启

33: 获取我的订单（个人中心）列表 /api/order/auth/{page}/{limit}

34：路由优化
  未登录---不能访问支付页、不能支付等
    路由独享守卫：
      登录---

是否封装过组件---分页器、日历

图片懒加载
https://www.npmjs.com/package/vue-lazyload

表单验证
vee-validata插件

路由懒加载
component: () => import('组件链接')


统一登陆账号
    13700000000
    111111