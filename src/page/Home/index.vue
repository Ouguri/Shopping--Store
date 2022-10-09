<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，不需要引入 -->
    <TypeNav/>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/page/Home/ListContainer/index.vue'
import Recommend from '@/page/Home/Recommend/index.vue'
import Rank from '@/page/Home/Rank/index.vue'
import Like from '@/page/Home/Like/'
import Floor from '@/page/Home/Floor/'
import Brand from '@/page/Home/Brand/'
import { mapState } from 'vuex'

export default {
  name: '',
    mounted() {
      this.$store.dispatch('getFloorList')
  },
  computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
}
</script>

<style>

</style>