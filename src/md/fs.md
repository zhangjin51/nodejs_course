### fs（文件系统/(I/O)）

- 在node中，与文件系统的交互是非常重要的，服务器的本质就是将本地的文件发送给远端的客户端
- node通过fs模块与文件系统交互
- fs模块提供了一些标准文件访问API,用于打开、读取、写入文件，以及与其交互



### 同步和异步调用

 -  `fs`模块中所有的操作都有两种形式可以选择，`同步`和`异步`

 -   `同步`的形式直接通过返回值的形式返回结果，会阻塞程序的运行

 -  `异步`的形式通过`callback`的形式返回结果，不会阻塞程序的运行

    ​

    ​

### 文件的操作

- ##### 同步(通常的流程：打开，写入，关闭)

  ##### 1. 打开文件

   - `fs.openSync(path, flags[, mode])`
      - `path（string）` 要打开文件的路径
      - `flag（string）` 打开文件要做的操作类型
         - `r` 读
         - `w` 写
      - `mode` 设置文件的操作权限，一般不传
   - `返回值` 该方法会返回一个稳健的描述符作为结果，可以通过该描述符来对文件进行各种操作

  ##### 2. 写入文件

   - `fs.writeSync(fd, string[, position[, encoding]])`
      - `fd` 文件的描述符，注意上面打开文件的时候返回值获取到了
      - `string` 要写入的字符串内容
      - `position` 写入的起始位置（可选，一般不写）
      - `encoding` 写入的编码方式，默认是utf-8

  ##### 3. 保存和关闭

   - 因为服务器通常不会停止运行，打开的文件不会因为IE停止运行而得到内存释放，所以通常在服务端，打开的文件操作完毕后，还需要进行关闭操作
   - `fs.closeSync(fd)`
      - `fd` 要关闭的文件描述符

- ##### ​

- ##### 异步

  ##### 1. 打开文件

  - ##### `fs.open('path', 'w', callback)`

    - `path` 文件路径
    - `flags` 打开文件要操作的类型
    - `callback` 主要要说的是参数（nodejs 错误优先，只要有可能出现异常的方法，回调函数第一个参数一定是一个error对象）
      - `error` 错误对象，如果没有错误则为null
      - `fd` 文件描述符

  - ##### `fs.write(fd, string, callback)`

    - `fd` 要写入内容的文件描述符
    - `string` 要写入的内容的字符串
    - `callback` 参数说明
      - 1. error对象
        2. `written` 指定传入的字符串被写入多少字节
        3. `string` 写入的字符串，如果传入的不是字符串会强制转换

  - ##### `fs.close(fd, callback)`

    - `callback` 只有一个参数，error对象

  ​

- ##### 简单版写入文件

  - ##### `fs.writeFile(path, string,[, options] callback)`

  - ##### ``flag`` 的几种形式，默认值`w`表示写入截断，先清除在写入，如果需要追加写入可以使用`a`

- ##### 总结

  - 存在的问题，以上的所有方法都是一次性把内容存入一个buffer，占用大量内存进行一次性的写入操作，不适合大型文件的操作



##### - 流式文件写入(可以比喻成水管)

- `fs.createWriteStream(path[, options])` 创建一个可写流并返回

  - `path` 文件路径
  - `options` 配置参数

- demo

- ```javascript
  const fs = require('fs')

  const ws = fs.createWriteStream('hello-fs-Stream.txt')
  // 定义一个一次性的监听函数，如果想要监听多次，使用“on”
  ws.once('open', function () {
    console.log('接通了水管')
  })
  ws.once('close', function () {
    console.log('关闭了水管')
  })
  ws.write('input 1')
  ws.write('input 2')
  ws.write('input 3')
  ws.write('input 4')

  // 表示从输入关，水管内的内容还是可以全部输入到目标文件
  ws.end() // 还一种是close，表示从目标文件关闭，水管中的内容可能无法输入完毕
  ```
  ​


##### - 流式文件读取和写入

```javascript
const fs = require('fs')

const rs = fs.createReadStream('aaa.xls')
const ws = fs.createWriteStream('bbb.xls')

rs.once('open', () => {
  console.log('打开')
})

rs.once('close', () => {
  console.log('关闭')
})

ws.once('open', () => {
  console.log('write打开')
})

ws.once('close', () => {
  console.log('write关闭')
})

rs.on('data', (data) => {
  console.log(data.length)
})

// 它省略了ws的write和close，pipe帮你做了这些事情
rs.pipe(ws)
```






