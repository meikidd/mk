const serverRoot = process.cwd()
const resolve = require('path').resolve
const isArray = require('util').isArray
const asset = require('koa-static-cache')

module.exports = function(app, assetsRoots = []) {

  if(typeof assetsRoots === 'string') assetsRoots = [assetsRoots]
  if(!isArray(assetsRoots)) return

  assetsRoots.forEach(function(config) {
    if(typeof config === 'string') {
      config = {root: config}
    }
    config.root = resolve(serverRoot, config.root)
    var {root, prefix} = Object.assign({prefix: '/'}, config)
    app.use(asset(root, {
      prefix: prefix
    }))
  })
}