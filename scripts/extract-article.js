const { parse } = require("parse5")

const {
  collectSpeakableBlocks,
  collectSpeakableText,
} = require("../src/utils/speech")

const ELEMENT_NODE = 1
const TEXT_NODE = 3

const getClass = (node) =>
  (node.attrs || []).find((attr) => attr.name === "class")?.value || ""

// Gives parse5 nodes the small DOM surface that collectSpeakableText reads,
// so the audio and the browser fallback follow one set of skip rules.
const toDomNode = (node) => {
  if (node.nodeName === "#text") {
    return { nodeType: TEXT_NODE, textContent: node.value }
  }

  if (!node.tagName) {
    return { nodeType: 0, childNodes: [] }
  }

  return {
    nodeType: ELEMENT_NODE,
    tagName: node.tagName,
    className: getClass(node),
    id: (node.attrs || []).find((attr) => attr.name === "id")?.value,
    childNodes: (node.childNodes || []).map(toDomNode),
  }
}

const findByClass = (node, className) => {
  if (getClass(node).split(/\s+/).includes(className)) {
    return node
  }

  for (const child of node.childNodes || []) {
    const match = findByClass(child, className)

    if (match) {
      return match
    }
  }

  return null
}

const findByTag = (node, tagName) => {
  if (node.tagName === tagName) {
    return node
  }

  for (const child of node.childNodes || []) {
    const match = findByTag(child, tagName)

    if (match) {
      return match
    }
  }

  return null
}

// The blog post template sets data-featured from the post's frontmatter.
const hasFeaturedMarker = (node) => {
  const isMarked = (node.attrs || []).some(
    (attr) => attr.name === "data-featured" && attr.value === "true"
  )

  return isMarked || (node.childNodes || []).some(hasFeaturedMarker)
}

// Returns the title and readable blocks of a built blog post, or null for any
// other page. Only the blog post template renders .post-actions.
const extractArticle = (html) => {
  const document = parse(html)
  const content = findByClass(document, "post-content")
  const header = findByClass(document, "post-header")

  if (!content || !header || !findByClass(header, "post-actions")) {
    return null
  }

  const [title] = collectSpeakableText(toDomNode(findByTag(header, "h1")))

  return {
    title,
    blocks: collectSpeakableBlocks(toDomNode(content)),
    isFeatured: hasFeaturedMarker(document),
  }
}

module.exports = { extractArticle }
