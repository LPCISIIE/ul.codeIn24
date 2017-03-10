let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.css', '.html'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      src: resolve('src'),
      assets: resolve('src/assets'),
      app: resolve('src/app')
    }
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        options: {
          configFile: resolve('.eslintrc'),
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        include: resolve('src')
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name]-[hash:7].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'head'
    })
  ]
}
