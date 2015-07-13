const serverRoot = process.cwd()
const router = require('koa-router')()
const resolve = require('path').resolve

module.exports = function(app) {

  var config = require(resolve(serverRoot, './router/index.js'))
  for(var path in config) {
    try{
      let handler = require(resolve(serverRoot, config[path]))
      if(handler.get) {
        router.get(path, handler.get)
      } else {
        router.get(path, handler)
      }
      if(handler.post) {
        router.post(path, handler.post)
      }
      if(handler.put) {
        router.put(path, handler.put)
      }
      if(handler.del) {
        router.del(path, handler.del)
      }
    } catch(e) {
      // todo log
    }

  }

  app.use(router.routes())
  app.use(router.allowedMethods())
}