<template>
  <div>
    <h2>BABA有存款: {{ money }}</h2>
    <button @click="JieQianFromXM(100)">找小明借钱100</button><br />
    <button @click="JieQianFromXH(150)">找小红借钱150</button><br />
    <button @click="JieQianAll(200)">找所有孩子借钱200</button><br />
    <button @click="SendInfo">我是baba</button>
    <br />
    <!-- ref：获取节点（组件标签） -->
    <!-- 小明 -->
    <Son ref="xm" />
    <br />
    <!-- 小红 -->
    <Daughter ref="xh"/>
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  methods: {
    //找儿子借钱
    JieQianFromXM(money) {
      //父组件的数据累加100
      this.money += money;
      // ref可以获取真是的DOM节点，也可以获取子组件标签（操作子组件的数据和方法）
      this.$refs.xm.money -= money;
    },
    JieQianFromXH(money) {
      //父组件的数据累加150
      this.money += money;
      this.$refs.xh.money -= money;
    },
    JieQianAll(money){
      // 组件实例自身拥有一个属性$children，可以获取到当前组件当中，全部子组件，放在一个数组里
      this.money += 2*money;
      this.$children.forEach(item=>item.money-=money);
      //不建议用枚举获取子组件：因为没办法确定这个到底是哪个子组件
      // this.$children[0].money -=money;
      // this.$children[0].money -=money;

    },
    SendInfo(){
      //在父组件中获取到子组件（数据+方法）
      this.$refs.xm.tinghua();
    }
  },

  components: {
    Son,
    Daughter,
  },
};
</script>

<style></style>
