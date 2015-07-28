'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var serverRoot = process.cwd();
var resolve = require('path').resolve;

var koa = require('koa');
var session = require('koa-session');

var view = require('./lib/view');
var asset = require('./lib/asset');
var router = require('./lib/router');

var Remote = function Remote(middleware) {
  _classCallCheck(this, Remote);

  var app = koa();
  var config = require(resolve(serverRoot, './config'));
  app.keys = [config.appname];

  // session
  if (config.sessionEnable) {
    app.use(session({
      key: app.keys[0]
    }, app));
  }

  // middleware
  app = middleware(app);

  // templates
  view(app, config.views);

  // static server
  asset(app, config.assetsRoots);

  // router
  router(app);

  // todo log 日志输出地址、格式、切割方式

  return app;
};

module.exports = Remote;
