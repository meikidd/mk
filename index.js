'use strict';

const serverRoot = process.cwd()
const resolve = require('path').resolve

const asset = require('./lib/asset')
const router = require('./lib/router')
const view = require('./lib/view')


module.exports = function(app) {
  var config = require(resolve(serverRoot, './config'))

  view(app, config.views)
  asset(app, config.assetsRoots)
  router(app)

  return app
}