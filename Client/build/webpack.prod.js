let webpack = require('webpack')
let merge = require('webpack-merge')
let webpackConfig = require('./webpack.base')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

webpackConfig.module.rules[0] = {
  test: /\.s?css$/,
  use: ExtractTextPlugin.extract({
    use: ['css-loader', 'sass-loader'],
    fallback: 'style-loader'
  })
}

module.exports = merge(webpackConfig, {
  output: {
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  plugins: [
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true,
      comments: false
    }),
    new HtmlWebpackPlugin({
      filename: 'electron.html',
      template: 'electron.html',
      inject: 'head'
    })
  ]
})
