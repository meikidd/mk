'use strict';

var views = require('koa-views');
var resolve = require('path').resolve;

module.exports = function (app, _ref, serverRoot) {
  var _ref$root = _ref.root;
  var root = _ref$root === undefined ? 'biz/templates' : _ref$root;
  var _ref$engine = _ref.engine;
  var engine = _ref$engine === undefined ? 'dust' : _ref$engine;

  app.use(views(resolve(serverRoot, root), {
    'default': engine
  }));
};