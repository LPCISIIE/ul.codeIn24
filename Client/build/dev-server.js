let webpack = require('webpack')
let webpackConfig = require('./webpack.dev')
let express = require('express')
let config = require('./config')
let opn = require('opn')

let app = express()
let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

app.use(express.static('./'))

app.listen(config.port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  opn('http://localhost:' + config.port)
})
