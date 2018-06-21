# KOA2 接口数据规范中间件
提供基于RestFul的生成接口数据的便捷方法

## 安装
```bash
$ npm install --save koa2-api
```

## 使用
### 创建中间件
```js
const api = require('koa2-api')
app.use(api())
```

## 响应
定义了一个api属性挂载到了koa的ctx上，可以再控制器或路由直接取到ctx进行使用
```js
ctx.body = { id: 1 }
```
改为
```js
ctx.api.success({ id: 1 })
```

### 通用响应方法
##### api#success(data[, code])
成功响应，状态码默认200， 可通过 `code` 参数改变
##### api#error(data[, code])
错误响应，状态码默认404， 可通过 `code` 参数改变
##### api#created(localtion[, data])
资源已创建的响应，状态码默认201，可传入 `localtion` 参数，标识资源位置，将会在响应头中添加 `Location` 属性
##### api#updated(data)
资源已更新的成功响应，状态码默认200
##### api#deleted(data)
资源已删除的成功响应，状态码默认200
##### api#noContent()
无内容响应，状态码204

### 常用错误响应
##### api#errorBadRequest(message)
请求不合法错误, 状态码为400
##### api#errorUnauthorized(message)
未认证错误, 状态码为401
##### api#errorForbidden(message)
服务器拒绝错误, 状态码为403
##### api#errorNotFound(message)
没有找到资源的错误, 状态码为404
##### api#errorMethodNotAllowed(message)
方法不允许的错误, 状态码为405
##### api#errorNotAcceptable(message)
无法接受的类型, 状态码为406
##### api#errorUnavailable(message)
服务当前无法处理请求错误, 状态码为503