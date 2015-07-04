const serverRoot = process.cwd()
const isArray = require('util').isArray
const resolve = require('path').resolve
const asset = require('koa-static-cache')

module.exports = function(app) {

  var config = require(resolve(serverRoot, './config'))
  var staticRoots = config.staticRoots
  if(!staticRoots) return

  if(typeof staticRoots === 'string') staticRoots = [staticRoots]
  if(!isArray(staticRoots)) return
  for(var i = 0; i < staticRoots.length; i++) {

    let root = staticRoots[i]
    if(typeof root === 'string') {
      app.use(asset(root))
    } else if (root.root) {
      root.prefix = root.prefix || '/';
      app.use(asset(root.root, {
        prefix: root.prefix
      }))
    }
  }
}