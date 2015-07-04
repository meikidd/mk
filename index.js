'use strict';

const views = require('koa-views')
const asset = require('./lib/asset')
const router = require('./lib/router')


module.exports = function(app) {

  asset(app)
  router(app)

  return app
}