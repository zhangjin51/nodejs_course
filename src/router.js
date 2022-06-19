const express = require('express')
const router = express.Router()


router.get('/user', (req, res) => {
  const {
    query
  } = req
  res.send({
    status: 0,
    message: 'get 请求成功',
    data: query
  })
})
router.post('/setuser', (req, res) => {
  const {
    body
  } = req
  res.send({
    status: 0,
    message: 'post 请求成功',
    data: body
  })
})

module.exports = router