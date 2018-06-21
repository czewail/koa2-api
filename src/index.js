const Api = require('./Api')

module.exports = function api() {
  return async function (ctx, next) {
    const ctxApi = new Api(ctx)
    ctx.api = ctxApi
    try {
      await next()
    } catch (err) {
      throw err
    }
  }
}