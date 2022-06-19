const fs = require('fs')
const path = require('path')

const styleReg = /<style>[\s\S]*<\/style>/
const scriptReg = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, '../html/template.html'), 'utf-8', (error, data) => {
  readStyle(data)
  readScript(data)
  resoveHtml(data)
})

function readStyle(html) {
  const res = styleReg.exec(html)
  const newCss = res[0].replace(/<style>/g, '').replace(/<\/style>/g, '').replace(/\s/g, '')
  fs.writeFile(path.join(__dirname, '../html/index.css'), newCss, (err) => {
    if (!err) {
      console.log('css文件创建成功')
    }
  })
}

function readScript(html) {
  const res = scriptReg.exec(html)
  const newJs = res[0].replace(/<script>/g, '').replace(/<\/script>/g, '').replace(/\s/g, '')
  fs.writeFile(path.join(__dirname, '../html/index.js'), newJs, (err) => {
    if (!err) {
      console.log('js文件创建成功')
    }
  })
}

function resoveHtml(html) {
  const replaceCss = styleReg.exec(html)[0]
  const replaceJs = scriptReg.exec(html)[0]
  const htmlExtStyle = html.replace(replaceCss, '<link rel="stylesheet" href="./index.css" />')
  const htmlExtScript = htmlExtStyle.replace(replaceJs, '<script src="./index.js"></script>')
  fs.writeFile(path.join(__dirname, '../html/index.html'), htmlExtScript, (err) => {
    if (!err) {
      console.log('html文件创建成功')
    }
  })
}