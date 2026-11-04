const test = require("node:test")
const assert = require("node:assert/strict")

const {
  MAX_CHUNK_LENGTH,
  chunkText,
  collectSpeakableText,
  findActiveSection,
} = require("../src/utils/speech")

const text = (value) => ({ nodeType: 3, textContent: value })
const el = (tagName, children = [], className = "") => ({
  nodeType: 1,
  tagName,
  className,
  childNodes: children,
  get textContent() {
    return children.map((child) => child.textContent).join("")
  },
})

test("keeps a short block as one chunk", () => {
  assert.deepEqual(chunkText("  Hello   world. "), ["Hello world."])
})

test("splits at sentence boundaries within the limit", () => {
  const chunks = chunkText("One two three. Four five six. Seven eight.", 30)

  assert.deepEqual(chunks, ["One two three. Four five six.", "Seven eight."])
})

test("falls back to spaces, then hard cuts, for long runs", () => {
  assert.deepEqual(chunkText("aaaa bbbb cccc dddd", 9), [
    "aaaa bbbb",
    "cccc dddd",
  ])
  assert.deepEqual(chunkText("abcdefghij", 4), ["abcd", "efgh", "ij"])
})

test("every chunk is trimmed, non-empty and within the default limit", () => {
  const long = "word ".repeat(300) + "x".repeat(500)
  const chunks = chunkText(long)

  assert.ok(chunks.length > 1)
  chunks.forEach((chunk) => {
    assert.ok(chunk.length > 0)
    assert.ok(chunk.length <= MAX_CHUNK_LENGTH)
    assert.equal(chunk, chunk.trim())
  })
})

test("returns no chunks for blank text", () => {
  assert.deepEqual(chunkText("  \n "), [])
})

test("collects blocks in document order", () => {
  const root = el("div", [
    el("h2", [text("Title")]),
    el("p", [text("Hello "), el("em", [text("big")]), text(" world.")]),
  ])

  assert.deepEqual(collectSpeakableText(root), ["Title", "Hello big world."])
})

test("never reads noscript content inside a paragraph", () => {
  const root = el("div", [
    el("p", [
      text("Before "),
      el("noscript", [text('<img src="a.png">')]),
      text("after"),
    ]),
  ])

  assert.deepEqual(collectSpeakableText(root), ["Before after"])
})

test("skips code, tables, figures, footnotes and demo players", () => {
  const root = el("div", [
    el("pre", [text("const a = 1")]),
    el("table", [text("cell")]),
    el("figure", [text("caption")]),
    el("svg", [text("shape")]),
    el("div", [text("player")], "fff-plus-demo-player"),
    el("section", [text("notes")], "footnotes"),
    el("p", [text("Kept.")]),
  ])

  assert.deepEqual(collectSpeakableText(root), ["Kept."])
})

test("reads a nested list once, after its parent item text", () => {
  const root = el("ul", [
    el("li", [text("Parent"), el("ul", [el("li", [text("Child")])])]),
    el("li", [text("Sibling")]),
  ])

  assert.deepEqual(collectSpeakableText(root), ["Parent", "Child", "Sibling"])
})

test("finds the section playing at a given time", () => {
  const sections = [
    { id: "one", startSeconds: 10 },
    { id: "two", startSeconds: 30 },
  ]

  assert.equal(findActiveSection(sections, 0), null)
  assert.equal(findActiveSection(sections, 10), "one")
  assert.equal(findActiveSection(sections, 29.9), "one")
  assert.equal(findActiveSection(sections, 500), "two")
  assert.equal(findActiveSection([], 5), null)
})
