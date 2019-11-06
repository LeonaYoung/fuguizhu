process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// eslint-disable-next-line
const express = require('express');
const webpack = require('webpack');
const path = require('path');

// eslint-disable-next-line
const proxy = require('http-proxy-middleware');
// eslint-disable-next-line
const webpackHotMiddleware = require('webpack-hot-middleware');
// eslint-disable-next-line
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../build/webpack.dev.config');
const proxyTable = require('../../config/proxy.conf');

const app = express();

Object.keys(proxyTable).forEach((uri) => {
  app.use(uri, proxy(uri, { target: proxyTable[uri], changeOrigin: true }));
});

const compiler = webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  logLevel: 'warn',
  publicPath: '/',
  silent: true,
  stats: 'errors-only',
});

const middleware = webpackDevMiddleware(compiler, devServerOptions);
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

const staticPath = '/static';
app.use(staticPath, express.static('./static'));

const fs = middleware.fileSystem;

app.get('*', (req, res) => {
  fs.readFile(path.join(compiler.outputPath, 'static/index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host

app.listen(8080, host, () => {
  // eslint-disable-next-line no-console
  console.log('Starting server on http://localhost:8080');
});
