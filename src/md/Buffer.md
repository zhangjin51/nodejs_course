### Buffer（缓冲区，存储二进制数据）

- Buffer的解构和数组很像，操作的方法也和数组类似

- 数组中不能存储二进制的文件，而buffer就是专门用来存储二进制数据的

- 使用buffer不需要引入模块，它是node内置的

- buffer中的二进制数据都是以16进制的形式显示的（二进制太长了）

- buffer中的数据一旦输出都会以10进制的形式输出

- buffer中的一个元素占用一个字节（8位），取值范围是00-ff

- buffer的大小一旦确定就不能修改，因为buffer实际上是对底层内存的直接操作，它是通过c++来直接分配的

  ##### buffer常用api

  - `Buffer.from(str)` 根据一个字符串创建一个buffer
  - `Buffer.alloc(size)` 创建一个指定大小的buffer，清除内存原本的数据
  - `Buffer.alloUnsafe(size)` 创建一个指定大小的buffer，内存原本的数据不清除

  ##### Buffer的应用场景

   - 作为服务端语言，用户发送的请求都是二进制数据，这样的数据的存储就是用buffer
   - 发送给用户的数据也是二进制数据，也是通过`Buffer `存储的
   - ​

  ​

