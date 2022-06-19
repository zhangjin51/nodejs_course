const btnGet = document.getElementById('btnGet')
const btnPost = document.getElementById('btnPost')

btnGet.addEventListener('click', () => {
  axios.get('http://localhost:8080/api/user?name=zhangsan_get&age=118').then((res) => {
    console.log(res.data)
  }).catch((err) => {
    console.log('catche get error')
    console.log(err)
  })
})

btnPost.addEventListener('click', () => {
  axios.post('http://localhost:8080/api/setuser', {
    name: 'zhangsan post',
    age: 218
  }).then((res) => {
    console.log(res.data)
  }).catch((err) => {
    console.log('catche post error')
    console.log(err)
  })
})

function callback(dataStr) {
  // const data = JSON.parse(dataStr)
  console.log(dataStr)
  console.log(dataStr.name, dataStr.age)
}