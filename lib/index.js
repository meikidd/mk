'use strict';

const serverRoot = process.cwd()
const resolve = require('path').resolve

const koa = require('koa')
const session = require('koa-session')

const view = require('./view')
const asset = require('./asset')
const router = require('./router')

class Remote {

  constructor(middleware) {

    var app = koa()
    var config = require(resolve(serverRoot, './config'))
    app.keys = [config.appname]

    // session
    if(config.sessionEnable) {
      app.use(session({
        key: app.keys[0]
      }, app))
    }

    // middleware
    app = middleware(app)

    // templates
    view(app, config.views)

    // static server
    asset(app, config.assetsRoots)

    // router
    router(app)

    // todo log 日志输出地址、格式、切割方式

    return app
  }

}

module.exports = Remote