<template>
  <!-- 商品分类导航 -->
<div class="type-nav">
    <div class="container">
        <div @mouseleave="leaveIndex" @mouseenter="enterShow">
            <h2 class="all">全部商品分类</h2>
            <!-- 过渡动画 -->
            <transition name="sort">
                <div class="sort" v-show="show">
                <!-- 事件委派+编程式导航实现路由跳转 -->
                <div class="all-sort-list2" @click="goSearch">
                    <div class="item" v-for="(c1, index) in categoryList.slice(0,16)" :key="c1.categoryId" :class="{cur: currentIndex == index}">
                        <h3 @mouseenter="changeIndex(index)">
                            <!-- 自定义属性 -->
                            <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                        </h3>
                        <!-- 二、三级分类 -->
                        <div class="item-list clearfix" :style="{display: currentIndex == index?'block':'none'}">
                            <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </transition>
        </div>
        <nav class="nav">
            <a href="###"><li>服装城</li></a>
            <a href="###"><li>美妆馆</li></a>
            <a href="###"><li>全球购</li></a>
            <a href="###"><li>闪购</li></a>
            <a href="###"><li>团购</li></a>
            <a href="###"><li>有趣</li></a>
            <a href="###"><li>秒杀</li></a>
        </nav>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
// 引入方式：把lodash的全部功能函数引入
// import _ from 'lodash'
// 按需引入 因为是默认暴露所以不需要{throttle}
import throttle from "lodash/throttle"

export default {
  name:'TypeNav',
  // 组件挂载完毕：可以向服务器发送请求
  data() {
      return {
          // 存储用户鼠标移上哪一个一级分类
          currentIndex: -1,
          show:true
      }
  },
  methods: {
      // 鼠标进入修改响应式数据currentIndex属性
      // throttle尽量不要用箭头函数，否则可能出现上下文this  
      changeIndex: throttle(function(index) {
          // 当用户操作很快，只有部分h3触发该事件，原因是用户行为过快，当业务过大，有可能出现卡顿现象
          this.currentIndex = index
      }, 50),
      leaveIndex() {
          this.currentIndex = -1
          if(this.$route.path != '/home'){
              this.show = false
          }
      },
      // 进行路由跳转的方法 最好的解决方案是：编程式导航+事件委派
      // 事件委派问题：不知道点击的一定是a标签 ---- 把子节点的a标签加上自定义属性，其余没有
      // 确定了点击的是a标签，还要判断是1、2、3级的a标签 ---- 
      goSearch(event) {
          // 获取到当前触发事件的节点a
          // 节点的dataset属性，可以获取到当前出发节点的自定义属性
          let element = event.target
          let { categoryname, category1id, category2id, category3id } = element.dataset
          if(categoryname) {
              // 整理路由跳转的参数
              let location = {name:'search'}
              let query = {categoryName:categoryname}
              // 哪个分类的a标签
              if(category1id) {
                  query.category1Id = category1id
              }else if(category2id) {
                  query.category2Id = category2id
              }else{
                  query.category3Id = category3id
              }
              // 整理完参数  如果路由跳转的时候有params，也要传过去
              if(this.$route.params) {
                  location.params = this.$route.params
                  location.query = query
                  this.$router.push(location)
              }
          }
      },
      enterShow() {
        if(this.$route.path != '/home'){
            this.show = true
        }
      }
  },
  mounted() {
    // 当组件挂载完毕，让show的属性变成false
    if(this.$route.path != '/home'){
        this.show = false
    }
  },
  computed:{
      ...mapState({
          // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立刻执行一次
          // 注入一个参数state，其实为大仓库store中的数据
          categoryList: state => state.home.categoryList
      })
  }
}
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;
        // border: 1px solid black;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                display: flex;
                margin-left: 5px;
                li {
                    width: 100px;
                    text-align: center;
                    list-style: none;
                    position: relative;
                    transition: .2s;
                    margin-left: 2px;
                }
                li::after {
                    content: '|';
                    color: rgb(172, 172, 172);
                    position: absolute;
                    right: -5px;
                }
                a {
                    height: 45px;
                    // margin: 0 22px;
                    line-height: 44px;
                    font-size: 16px;
                    color: #333;
                    cursor: pointer;
                }
                a:hover {
                    text-decoration: none;
                    color: #fff;
                }
                li:hover {
                    background: linear-gradient(#e1251b 40%, #fff);
                    // border-bottom: 1px solid #e1251b;
                    transform: translateY(-2px);
                }
                li:hover::after {
                    content: '';
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 29px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;
                            cursor: pointer;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            transition: .5s all;
                            z-index: 9999 !important;

                            .subitem {
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        cursor: pointer;
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        cursor: pointer;
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            cursor: pointer;
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .cur{
                        background-color: skyblue;
                        transition: .2s;
                    }
                }
            }
            // 过渡动画
            // // 开始（进入状态）
            // .sort-enter{
            //     height: 0px;
            // }
            // // 结束（进入）
            // .sort-enter-to{
            //     height: 461px;
            // }
            // // 动画时间
            // .sort-enter-active{
            //     transition: all .5s ease-in-out;
            //     overflow: hidden;
            // }
        }
    }
</style>