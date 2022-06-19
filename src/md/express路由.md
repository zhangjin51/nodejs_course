## express路由

- ##### 什么是路由

  - 路由就是一个映射关系，相当于一个`key`对应一个`value` 

- ##### express中的路由

  - ***客户端的请求***与***服务器处理函数***之间的映射关系
  - express路由由3部分组成：`app.METHOD(PATH, HANDLER)`
    - 请求的类型
    - 请求的url地址
    - 请求的处理函数

- ##### express路由匹配过程

  - 当一个请求到达服务器之后，会按照***路由的顺序***进行匹配，如果***请求类型和请求的url***同时匹配成功，则express会将这次请求，转交给对应的handler函数进行处理

- ##### express路由简单的使用方式

  - ```javascript
    app.get('/', (req, res) => {
      console.log('接收到get请求')
      res.send('接收到请求')
    })

    app.post('/url', (req, res) => {

    })
    ```

- ##### 模块化路由的使用方式

  - 上面的使用方式，当路由需要比较多的时候会导致代码量非常多不容易维护，所以我们推荐使用模块化路由的方式开发

  - 创建路由模块文件（router.js）

  - 在模块文件内，调用express.router()函数创建路由对象

  - 向路由对象上挂载具体的路由

  - 使用module.exports导出路由对象

  - 使用app.use（作用是注册全局中间件）函数注册路由模块

  - ```javascript
    // router.js

    const express = require('express')
    const router = express.Router()

    router.get('/', (req, res) => {})
    router.post('/', (req, res) => {})

    module.exports = router

    // app.js
    const router = require('./router')

    app.use(router)
    ```

  - 可以通过类似给静态资源托管添加访问前缀的方式给路由模块添加访问前缀

    - `app.use(path, router)`

