// 封装自定义插件 
// 正常自定义指令是主要用来操作dom的
// vue的插件一定暴露一个对象
let myPlugins = {}
myPlugins.install = function(Vue, options) {
  // Vue.prototype.$bus：任何组件都可以使用
  // Vue.directive() 全局指令
  // Vue.component
  // Vue.filter 过滤器
  // 全局指令
  Vue.directive(options.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase()
    console.log(element);
    console.log(params);
  })
}

// 暴露了这个自定义插件,在main中通过name将其命名为upper,此插件功能就是将元素的内容变成大写
    // <!-- <div v-upper="msg"></div>
export default myPlugins
// 如懒加载等的插件都是像这种自定义插件，其element拿到了当前元素，params传回了一个对象，里面装有自定义插件和该元素的内容
// 嗯。我暂时只能这么理解
// params里面的 modifiers 属性意思为修饰符