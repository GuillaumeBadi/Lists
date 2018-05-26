const cheerio =require('cheerio')

// Check if the element must be handled differantly
function resolveExceptions(node, $node) {
  return false
}

function getNodeJSON() {
  const $this = cheerio(this)
  const child = { type: this.name || 'text' }

  if (child.type === 'a' && this.attribs.href) {
    child.href = this.attribs.href
  } else if (child.type === 'img' && this.attribs.src) {
    child.src = this.attribs.src
  }

  const isException = resolveExceptions(this, $this, child)

  if (!isException) {
    const $contents = $this.contents()
    if ($contents.length) {
      child.childs = getJSONTree(null, $contents)
    } else {
      child.text = $this.text()
    }
  } else {
    child.isException = true
  }

  return child
}

// get a JSON Tree from a cheerio instance
function getJSONTree($elem, content = $elem.contents()) {
  return content.map(getNodeJSON).get()
}

// clean empty nodes
function cleanJSONTree(tree, ignoreWhiteChars = false) {
  return tree.reduce((res, node) => {
    const ignoreWhiteChilds = ignoreWhiteChars || node.type === 'code'

    if (
      ignoreWhiteChars
      || node.isException
      || node.type === 'img'
      || node.text && node.text.trim().length
    ) {
      if (node.text && !ignoreWhiteChars) {
        node.text = node.text.replace(/\n/g, '')
      }
      res.push(node)
    }
    else if (node.childs) {
      const childs = cleanJSONTree(node.childs, ignoreWhiteChilds)
      if (childs.length || ignoreWhiteChilds) res.push({ ...node, childs })
    }
    return res
  }, [])
}

function createJSONTree(content) {
  const $body = cheerio.load(content)('body')
  const dirtyTree = getJSONTree($body)

  return cleanJSONTree(dirtyTree)
}

module.exports = { createJSONTree }
