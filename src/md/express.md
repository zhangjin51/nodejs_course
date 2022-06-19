## express

- ##### 学习express之后可以具备的能力

  - 使用express.static() 快速托管静态资源
  - 使用express路由精简项目结构
  - 会使用常用的express中间件
  - 能够使用express创建API接口
  - 能够在express中启用cors跨域资源共享

- ##### express简介

  - 通俗的理解，express和Node.js内置的http模块功能类似，用于创建web服务器，能力更强
  - http://www.expressjs.com.cn/
  - express是基于http模块封装的，能够极大的提高开发效率

- ##### express可以做什么

  - 前端常见的服务器类型：Web网站服务器、API接口服务器
  - expres可以方便快速的创建这两种服务器

- ##### express常用api

  - 创建express实例：`const app = express()`

  - 监听get类型请求：`app.get('url', (req, res) => {})`

    - url，请求路径
    - req，请求对象，常用属性
      - `req.query`，url中?后面的参数
      - `req.params`, url中：后面的动态参数
    - res，响应对象，常用属性和方法
      - `res.send`, 可以发送字符串或者对象

  - 监听post类型的请求：`app.post('url', (req, res) => {})` 参数同上

  - 托管静态类型资源：`app.use(express.static('静态资源目录'))`

    - `express.static(path)` 表示把path所在的目录作为服务器的根目录
    - 可以多次调用托管代码实现托管多个静态资源目录的目的
    - 添加访问路径，`app.use(path1, express.static(path2))` 这样在访问的时候就相当于服务器根目录存放于path1目录中，所以访问的时候需要添加该路径
    - 它和路由监听的优先级，谁在前面谁执行

  - ```javascript
    const express = require('express')
    // 生成express实例
    const app = express()

    // 定义get请求类型的路由
    app.get('/get', (req, res) => {
      

      res.send('接收到请求')
    })

    // 定义post类型的路由


    // 启动express服务器，监听8080端口
    app.listen(8080, () => {
      console.log('express server is running at http://localhost:8080')
    })
    ```

- ##### 使用nodemon避免修改服务器代码的时候需要频繁手动close和start

  - ##### 安装：

    - `npm install -g nodemon` 

  - ##### 使用

    - 之前使用：`node server.js`
    - nodemon方式：`nodemon server.js`
    - ​