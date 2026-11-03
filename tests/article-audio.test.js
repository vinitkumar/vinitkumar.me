const test = require("node:test")
const assert = require("node:assert/strict")

const { hashArticle } = require("../scripts/article-audio")
const { extractArticle } = require("../scripts/extract-article")

const buildPage = (body, featured = "") => `<!doctype html><html><body>
  <article ${featured}>
  <header class="post-header"><h1>The title</h1><div class="post-actions"></div></header>
  <div class="post-content">${body}</div></article></body></html>`

test("extracts the title and readable blocks of a blog post", () => {
  const article = extractArticle(
    buildPage(`<p>Fish &amp; chips <code>inline</code>.</p>
      <p><noscript><img src="a.png"></noscript>After the image.</p>
      <pre><code>rm -rf /</code></pre><ul><li>One</li></ul>`)
  )

  assert.equal(article.title, "The title")
  assert.deepEqual(article.blocks, [
    { text: "Fish & chips inline ." },
    { text: "After the image." },
    { text: "One" },
  ])
})

test("marks section headings with their id", () => {
  const article = extractArticle(
    buildPage('<p>Intro</p><h2 id="setup">Setup</h2><h3 id="sub">Sub</h3>')
  )

  assert.deepEqual(article.blocks, [
    { text: "Intro" },
    { text: "Setup", sectionId: "setup" },
    { text: "Sub" },
  ])
})

test("reads the featured marker from the built page", () => {
  assert.equal(extractArticle(buildPage("<p>One</p>")).isFeatured, false)
  assert.equal(
    extractArticle(buildPage("<p>One</p>", 'data-featured="true"')).isFeatured,
    true
  )
})

test("ignores pages that are not blog posts", () => {
  assert.equal(extractArticle("<html><body><p>Hello</p></body></html>"), null)
})

test("marks audio as outdated when the text or voice changes", () => {
  const article = { title: "T", blocks: [{ text: "One" }] }

  assert.equal(hashArticle(article), hashArticle({ ...article }))
  assert.notEqual(hashArticle(article), hashArticle({ ...article, blocks: [{ text: "Two" }] }))
  assert.notEqual(hashArticle(article), hashArticle(article, "am_michael"))
})
