const requestPromise = require('request-promise')
const readCB = require('node-readability')
const markdown = require('marked')

function read(url, options) {
  return new Promise((resolve, reject) =>
    readCB(url, options, (err, article, meta) => {
      if (err) return reject(err)
      return resolve(article)
    }))
}

// https://raw.githubusercontent.com/facebook/create-react-app/master/README.md
async function githubReadmeResolver(repo, options) {
  const url = `https://raw.githubusercontent.com/${repo}/master/README.md`
  const readme = await requestPromise(url)
  const html = markdown(readme)

  return [repo, html]
}

// Use node-readability to parse the html
async function nodeReadabilityResolver(url, options) {
  const article = await read(url, options)

  return [article.title, article.content]
}

const GITHUB_REPO = /^https?:\/\/(?:www\.)?github\.com\/([a-zA-Z0-9\._]+\/[a-zA-Z0-9\._\-]+)\/?$/

// TODO Should switch strategy depending on url
async function getDOM(url, options) {
  let article = {}

  const githubRepoMatches = GITHUB_REPO.exec(url)

  // get the appropriate data resolver deppending on the url
  if (githubRepoMatches && githubRepoMatches.length === 2) {
    [article.title, article.content] = await githubReadmeResolver(githubRepoMatches[1], options)
  }

  if (!article || !article.content) {
    [article.title, article.content] = await nodeReadabilityResolver(url, options)
  }

  return [article.title, article.content]
}

module.exports = { getDOM }
