const router = require('koa-router')()
const resolve = require('path').resolve

module.exports = function(app, serverRoot) {

  var config = require(resolve(serverRoot, './router/index'))
  for(var path in config) {
    try{
      let handler = require(resolve(serverRoot, config[path]))
      if(handler.get) {
        router.get(path, handler.get)
      } else if (typeof handler !== 'object') {
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
      console.log(e.stack)
    }

  }

  app.use(router.routes())
  app.use(router.allowedMethods())
}