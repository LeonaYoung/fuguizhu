process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../build/webpack.prod.config');

const spinner = ora('building for production...');
spinner.start();

rm(path.resolve(__dirname, '../../dist'), (err) => {
  if (err) {
    process.exit(1);
    throw err;
  }
  webpack(config, (webpackErr, stats) => {
    spinner.stop();
    if (webpackErr) {
      process.exit(1);
      throw webpackErr;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log('*******');
      console.log(chalk.red(info.errors));
      console.log(chalk.red('  Build failed with errors.\n'));
      console.log('*******');
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      ` Tip: built files are meant to be served over an HTTP server.
      Opening index.html over file:// won't work.\n`,
    ));
  });
});
