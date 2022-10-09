<template>
  <div>
     <a :title="title">
       <!-- 下面这种写法，不能 : -->
       <!-- v-on就是@，但不能写@这里 -->
        <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
     </a>
  </div>
</template>

<script>
export default {
  name: "",
  props:['title'],
  mounted(){
    // $attr属于组件的一个组件，可以获取到父组件传递过来的props数据
    // this.$attrs:可以获取到父亲传递的数据【props】
    // this.$attrs是可以获取父亲传递的props数据，如果子组件通过props:[],接收，在this.$attrs属性是获取不到的
    console.log(this.$attrs);
    // 他也是组件实例自身的一个属性，获取到父组件给子组件传递的事件
    console.log(this.$listeners);
  }
};
</script>

<style scoped></style>
