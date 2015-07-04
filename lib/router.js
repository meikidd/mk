const serverRoot = process.cwd()
const router = require('koa-router')()
const resolve = require('path').resolve

module.exports = function(app) {

  var config = require(resolve(serverRoot, './router/index.js'))
  for(var k in config) {
    let handler = require(resolve(serverRoot, config[k]))
    router.get(k, handler)
  }

  app.use(router.routes())
  app.use(router.allowedMethods())
}