'use strict';

const views = require('koa-views')
const asset = require('./lib/asset')
const router = require('./lib/router')
const view = require('./lib/view')


module.exports = function(app) {

  view(app)
  asset(app)
  router(app)

  return app
}