require('shelljs/global')
let webpack = require('webpack')
let conf = require('./webpack.prod')
let ora = require('ora')
let chalk = require('chalk')

let spinner = ora('building for production...')
spinner.start()

rm('-rf', 'dist')
mkdir('-p', 'dist/bower_components')
cp('-r', 'bower_components/', '.htaccess', 'dist/')

webpack(conf, function (err, stats) {
  spinner.stop()

  if (err) {
    throw err
  }

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
