export default {
  // 对外暴露的对象，可以放置组件重复的js逻辑
  methods: {
    geiQian(money){
       this.money-=money;
      // 可以通过$parent属性获取到某一个组件父组件，可以操作父组件的数据与方法
       this.$parent.money+=money;
    }
  }
}