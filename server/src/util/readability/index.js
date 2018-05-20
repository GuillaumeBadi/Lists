const { getDOM } = require('./getDOM')
const { createJSONTree } = require('./createJSONTree')

// Fetch the html and return a json tree
async function readability(url, options = {}) {
  const [title, content] = await getDOM(url, options)
  const tree = createJSONTree(content)

  return { title, tree }
}

module.exports = readability
