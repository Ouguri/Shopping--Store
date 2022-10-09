<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      // 可以放在 mounted 中，但是为了共用组件，故如此
      // 立即监听
      immediate: true,
      handler() {
        // 只能监听到数据有了，还是需要nextTick
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true
            }
          })
        })
      }
    }
  }
}
</script>

<style>
</style>