const fs = require('fs')
const read = require('./src/util/readability')

const start = async () => {
  // await read('https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27')
  // const data = await read('https://github.com/facebook/create-react-app')
  const data = await read('https://medium.com/@amandoabreu/you-dont-understand-your-software-engineers-53442ca0805a')

  fs.writeFileSync('/Users/noribeydon/perso/viewer/src/data.json', JSON.stringify(data.tree))

  // await read('https://www.entrepreneur.com/article/288452')
  // await read('https://www.vim.org/about.php')
}

start().then(
  () => void console.log() || process.exit(0),
  err => void console.error(err) || process.exit(1)
)
