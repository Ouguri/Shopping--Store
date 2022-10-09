<template>
  <div>
    <!-- <div v-upper="msg"></div> -->
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'

export default {
  name:'MyApp',
  data() {
    return {
      msg:'abc'
    }
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储在仓库当中
    // 派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
