const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// https://github.com/kimamula/ts-transformer-keys
const keysTransformer = require('ts-transformer-keys/transformer').default;

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    page: path.join(process.cwd(), './src/index.tsx'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      base: path.resolve(process.cwd(), 'base'),
      components: path.resolve(process.cwd(), 'src', 'components'),
      containers: path.resolve(process.cwd(), 'src', 'containers'),
      utils: path.resolve(process.cwd(), 'src', 'utils'),
      config: path.resolve(process.cwd(), 'config'),
      moment$: 'moment/moment.js',
    },
    modules: ['node_modules', 'app'],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  target: 'web', // Make web variables accessible to webpack, e.g. window
  plugins: [
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'static/[name].css' : 'static/[name].[hash].css',
      chunkFilename: devMode ? 'static/[id].css' : 'static/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'static/index.html',
      template: path.resolve(process.cwd(), 'public', 'index.html'),
      chunks: ['page'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              getCustomTransformers: program => ({
                before: [
                  keysTransformer(program),
                ],
              }),
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          }],
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(xlsx|xls|csv|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              name: 'static/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
