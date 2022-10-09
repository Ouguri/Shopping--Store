<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="geiQian(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import myMixin from '@/page/Communication/ChildrenParentTest/myMixin/myMixin'
export default {
  name: 'Son',
  mixins:[myMixin],
  data () {
    return {
      money: 30000
    }
  },

  // methods: {
  //   tinghua(){
  //       console.log('我是小明，我听爸爸的话');
  //   },
  // }
}
</script>
