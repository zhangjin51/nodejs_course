### path路径模块

- 在不使用path模块的时候，使用node执行的代码，所使用的本地路径（‘./’,'../'）都会以node执行的时的路径为根路径，所以会导致某些找不到文件的错误，例如:

  ```javascript
  // 执行文件的命令行代码
  node ./src/main.js

  /*
  	文件系统结构
  	- src
  	|	- main.js
  	- hello.txt
  */

  // main.js 中的代码
  fs.readFile('../hello.txt', {
    encoding: 'utf-8'
  }, (err, data) => {
    console.log(data.split(' '))
  })
  ```

- 以上的代码可以发现，从我们日常写代码的习惯上来说，在写main.js的时候，我们认为要读取的目录就是在

`../` 的外层的，但实际执行的结果就是找不到这个文件，所以我们尽量使用path路径模块来处理 

- ##### path.join（...paths）

  - 可以把多个路径片段拼接位完整的路径字符串，需要注意的点是 `../` 会抵消一层目录

  - ```javascript
    const pat = path.join('/a', '/b', '/c', '/d/e')
    console.log(pat) // \a\b\c\d\e
    ```

    ​

- ##### path.basename(path, [, ext])

  - 可以把path中的文件名和后缀输出，如果添加了后缀名，则只输出文件名

  - ```javascript
    const filename = path.basename(path.join(__dirname, 'main.js'), '.js')
    console.log(filename) // main
    ```

- ##### ​

- ##### path.extname(path) 

  - 获取路径中的文件拓展名，和上面代码相反，只输出路径中的扩展名部分

  - ```javascript
    const filename = path.basename(path.join(__dirname, 'main.js'))
    console.log(filename) // .js
    ```

  - ​