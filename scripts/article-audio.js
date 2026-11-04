const crypto = require("crypto")
const fs = require("fs")
const path = require("path")

const AUDIO_DIR = path.join(__dirname, "..", "content", "assets", "audio")
const KOKORO_VOICE = "af_heart"

const hashArticle = ({ title, blocks }, voice = KOKORO_VOICE) =>
  crypto
    .createHash("sha256")
    .update(JSON.stringify({ voice, title, blocks }))
    .digest("hex")

// "/some-post/" becomes "some-post".
const getAudioName = (slug) => slug.replace(/^\/+|\/+$/g, "").replace(/\//g, "-")

const readAudioMeta = (slug) => {
  const metaPath = path.join(AUDIO_DIR, `${getAudioName(slug)}.json`)

  if (!fs.existsSync(metaPath)) {
    return null
  }

  return JSON.parse(fs.readFileSync(metaPath, "utf8"))
}

module.exports = {
  AUDIO_DIR,
  KOKORO_VOICE,
  getAudioName,
  hashArticle,
  readAudioMeta,
}
