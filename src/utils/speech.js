const MAX_CHUNK_LENGTH = 200

const SENTENCE_END = /[.!?]["')\]]*\s+/g
const ELEMENT_NODE = 1
const TEXT_NODE = 3

const SKIPPED_TAGS = new Set([
  "PRE",
  "TABLE",
  "FIGURE",
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "IFRAME",
  "SVG",
  "VIDEO",
  "AUDIO",
  "MEDIA-CONTROLLER",
])

// The contents rail lists h2 headings, so these are the sections audio tracks.
const SECTION_TAG = "H2"

const SKIPPED_CLASSES = ["fff-plus-demo-player", "footnotes"]

const BLOCK_TAGS = new Set([
  "P",
  "LI",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BLOCKQUOTE",
  "DIV",
  "UL",
  "OL",
  "SECTION",
])

const normalize = (text) => text.replace(/\s+/g, " ").trim()

// Index just past the last sentence end that fits in the window, or -1.
const findSentenceCut = (window) => {
  let cut = -1
  let match

  SENTENCE_END.lastIndex = 0
  while ((match = SENTENCE_END.exec(window)) !== null) {
    cut = match.index + match[0].length
  }

  return cut
}

const findCut = (text, maxLength) => {
  const window = text.slice(0, maxLength + 1)
  const sentenceCut = findSentenceCut(window)

  if (sentenceCut > 0 && sentenceCut <= maxLength + 1) {
    return sentenceCut
  }

  const spaceCut = window.lastIndexOf(" ")

  if (spaceCut > 0) {
    return spaceCut
  }

  return maxLength
}

// Splits one block into utterance-sized chunks. Chrome silently stops long
// utterances after about 15 seconds, so each chunk must stay short.
const chunkText = (text, maxLength = MAX_CHUNK_LENGTH) => {
  const chunks = []
  let rest = normalize(text)

  while (rest.length > maxLength) {
    const cut = findCut(rest, maxLength)
    const chunk = rest.slice(0, cut).trim()

    if (chunk) {
      chunks.push(chunk)
    }

    rest = rest.slice(cut).trim()
  }

  if (rest) {
    chunks.push(rest)
  }

  return chunks
}

const isSkipped = (node) => {
  if (SKIPPED_TAGS.has(String(node.tagName).toUpperCase())) {
    return true
  }

  const className = typeof node.className === "string" ? node.className : ""

  return SKIPPED_CLASSES.some((name) => className.includes(name))
}

// Returns the text of one block, walking text nodes only. Nested blocks are
// left to the caller so they are not read twice.
const readInline = (node, nestedBlocks) => {
  let text = ""

  for (const child of node.childNodes || []) {
    if (child.nodeType === TEXT_NODE) {
      text += child.textContent
      continue
    }

    if (child.nodeType !== ELEMENT_NODE || isSkipped(child)) {
      continue
    }

    if (BLOCK_TAGS.has(String(child.tagName).toUpperCase())) {
      nestedBlocks.push(child)
      text += " "
      continue
    }

    text += ` ${readInline(child, nestedBlocks)} `
  }

  return text
}

const collectBlock = (node, blocks) => {
  const nestedBlocks = []
  const text = normalize(readInline(node, nestedBlocks))

  if (text) {
    const isSection = String(node.tagName).toUpperCase() === SECTION_TAG

    blocks.push(isSection && node.id ? { text, sectionId: node.id } : { text })
  }

  nestedBlocks.forEach((child) => collectBlock(child, blocks))
}

// Returns the readable blocks under root, in document order. Headings that
// start a section also carry their id, so audio can be matched to the page.
const collectSpeakableBlocks = (root) => {
  const blocks = []

  collectBlock(root, blocks)

  return blocks
}

const collectSpeakableText = (root) =>
  collectSpeakableBlocks(root).map((block) => block.text)

// Returns the id of the section playing at this time, or null in the intro.
// Sections are ordered by startSeconds.
const findActiveSection = (sections, seconds) => {
  let activeId = null

  for (const section of sections) {
    if (section.startSeconds > seconds) {
      break
    }

    activeId = section.id
  }

  return activeId
}

module.exports = {
  MAX_CHUNK_LENGTH,
  chunkText,
  collectSpeakableBlocks,
  collectSpeakableText,
  findActiveSection,
}
