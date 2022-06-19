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