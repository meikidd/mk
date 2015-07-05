const isArray = require('util').isArray
const asset = require('koa-static-cache')

module.exports = function(app, assetsRoots = []) {

  if(typeof assetsRoots === 'string') assetsRoots = [assetsRoots]
  if(!isArray(assetsRoots)) return
  for(var i = 0; i < assetsRoots.length; i++) {

    let root = assetsRoots[i]
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