const fs = require('fs')
const path = require('path')
const read = require('./src/util/readability')

const start = async () => {
  // await read('https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27')
  const data = await read(
    'https://medium.com/the-mission/the-simple-secret-to-creating-a-successful-morning-routine-a3a23eb43fee',
  )

  fs.writeFileSync(path.join(__dirname, '/data.json'), JSON.stringify(data))

  // await read('https://www.entrepreneur.com/article/288452')
  // await read('https://www.vim.org/about.php')
}

start().then(
  () => void console.log() || process.exit(0),
  err => void console.error(err) || process.exit(1),
)
