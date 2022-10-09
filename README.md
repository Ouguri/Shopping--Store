 mock数据：用mock.js插件
    使用步骤：
      1、在src中创建mock文件夹
      2、准备json数据（在mock文件夹创建相应的JSON文件准备）
      3、把mock数据需要的图片放到public文件夹中【该文件夹在打包的时候会把public的文件资源打包到dist文件夹
      4、创建mockServe.js，开始mock（虚拟的数据），通过mockjs模块实现
      5、mockServe.js文件在入口文件引入（至少需要执行一次，才能模拟数据）


32: elementUI使用 + 按需引入 
    elementUI按需引入,项目文件发生变化,项目需要重启

33: 获取我的订单（个人中心）列表 /api/order/auth/{page}/{limit}

34：路由
  未登录---不能访问支付页、不能支付等
    路由独享守卫：
      登录---

图片懒加载
https://www.npmjs.com/package/vue-lazyload

表单验证
vee-validata插件

路由懒加载
component: () => import('组件链接')


登陆账号
    13700000000
    111111
