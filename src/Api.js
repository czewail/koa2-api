
const { STATUS } = require('./const')

class Api {
  constructor(ctx) {
    this.ctx = ctx
    this.code = 200
    this.meta = null
    this.data = null
  }
  /**
   * 新增附加信息
   * @param {string} name 附加信息名称
   * @param {string} value 附加信息值
   */
  addMeta(name, value) {
    this.meta = {
      ...this.meta,
      [`${name}`]: value,
    }
    return this
  }
  /**
   * 设置附加信息
   * @param {object} meta 附加信息
   */
  setMeta(meta) {
    this.meta = meta
    return this
  }
  /**
   * 添加response的header头信息
   * @param {object} meta 附加信息
   */
  addHeader(name = null, value = null) {
    if (name !== null && value !== null) {
      this.ctx.set(name, value)
    }
    return this
  }
  /**
   * 通用错误处理方法
   * @param {mixed} data 返回的成功数据
   * @param {number} code 状态码，默认200
   */
  success(data, code = 200) {
    this.code = code
    this.data = data || STATUS[code]
    this.response()
  }
  /**
   * 通用错误处理方法
   * @param {mixed} msg 返回的错误信息
   * @param {number} code 状态码，默认404
   */
  error(msg, code = 404) {
    const message = msg || STATUS[code]
    this.code = code
    this.data = message
    this.response()
  }
  /**
   * 创建了资源的响应, 状态码为201
   * @param {*} location 资源响应位置
   */
  created(location = null, msg) {
    const code = 201
    const message = msg || STATUS[code]
    this.code = code
    this.data = message
    this.addHeader('Location', location).response()
  }
  /**
   * 更新了资源的响应, 状态码为200
   * success 的别名
   * @param {mixed} data 返回的数据
   */
  updated(data) {
    this.success(data, 200)
  }
  /**
   * 删除了资源的响应, 状态码为200
   * success 的别名
   * @param {mixed} data 返回的数据
   */
  deleted(data) {
    this.success(data, 200)
  }
  /**
   * 无内容响应
   */
  noContent() {
    this.code = 204
    this.response()
  }
  /**
   * bad request 错误, 状态码为400
   * @param {mixed} msg 自定义消息
   */
  errorBadRequest(msg) {
    this.error(msg, 400)
  }
  /**
   * 未认证错误, 状态码为401
   * @param {mixed} msg 自定义消息
   */
  errorUnauthorized(msg) {
    this.error(msg, 401)
  }
  /**
   * 服务器拒绝错误, 状态码为403
   * @param {mixed} msg 自定义消息
   */
  errorForbidden(msg) {
    this.error(msg, 403)
  }
  /**
   * 没有找到资源的错误, 状态码为404
   * @param {mixed} msg 自定义消息
   */
  errorNotFound(msg) {
    this.error(msg, 404)
  }
  /**
   * 方法不允许的错误, 状态码为405
   * @param {mixed} msg 自定义消息
   */
  errorMethodNotAllowed(msg) {
    this.error(msg, 405)
  }
  /**
   * 无法接受的类型, 状态码为406
   * @param {mixed} msg 自定义消息
   */
  errorNotAcceptable(msg) {
    this.error(msg, 406)
  }
  /**
   * 服务当前无法处理请求错误, 状态码为503
   * @param {mixed} msg 自定义消息
   */
  errorUnavailable(msg) {
    this.error(msg, 405)
  }
  /**
   * 根据实例属性响应接口数据
   */
  response() {
    const res = {}
    if (this.meta) {
      res.meta = this.meta
    }
    if (this.data) {
      res.data = this.data
    }
    this.ctx.status = this.code
    this.ctx.body = res
  }
}

module.exports = Api