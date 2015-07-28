const views = require('koa-views')
const resolve = require('path').resolve

module.exports = function(app, {root = 'biz/templates', engine = 'dust'}, serverRoot) {

  app.use(views(resolve(serverRoot, root), {
    default: engine
  }));
}