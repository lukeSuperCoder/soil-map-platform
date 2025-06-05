const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,  // 关闭eslint检查
  devServer: {
    client: {
      overlay: false // 关闭错误遮罩层
    }
  }
})
