const webpack = require('webpack');
const merge = require('webpack-merge');
const _ = require('lodash');
const config = require('./webpack.base.config');

function getDevEntry(entry) {
  if (_.isObject(entry)) {
    const devEntry = {};
    Object.keys(entry).forEach((key) => {
      devEntry[key] = ['react-hot-loader/patch', 'eventsource-polyfill', 'webpack-hot-middleware/client'].concat([entry[key]]);
    });
    return devEntry;
  }
  if (_.isArray(entry) || _.isString(entry)) {
    return ['react-hot-loader/patch', 'eventsource-polyfill', 'webpack-hot-middleware/client'].concat(_.isArray(entry) ? entry : [entry]);
  }
  return entry;
}

module.exports = merge(config, {
  mode: 'development',
  entry: getDevEntry(config.entry),
  output: {
    filename: 'static/[name].js',
    chunkFilename: 'static/[name].chunk.js',
  },
  devServer: {
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'cheap-eval-source-map',
  performance: {
    hints: false,
  },
});
