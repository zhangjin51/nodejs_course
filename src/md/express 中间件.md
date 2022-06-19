## express 中间件

- ##### 什么是中间件

  - 业务处理过程中的中间处理环节，就像webpack的loader，必须有输入和输出

- ##### 中间件调用流程

  - 当一个请求到达express服务器后，可以连续调用多个中间件，对这次请求进行***预处理***

- ##### express中间件的格式

  - express中间件本质上就是一个***函数***，它和路由的区别在于，它的参数列表中除了req和res必须包含next参数   

    ```javascript
    // 包含了req、res、关键包含了next三个参数的函数就是一个中间件了
    const mid = function(req, res, next) {
      next()
    }
    ```

    ​

  - next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或者路由

- ##### 中间件的实现

  - ***全局生效的中间件***：客户端发送的任何请求，到达服务器后，都会触发的中间件，通过调用`app.use(中间件函数)`, 即可定义一个全局生效的中间件，多次调用会按照定义顺序依次执行

    ```javascript
    // 包含了req、res、关键包含了next三个参数的函数就是一个中间件了
    const mid = function(req, res, next) {
      next()
    }

    // 上面的函数定义了中间件，调用app.use才会让中间件真正生效
    app.use(mid)

    //也可以直接写成这样的形式
    app.use((req, res, next) => {
      next()
    })
    ```

  - ***局部生效的中间件***：也叫在单独的路由中生效的中间件，将中间件写在路由的url和handler之间，局部生效的中间件就生效了，多个局部中间件只需要写多个或者换成一个数组就可以

    ```javascript
    // 包含了req、res、关键包含了next三个参数的函数就是一个中间件了
    const mid = function(req, res, next) {
      next()
    }

    // 上面的函数定义了中间件，如下会让局部中间件真正生效
    app.get('/', mid, (req, res) =>{})
    // 多个中间件生效
    app.get('/', mid, mid1, mid2, (req, res) =>{})
    app.get('/', [mid, mid1, mid2], (req, res) =>{})
    ```

    ​

- ##### 中间件的作用

  - 多个中间件或路由可以共享同一份req和res，基于这样的特性，可以在中间件的处理环节中给req或者res添加一些自定义的属性或方法，供下游中间件或路由使用，这就是预处理的意义

- ##### 中间件的特点

  - 要在路由之前注册生效
  - 可以连续多个中间件对请求进行处理
  - 执行完中间件代码后，要注意执行next（）函数
  - next（）之后不要再写额外的代码
  - 多个中间件和路由可以共享req和res

- ##### 中间件的分类

  - ***应用级别的中间件***

    - app.use
    - app.get
    - app.post
    - ...也就是绑定到app上的中间件，就叫做应用级别的中间件（包括了全局和局部）

  - ***路由级别的中间件***

    - 和应用级别中间件唯一不同之处就是绑定到router实例上（express.Router()）

  - ***错误级别的中间件***
    - 和普通中间件相比参数变为4个，第一个参数为error对象

    - ```javascript
      app.use((err, req, res, next) => {
        console.log(err.message)
        res.send('程序发生了错误')
        next()
      })
      ```

    - 错误级别中间件放在其他路由和中间件之后，以在代码发生异常崩溃的时候可以让代码流走到错误中间件中继续处理

  - ***express内置中间件***

    - express.static(path)

    - express.json()，解析`content-type: application/json` 的请求

      - ```javascript
        // 需要把该中间件的注册放到其他中间件和路由之前
        app.use(express.json())

        // 然后 路由处理函数的req参数的body属性就不再是undefined了
        ```

    - express.urlencoded({extended: false})， 解析`content-type: application/x-www-form-urlencoded` 类型的请求

      - ```javascript
        // extended: false 为默认写法
        app.use(express.urlencoded({
          extended: false
        }))

        // 然后 路由处理函数的req参数的body属性就不再是undefined了
        ```

  - ***第三方中间件***

    - 安装中间件
    - require导入
    - app.use()使用中间件

  - ​

