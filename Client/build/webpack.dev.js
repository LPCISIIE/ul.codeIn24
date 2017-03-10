let webpack = require('webpack')
let merge = require('webpack-merge')
let webpackConfig = require('./webpack.base')
let config = require('./config')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

webpackConfig.entry.app.unshift('./build/dev-client.js')

module.exports = merge(webpackConfig, {
  output: {
    publicPath: '/'
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['Listening at http://localhost:' + config.port]
      }
    })
  ]
})
