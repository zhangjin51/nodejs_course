const path = require('path')
const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')

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

app.use(cors())
// 这两个中间件可以保证post类型的接口支持 
//Content-type: application/json 或者 application/x-www-form-urlencoded 形式的请求
app.use(express.json())
app.use(express.urlencoded({
  extended: false // 固定写法
}))

// 自定义中间件处理请求解析
// app.use((req, res, next) => {
//   let str = ''
//   req.on('data', (chunk) => {
//     console.log(chunk)
//     str += chunk
//   })
//   req.on('end', () => {
//     console.log(str)
//     res.send('ok')
//   })
// })

app.use('/api', router)
app.use(express.static(path.join('./html')))

app.use((err, req, res, next) => {
  console.log(err.message)
  res.send('程序发生了错误')
  next()
})

app.listen(8080, () => {
  console.log('express server is running at http://localhost:8080')
})