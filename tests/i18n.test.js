const test = require("node:test")
const assert = require("node:assert/strict")

const {
  getLanguageAlternates,
  getLanguageSwitchPath,
  getLocale,
  getLocalizedPath,
} = require("../src/utils/i18n")

test("detects Japanese only for paths inside the Japanese route prefix", () => {
  assert.equal(getLocale("/ja/"), "ja")
  assert.equal(getLocale("/ja/about/"), "ja")
  assert.equal(getLocale("/japanese-tools/"), "en")
  assert.equal(getLocale("/about/"), "en")
})

test("localizes translated routes without duplicating the locale prefix", () => {
  assert.equal(getLocalizedPath("/", "ja"), "/ja/")
  assert.equal(getLocalizedPath("/about/", "ja"), "/ja/about/")
  assert.equal(getLocalizedPath("/ja/about/", "ja"), "/ja/about/")
  assert.equal(getLocalizedPath("/ja/about/", "en"), "/about/")
})

test("language switch returns the matching translated page when available", () => {
  assert.equal(getLanguageSwitchPath("/", "ja"), "/ja/")
  assert.equal(getLanguageSwitchPath("/about/", "ja"), "/ja/about/")
  assert.equal(getLanguageSwitchPath("/ja/about/", "en"), "/about/")
})

test("language switch falls back to the locale home for untranslated pages", () => {
  assert.equal(getLanguageSwitchPath("/stats/", "ja"), "/ja/")
  assert.equal(getLanguageSwitchPath("/some-essay/", "ja"), "/ja/")
})

test("returns hreflang alternates only for translated page pairs", () => {
  assert.deepEqual(getLanguageAlternates("/ja/about/"), [
    { lang: "en", path: "/about/" },
    { lang: "ja", path: "/ja/about/" },
    { lang: "x-default", path: "/about/" },
  ])
  assert.deepEqual(getLanguageAlternates("/stats/"), [])
})
