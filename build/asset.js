'use strict';

var serverRoot = process.cwd();
var resolve = require('path').resolve;
var isArray = require('util').isArray;
var asset = require('koa-static-cache');

module.exports = function (app) {
  var assetsRoots = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  if (typeof assetsRoots === 'string') assetsRoots = [assetsRoots];
  if (!isArray(assetsRoots)) return;

  assetsRoots.forEach(function (config) {
    if (typeof config === 'string') {
      config = { root: config };
    }
    config.root = resolve(serverRoot, config.root);

    var _Object$assign = Object.assign({ prefix: '/' }, config);

    var root = _Object$assign.root;
    var prefix = _Object$assign.prefix;

    app.use(asset(root, {
      prefix: prefix
    }));
  });
};