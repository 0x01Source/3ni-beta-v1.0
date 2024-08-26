const { defineConfig } = require("@vue/cli-service");
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue3ni/' // Replace with your repository name
  : '/',
  devServer: {
    port: 8090,
  },
  transpileDependencies: true,
  lintOnSave: false,
};
