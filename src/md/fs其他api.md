### fs的其他操作

- 检查某个文件是否存在
  - `fs.existsSync(path)`
- 获取文件的状态， callback中的stat就是状态对象
  - `fs.stat('aaa.xls', (err, stat) => {})`
- 删除文件
  - `fs.unlink(path, callback)`
- 读取目录解构,返回一个数组
  - `fs.readdir(path)`
- ​