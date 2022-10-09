<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑，商品选择横向排列的小标签-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的展示 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removetrademark">×</i></li>
            <!-- 平台的售卖属性 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeattr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <!-- 价格结构 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active: isone}" @click="changeOrder(1)">
                  <a>综合 <span v-show="isone" class="iconfont" :class="{'icon-top':isAsc, 'icon-down':isDesc}">{{ isDesc ? topOrdown.down : undefined || isAsc? topOrdown.top : undefined }}</span></a>
                </li>
                <li :class="{active: istwo}" @click="changeOrder(2)">
                  <a>价格 <span v-show="istwo" class="iconfont" :class="{'icon-top':isAsc, 'icon-down':isDesc}">{{ isDesc ? topOrdown.down : undefined || isAsc? topOrdown.top : undefined }}</span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 带着商品id跳转 -->
                    <router-link :to="`/detail/${good.id}`" :title="good.title"><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`" :title="good.title">{{ good.title }}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo" /> -->
          <PaginationMy :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPage = "getPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
// import Pagination from '@/components/Pagination/index.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
        categoryName: '', // 分类名
        keyword: '', // 搜索关键字
        order: '1:desc', // 排序 初始状态是综合降序
        pageNo: 1, // 分页器
        pageSize: 10, // 每一页数据展示数量
        props: [], // 平台售卖属性（4g，8g？32g？）
        trademark: '' // 品牌
      },
      topOrdown: {
        top: '⬆',
        down: '⬇'
      }
    }
  },
  // 在发请求之前带给服务器参数{searchParams参数变化发给服务器}
  beforeMount() {
    // 复杂写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.keyword = this.$route.params.keyword
    // object.assign:es6 新增---合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    // 在组件挂载完毕之前发送一次
    this.getData()
  },
  computed: {
    // mapGetters里面的写法：传递的数组，因为getters没有划分模块[home,list]
    ...mapGetters(['goodsList', 'trademarkList', 'attrsList']),
    // 排序的计算属性
    isone() {
      return this.searchParams.order.indexOf('1') != -1
    },
    istwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    // 向仓库拿到总共的数据条数
    ...mapState({total: state => state.search.searchList.total})
  },
  // 监听组件实例身上的属性的属性值变化
  watch: {
    // 监听路由的信息是否发生变化,如果发生变化,再次发送请求
    $route() {
      // 再次发请求之前整理带给服务器的参数
      // 每一次请求完毕应该把三级分类的id置空,让他接受下一次的id
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData()
    },
    // 另一种逻辑：应该监听路由的两个参数改变从而更加精细控制路由 --- 暂不改变
    // "$route.query"
    // "$route.params"
  },
  methods: {
    // 向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 删除点击三级分类列表带来的面包屑
    removeCategoryName() {
      // 删除分类的名字 把带给服务器的参数置空了，还要发请求
      // 带给服务器参数可有可无，可以不提交为空的参数以节省带宽
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也需要修改：进行路由跳转
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除搜索带来的面包屑
    removeKeyword() {
      // 给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined
      // 再次发请求
      this.getData()
      // 通纸兄弟组件header清除关键字
      this.$bus.$emit('clear')
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 点击增加品牌属性面包屑 --修改过 路由
    trademarkInfo(trademark) {
      // 整理品牌字段参数---ID：品牌名称
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.searchParams.keyword = undefined
      // 通纸兄弟组件header清除关键字并更改路由参数
      this.$bus.$emit('clear')
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.searchParams.trademark.split(":")[1] })
      }
      // 再次发请求
      this.getData()
    },
    // 删除品牌的面包屑 --修改过 路由
    removetrademark() {
      this.searchParams.trademark = undefined
      // 通纸兄弟组件header清除关键字并更改路由参数
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.searchParams.trademark})
      }
      this.getData()
    },
    // 收集平台属性地方面包屑cb
    attrInfo(attr, attrValue) {
      // 整理参数格式
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}:`
      // 数组去重
      if(this.searchParams.props.indexOf(props)==-1) this.searchParams.props.push(props)
      // 再次发请求
      this.getData()
    },
    // 删除售卖属性面包屑
    removeattr(index) {
      // 再次整理参数
      this.searchParams.props.splice(index, 1)
      // 再次发请求
      this.getData()
    },
    // 切换升降序
    changeOrder(flag) {
      // flag：标记---代表用户点击的是综合（1），还是价格（2）【用户点击的时候传递进来】
      // let originOrider = this.searchParams.order // 起始的order
      // 最开始的状态----该切换逻辑每次观看不懂的话可以脑内模拟一遍
      let originFlag = this.searchParams.order.split(":")[0]
      let originSort = this.searchParams.order.split(":")[1]
      // 准备一个新的属性值
      let newOrder = ''
      // 确定点击的是综合还是价格
      if(flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc"?"asc":"desc"}`
      }else {
        // 点击的是价格---传进来的flag一定是2
        newOrder = `${flag}:${"desc"}`
      }
      this.searchParams.order = newOrder
      this.getData()
    },
    // 自定义事件的cb---获取当前的第几页
    getPage(page) {
      this.searchParams.pageNo = page
      this.getData()
    }
  },
  components: {
    SearchSelector,
    // Pagination
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>