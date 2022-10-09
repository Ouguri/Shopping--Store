<template>
        <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>Shopping! 欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <!-- 声明式导航：务必要有to属性 -->
                            <router-link to="/login">登录</router-link>
                            <router-link class="register" to="/register">免费注册</router-link>
                        </p>
                        <!-- 登陆了 -->
                        <p v-else>
                            <a>{{ userName }}</a>
                            <a class="register" @click="logout">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">个人中心</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">Shopping!铁粉</a>
                        <a href="###">企业采购</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" title="尚品汇" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            keyword:''
        }
    },
    mounted() {
        // 通过全局事件总线清除关键字
        this.$bus.$on('clear', () => {
            this.keyword = ""
        })
    },
    methods: {
        // 搜索按钮的cb，需要向search路由进行跳转
        goSearch(){
            // this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase())
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 对象写法
            // 页面搜索按钮多次点击提交会报错，解决方法是写入promise的两个返回值成功resolove和失败reject---治标不治本
            if(this.$route.query){
                let loction = {
                    name: 'search',
                    params: { keyword: this.keyword || undefined }
                }
                loction.query = this.$route.query
                this.$router.push(loction)
            }
        },
        // 退出登录 logout
        async logout() {
            // 退出登录需要: 通知发请求通知服务器退出登录（清除token）
            // 清除项目当中的数据【userInfo，token】
            try {
                await this.$store.dispatch('userLogout')
                // 如果退出成功---回到首页
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }
        }
    },
    computed: {
        userName() {
            // 用户名信息
            return this.$store.state.user.userInfo.name
        }
    }
}
</script>

<style lang="less" scoped>
      .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            display: flex;
            justify-content: space-between;

            .logoArea {

                .logo {
                    img {
                        width: 270px;
                        margin: 0px 5px 0px 0;
                    }
                }
            }

            .searchArea {
                margin-top: 65px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>