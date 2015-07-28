'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var resolve = require('path').resolve;

var koa = require('koa');
var session = require('koa-session');

var view = require('./view');
var asset = require('./asset');
var router = require('./router');

var Remote = function Remote(middleware, config, serverRoot) {
  _classCallCheck(this, Remote);

  var app = koa();
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
  view(app, config.views, serverRoot);

  // static server
  asset(app, config.assetsRoots, serverRoot);

  // router
  router(app, serverRoot);

  // todo log 日志输出地址、格式、切割方式

  return app;
};

module.exports = Remote;