const merge = require('webpack-merge');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const path = require('path');

const config = require('./webpack.base.config');

module.exports = merge(config, {
  mode: 'production',

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'static/[name].[chunkhash].js',
    chunkFilename: 'static/[name].[chunkhash].chunk.js',
  },

  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: path.resolve(__dirname, '../dist/static'),
    //     ignore: ['.*', 'theme/**', 'iconfont/**'],
    //   },
    // ]),
  ], // .concat([new BundleAnalyzerPlugin()]),
});
