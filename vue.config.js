/* eslint-disable @typescript-eslint/no-var-requires */
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  devServer: {
    host: '0.0.0.0',
  },

  lintOnSave: false,

  css: {
    extract: false
  },
  productionSourceMap: false,
  publicPath: './',

  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$/,
        filename: '[file].gz[query]',
        minRatio: 1,
        threshold: 1024 * 10,
        deleteOriginalAssets: false
      })
    ]
  }

}