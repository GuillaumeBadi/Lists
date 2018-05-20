
const readCB = require('node-readability')

function read(url, options) {
  return new Promise((resolve, reject) =>
    readCB(url, options, (err, article, meta) => {
      if (err) return reject(err)
      return resolve(article)
    }))
}

// Use node-readability to parse the html
async function nodeReadability(url, options) {
  const article = await read(url, options)

  return [article.title, article.content]
}

// TODO Should switch strategy depending on url
async function getDOM(url, options) {
  const article = await read(url, options)

  return [article.title, article.content]
}

module.exports = { read, nodeReadability, getDOM }
