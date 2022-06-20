## http模块

- ##### 什么是http模块

  - http模块是Node.js官方提供的、用来创建web服务器的模块，通过http模块提供的`http.createServer()`方法，可以创建一个web服务器

- ##### 使用http模块创建web服务器的步骤

  1. 导入http模块

  2. 创建web服务器实例

  3. 为服务器实例绑定request事件，监听客户端的请求

  4. 启动服务器

  5. 代码实现

     ```javascript
     const http = require('http') // 导入

     const server = http.createServer() // 创建server、

     server.on('request', (req, res) => { // 监听request事件
       console.log('someone visit server')
     })

     server.listen(8080, () => { // 启动服务
       console.log('server is running at http://localhost:8080')
     })
     ```

- ##### request事件监听详解

  - ##### req请求对象

    - ##### 概念

      - 只要服务器接收到了客户端的请求，就会调用server.on()绑定的 `request` 事件处理函数，`req` 对象就是客户端相关的数据或属性

    - ##### 使用方式

      - `req` 对象上包含了一些比较常用的属性，比如：`method` `url` 等

  - ##### res响应对象

    - ##### 概念

      - 在服务器request事件处理函数中，如果想访问与服务器相关的数据和属性，可以使用`res` 

    - ##### 使用方式

      - ```javascript
        // 设置响应头，解决中文乱码问题
        // 常用的content-type：
          res.setHeader('Content-Type', 'text/html; charset=utf-8')  
        // 响应请求，发送相应内容，并结束请求
          res.end(JSON.stringify(resData))
        ```

    - ##### 常用的 `Content-Type` 类型

      1. ##### application/x-www-form-urlencoded, 

         提交的数据按照 key1=val1&key2=val2 的方式进行编码，key和val都进行了URL转码

      2. ##### application/json

         消息主体是序列化后的 `JSON` 字符串,这个类型越来越多地被大家所使用,可以方便的提交复杂的结构化数据，特别适合 `RESTful` 的接口。传递JSON字符串可以方便的让前端转为js的对象，进行显示和逻辑操作。

      3. ##### text/html

         是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范

      4. ##### text/css

         用于css文件的响应

      ​

      ​

  ##### - 案例代码

  ```javascript
  // console.log(arguments.callee.toString())
  // console.log(exports, require, module, __filename, __dirname);

  const http = require('http')
  const path = require('path')
  const fs = require('fs')

  const server = http.createServer()

  server.on('request', (req, res) => {
    const url = (req.url === '/' ? '/index.html' : req.url)
    const readPath = path.join(__dirname, '../html', url)
    console.log(readPath, req.url, req.url === '/')
    fs.readFile(readPath, {
      encoding: 'utf-8'
    }, (err, data) => {
      if (!err) {
        console.log(path.extname(url))
        let type = 'text/html'
        if (path.extname(url) === '.css') {
          type = 'text/css'
        } else if (path.extname(url) === '.js') {
          type = 'application/json'
        }
        // 设置响应头
        res.setHeader(`Content-Type`, `${type}; charset=utf-8`)
        // 响应请求，发送相应内容，并结束请求
        res.end(data)
      } else {
        res.end('<h2>404 Not found.</h2>')
      }
    })
      })

    server.listen(8080, () => {
  	console.log('server is running at http://localhost:8080')
    })
  ```

