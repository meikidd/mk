const serverRoot = process.cwd()
const router = require('koa-router')()
const resolve = require('path').resolve

module.exports = function(app) {

  var config = require(resolve(serverRoot, './router/index.js'))
  for(var path in config) {
    let handler = require(resolve(serverRoot, config[path]))
    router.get(path, handler)
  }

  app.use(router.routes())
  app.use(router.allowedMethods())
}