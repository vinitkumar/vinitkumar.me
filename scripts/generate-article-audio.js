#!/usr/bin/env node

// Generates one Kokoro MP3 per featured blog post from the built site in public/.
//
//   yarn build
//   yarn audio:generate              Generate missing or outdated audio.
//   yarn audio:generate my-post      Limit the run to one featured post.
//   yarn audio:check                 Fail when any featured post's audio is out of date.

const { spawn } = require("child_process")
const fs = require("fs")
const os = require("os")
const path = require("path")

const {
  AUDIO_DIR,
  KOKORO_VOICE,
  getAudioName,
  hashArticle,
  readAudioMeta,
} = require("./article-audio")
const { extractArticle } = require("./extract-article")

const PUBLIC_DIR = path.join(__dirname, "..", "public")
const WORKER_PATH = path.join(__dirname, "kokoro_tts.py")
const WORKER_COUNT = 4
const CHECK_FLAG = "--check"

const loadFeaturedArticles = () => {
  const articles = []

  for (const entry of fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    const htmlPath = path.join(PUBLIC_DIR, entry.name, "index.html")

    if (!entry.isDirectory() || !fs.existsSync(htmlPath)) {
      continue
    }

    const article = extractArticle(fs.readFileSync(htmlPath, "utf8"))

    if (!article?.isFeatured) {
      continue
    }

    const slug = `/${entry.name}/`

    articles.push({
      ...article,
      slug,
      name: getAudioName(slug),
      hash: hashArticle(article),
    })
  }

  return articles
}

const isOutdated = (article) => readAudioMeta(article.slug)?.hash !== article.hash

const runWorker = (jobPath) =>
  new Promise((resolve, reject) => {
    const worker = spawn("uv", ["run", "--quiet", WORKER_PATH, jobPath], {
      stdio: "inherit",
    })

    worker.on("error", reject)
    worker.on("close", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Kokoro worker exited with code ${code}`))
    })
  })

const generate = async (articles) => {
  const count = Math.min(WORKER_COUNT, articles.length)
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "article-audio-"))

  fs.mkdirSync(AUDIO_DIR, { recursive: true })

  // Each worker owns its posts, and each post owns its files, so nothing is
  // shared and an interrupted run simply resumes.
  const workers = Array.from({ length: count }, (_, index) => {
    const jobPath = path.join(tempDir, `job-${index}.json`)
    const job = {
      outputDir: AUDIO_DIR,
      threads: Math.max(1, Math.floor(os.cpus().length / count)),
      voice: KOKORO_VOICE,
      articles: articles.filter((_, position) => position % count === index),
    }

    fs.writeFileSync(jobPath, JSON.stringify(job))

    return runWorker(jobPath)
  })

  await Promise.all(workers)
  fs.rmSync(tempDir, { recursive: true, force: true })
}

const main = async () => {
  const args = process.argv.slice(2)
  const only = args.find((arg) => arg !== CHECK_FLAG)
  const articles = loadFeaturedArticles()

  if (articles.length === 0) {
    throw new Error("No built featured posts found. Run yarn build first.")
  }

  const selected = only
    ? articles.filter((article) => article.name === only)
    : articles

  if (only && selected.length === 0) {
    throw new Error(`No built featured post named ${only}.`)
  }

  const outdated = selected.filter(isOutdated)

  if (args.includes(CHECK_FLAG)) {
    outdated.forEach((article) => console.error(`Outdated: ${article.name}`))
    console.log(`${selected.length - outdated.length}/${selected.length} current.`)
    process.exitCode = outdated.length > 0 ? 1 : 0
    return
  }

  console.log(`Generating ${outdated.length} of ${selected.length} posts.`)

  if (outdated.length > 0) {
    await generate(outdated)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
