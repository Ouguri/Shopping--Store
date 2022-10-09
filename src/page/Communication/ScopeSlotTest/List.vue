<template>
  <ul>
    <li v-for="(todo,index) in todos" :key="index">
      <!-- 作用域插槽 -->
       <!-- 坑：熊孩子挖到坑，父亲填坑 -->
       <!-- 数据来源于父亲：但是子组件决定不了结构与外网-->
       <!-- 
        这里的:todo="todo"，不是props传值，而是作用域插槽的语法规则
        这里子组件把todo数据传回父组件
        -->
       <slot :todo="todo"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    todos: Array
  }
}
</script>