## req和res

- ##### req常用api

  - `req.query`,  url ? 后面的参数组成的对象
  - `req.params`, 动态路由解析（router.get('/url/:id')）,可以获取到动态参数组成的对象
  - `req.on('data'， （chunk）=> {})`, 监听到一次请求的数据传输
  - `req.on('end', () =>{})`, 对应上面的`data`, 表示数据传输完毕

- ##### ​

- ##### res常用api

  - `res.send(data)`, `data` 可以是字符串也可以是json对象



​	