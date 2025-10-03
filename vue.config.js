const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/to-do-shop/'  // ✅ 把 publicPath 加進來
})