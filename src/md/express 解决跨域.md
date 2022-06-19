## express 解决跨域

- ##### 解决接口跨域主要两个解决方案：

  - ##### cors

    - 主流的解决方案，推荐使用

    - 使用express中间件解决跨域问题，安装：`npm install cors` 

    - ```javascript
      // 导入第三方中间件
      const cors = require('cors')
      // 注册为全局中间件
      app.use(cors())
      ```

      ​

  - ##### jsonp

    - 只支持GET请求

    - 获取可短发送请求回调函数的名字

    - 得到需要通过jsonp形式发送给客户端的数据

    - 拼接出一个函数调用的字符串

    - 把拼接好的字符串响应给客户端script标签进行解析执行

    - ```javascript
      // index.html

      <script>
          function callback(dataStr) {
            console.log(dataStr);
            console.log(dataStr.name, dataStr.age);
          }
      </script>
      <script src="http://localhost:8080/jsonp?callback=callback"></script>

      // app.js

      // jsonp接口需要在cors之前注册
      app.get('/jsonp', (req, res) => {
        const callbackName = req.query.callback
        console.log('callbackName is', callbackName)
        const data = {
          name: '鲁智深',
          age: 35
        }
        const scriptStr = `${callbackName}(${JSON.stringify(data)})`
        res.send(scriptStr)
      })
      ```

    - ​

      ​





- ##### cors详解


- ##### 什么是cors

  - 跨域资源共享，由一系列响应头组成，这些响应头决定浏览器是否阻止前端js代码跨域获取资源

- ##### cors特点

  - cors主要在服务器端配置，客户端浏览器不需要做任何额外的配置，就可以请求开启了cors的接口
  - cors具有兼容性问题，支持XMLHttpRequest Level2的浏览器才能支持（IE10+, Chrome4+, FireFox3.5+）

- ##### cors响应头

  - ##### Access-Control-Allow-Origin:

    - origin参数指定了允许访问该资源的外部url

    - 可以是域名（http://www.baidu.com）

    - 可以是`*`,表示所有域名都可以访问

    - ```javascript
      res.setHeader('Access-Control-Allow-Origin', 'http://www.xx.com')
      res.setHeader('Access-Control-Allow-Origin', '*')
      ```

  - ##### Access-Control-Allow-Headers:

    - 默认情况下，cors仅支持客户端向服务器发送9种类型的请求头

    - 如果需要支持额外的请求头，需要使用这个字段进行配置:

    - ```javascript
      // 多个请求头之间使用 ‘,’ 分隔： 'Content-type, X-Xx-Header'
      res.setHeader('Access-Control-Allow-Headers', 'Content-type, X-Xx-Header')
      ```

  - ##### Access-Control-Allow-Methods:

    - 默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求，需要添加额外的类型支持，就需要设置该字段

    - ```javascript
      res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT')
      res.setHeader('Access-Control-Allow-Methods', '*')
      ```

- ##### ​

- ##### cors 请求分类

  - ##### 简单请求

    - 符合默认请求头和默认请求类型的请求（*默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求*、*默认情况下，cors仅支持客户端向服务器发送9种类型的请求头*）

  - ##### 预检请求

    - 不符合简单请求的就是预检请求
    - 比如发送了`application/json` 格式的数据】
    - 浏览器和服务器正式通信之前，会先发送OPTION请求进行预检，以获知服务器是否支持该实际请求，这一次的OPTION请求就称为 ‘预检请求’， 服务器响应预检请求之后，浏览器和服务器之间才会开始通信

  - ##### 两者的区别

    - 简单请求只发送一次请求
    - 预检请求发送两次请求（多了一次前置的option请求）

  ​

  ​