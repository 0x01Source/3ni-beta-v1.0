const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/3ni-Beta/' : '/',
  devServer: {
    port: 8090,
  },
  transpileDependencies: true,
  lintOnSave: false,
});
