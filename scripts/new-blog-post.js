#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const BLOG_DIR = path.join(__dirname, "..", "content", "blog")

function printUsage() {
  console.error("Usage: node scripts/new-blog-post.js [--dry-run] \"Post title\"")
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function escapeFrontmatterValue(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function buildPost(title, date) {
  const escapedTitle = escapeFrontmatterValue(title)

  return `---
title: "${escapedTitle}"
date: "${date}"
description: ""
---

# ${title}
`
}

function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const help = args.includes("--help") || args.includes("-h")
  const title = args.filter((arg) => arg !== "--dry-run").join(" ").trim()

  if (help) {
    printUsage()
    process.exit(0)
  }

  if (!title) {
    printUsage()
    process.exit(1)
  }

  const slug = slugify(title)

  if (!slug) {
    console.error("Could not create a valid slug from the title.")
    process.exit(1)
  }

  const postDir = path.join(BLOG_DIR, slug)
  const postPath = path.join(postDir, "index.md")

  if (fs.existsSync(postPath)) {
    console.error(`Blog post already exists: ${path.relative(process.cwd(), postPath)}`)
    process.exit(1)
  }

  if (dryRun) {
    console.log(buildPost(title, formatDate(new Date())))
    console.log(`Would create ${path.relative(process.cwd(), postPath)}`)
    return
  }

  fs.mkdirSync(postDir, { recursive: true })
  fs.writeFileSync(postPath, buildPost(title, formatDate(new Date())), "utf8")

  console.log(`Created ${path.relative(process.cwd(), postPath)}`)
}

main()
