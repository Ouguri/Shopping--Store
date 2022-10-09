module.exports = {
  // 关闭eslint
  lintOnSave: false,
  // 清除打包的 map 文件
  productionSourceMap: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': ''},
      },
    },
  },
}