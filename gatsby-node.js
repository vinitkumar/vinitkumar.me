const path = require(`path`)
const fs = require(`fs`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const normalizeTag = tag =>
  String(tag || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")

const normalizeTags = tags => {
  if (!tags) return []
  const rawTags = Array.isArray(tags) ? tags : String(tags).split(/[,\s]+/)
  return Array.from(new Set(rawTags.map(normalizeTag).filter(Boolean)))
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  
  // Define explicit types for markdown frontmatter
  const typeDefs = `
    type MarkdownRemarkFrontmatter @dontInfer {
      title: String
      date: Date @dateformat
      description: String
      featured: Boolean
      canonicalPath: String
      noindex: Boolean
      tags: [String]
    }
    
    type MarkdownRemark implements Node @dontInfer {
      rawMarkdownBody: String
      excerpt(
        pruneLength: Int
        truncate: Boolean
        format: MarkdownExcerptFormats
      ): String
      frontmatter: MarkdownRemarkFrontmatter
      fields: MarkdownRemarkFields
    }
    
    type MarkdownRemarkFields @dontInfer {
      slug: String
      collection: String
      markdownPath: String
    }
  `
  
  createTypes(typeDefs)
  
  // Create resolver for tags to handle string -> array conversion
  createTypes([
    schema.buildObjectType({
      name: `MarkdownRemarkFrontmatter`,
      fields: {
        tags: {
          type: `[String]`,
          resolve(source) {
            return normalizeTags(source.tags)
          }
        }
      }
    })
  ])
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tilPost = path.resolve(`./src/templates/til-post.js`)
  const topicPage = path.resolve(`./src/templates/topic-page.js`)
  
  return graphql(
    `{
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
    edges {
      node {
        fields {
          slug
          collection
        }
        frontmatter {
          title
          date
          noindex
          tags
        }
      }
    }
  }
}`
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Separate blog and TIL posts
    const posts = result.data.allMarkdownRemark.edges
    const blogPosts = posts.filter(post => post.node.fields.collection === 'blog')
    const tilPosts = posts.filter(post => post.node.fields.collection === 'til')
    const tags = new Set()

    posts.forEach(post => {
      normalizeTags(post.node.frontmatter.tags).forEach(tag => tags.add(tag))
    })

    // Create blog posts pages
    blogPosts.forEach((post, index) => {
      const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
      const next = index === 0 ? null : blogPosts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          tags: normalizeTags(post.node.frontmatter.tags),
          noindex: Boolean(post.node.frontmatter.noindex),
          previous,
          next,
        },
      })
    })

    // Create TIL posts pages
    tilPosts.forEach((post, index) => {
      const previous = index === tilPosts.length - 1 ? null : tilPosts[index + 1].node
      const next = index === 0 ? null : tilPosts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: tilPost,
        context: {
          slug: post.node.fields.slug,
          tags: normalizeTags(post.node.frontmatter.tags),
          noindex: Boolean(post.node.frontmatter.noindex),
          previous,
          next,
        },
      })
    })

    tags.forEach(tag => {
      createPage({
        path: `/topics/${tag}/`,
        component: topicPage,
        context: {
          tag,
        },
      })
    })

    return null
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const collection = fileNode.sourceInstanceName
    
    // Create the slug based on collection type
    let slug
    if (collection === 'til') {
      // For TIL posts, create /til/title-format URLs
      const filePath = createFilePath({ node, getNode })
      slug = `/til${filePath}`
    } else {
      // For blog posts, keep existing behavior
      slug = createFilePath({ node, getNode })
    }
    
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({
      name: `markdownPath`,
      node,
      value: `${slug.replace(/\/$/, "")}.md`,
    })
    
    createNodeField({
      name: `collection`,
      node,
      value: collection,
    })
  }
}

const trimSlash = value => value.replace(/\/$/, "")

const inspectCodeFences = markdown => {
  const issues = []
  let openFence = null

  markdown.split(`\n`).forEach((line, index) => {
    if (openFence) {
      const possibleFence = line
        .replace(/^\s{0,3}/, ``)
        .match(/^(`+|~+)/)?.[1]

      if (
        possibleFence &&
        possibleFence[0] === openFence.marker &&
        possibleFence.length >= openFence.length
      ) {
        const validClosingFence = new RegExp(
          `^${openFence.marker}{${openFence.length},}\\s*$`
        )

        if (validClosingFence.test(line.replace(/^\s{0,3}/, ``))) {
          openFence = null
        } else {
          issues.push(index + 1)
        }
      }
      return
    }

    const openingFence = line.match(
      /^\s{0,3}(`{3,}|~{3,})(?:[A-Za-z0-9_+.#-]+)?(?:\{[^}\n]*\})*\s*$/
    )
    if (openingFence) {
      openFence = {
        marker: openingFence[1][0],
        length: openingFence[1].length,
        line: index + 1,
      }
    } else if (line.includes(`\`\`\``) || line.includes(`~~~`)) {
      issues.push(index + 1)
    }
  })

  if (openFence) issues.push(openFence.line)

  return issues
}

const verifyCodeBlockRendering = (publicDir, posts, reporter) => {
  const fenceIssues = posts.flatMap(post =>
    inspectCodeFences(post.rawMarkdownBody).map(
      line => `${post.fields.slug} (Markdown line ${line})`
    )
  )
  const codePosts = posts.filter(post =>
    /^\s{0,3}(?:`{3,}|~{3,})[^\n]*$/m.test(post.rawMarkdownBody)
  )
  const invalidPosts = codePosts.filter(post => {
    const htmlPath = path.join(
      publicDir,
      trimSlash(post.fields.slug).replace(/^\//, ""),
      `index.html`
    )
    const html = fs.readFileSync(htmlPath, `utf8`)

    return (
      html.includes(`<deckgo-highlight-code`) ||
      !html.includes(`<div class="gatsby-highlight"`) ||
      !html.includes(`<pre class="language-`) ||
      !html.includes(`<code class="language-`)
    )
  })

  if (fenceIssues.length > 0 || invalidPosts.length > 0) {
    reporter.panicOnBuild(
      [
        fenceIssues.length > 0
          ? `Malformed code fences: ${fenceIssues.join(", ")}`
          : null,
        invalidPosts.length > 0
          ? `Invalid rendered code blocks: ${invalidPosts
              .map(post => post.fields.slug)
              .join(", ")}`
          : null,
      ]
        .filter(Boolean)
        .join(`. `)
    )
  }
}

const markdownForPost = (siteUrl, post) => {
  const canonicalPath = post.frontmatter.canonicalPath || post.fields.slug
  const url = `${siteUrl}${canonicalPath}`
  const tags = normalizeTags(post.frontmatter.tags)

  return [
    `# ${post.frontmatter.title}`,
    ``,
    `Source URL: ${url}`,
    `Published: ${post.frontmatter.date}`,
    post.frontmatter.description
      ? `Summary: ${post.frontmatter.description}`
      : null,
    tags.length > 0 ? `Topics: ${tags.join(", ")}` : null,
    ``,
    post.rawMarkdownBody.trim(),
    ``,
  ]
    .filter(line => line !== null)
    .join(`\n`)
}

exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    {
      site {
        siteMetadata {
          title
          author
          description
          siteUrl
        }
      }
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: {
          frontmatter: { noindex: { ne: true }, canonicalPath: { eq: null } }
        }
      ) {
        nodes {
          rawMarkdownBody
          excerpt(pruneLength: 280)
          fields {
            slug
            collection
            markdownPath
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            description
            tags
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Failed to generate AI visibility files`, result.errors)
    return
  }

  const site = result.data.site.siteMetadata
  const posts = result.data.allMarkdownRemark.nodes
  const publicDir = path.join(__dirname, `public`)

  posts.forEach(post => {
    const outputPath = path.join(
      publicDir,
      `${trimSlash(post.fields.slug).replace(/^\//, "")}.md`
    )
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, markdownForPost(site.siteUrl, post))
  })

  const featuredPosts = posts.slice(0, 25)
  const topicMap = posts.reduce((topics, post) => {
    normalizeTags(post.frontmatter.tags).forEach(tag => {
      topics[tag] = (topics[tag] || 0) + 1
    })
    return topics
  }, {})
  const topics = Object.entries(topicMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  const llms = [
    `# ${site.title}`,
    ``,
    `> ${site.description}. Personal website and technical blog by ${site.author}.`,
    ``,
    `## Overview`,
    ``,
    `${site.title} is the personal site of ${site.author}, a principal engineer and open-source contributor writing about robust software systems, Django, Python, JavaScript, Go, developer tooling, AI workflows, engineering craft, and career lessons from building production systems.`,
    ``,
    `## Key Links`,
    ``,
    `- [Home](${site.siteUrl}/)`,
    `- [About](${site.siteUrl}/about/)`,
    `- [Today I Learned](${site.siteUrl}/til/)`,
    `- [Recommendations](${site.siteUrl}/recommendations/)`,
    `- [RSS feed](${site.siteUrl}/rss.xml)`,
    `- [Sitemap](${site.siteUrl}/sitemap-index.xml)`,
    `- [Full AI context](${site.siteUrl}/llms-full.txt)`,
    ``,
    `## Important Topics`,
    ``,
    ...topics.map(([tag, count]) => `- ${tag}: ${count} post${count === 1 ? "" : "s"}`),
    ``,
    `## Representative Writing`,
    ``,
    ...featuredPosts.map(post => {
      const url = `${site.siteUrl}${post.fields.slug}`
      return `- [${post.frontmatter.title}](${url}) - ${
        post.frontmatter.description || post.excerpt
      }`
    }),
    ``,
    `## Markdown Mirrors`,
    ``,
    `Most article pages expose a clean Markdown alternate at the same URL with a \`.md\` suffix. Example: ${site.siteUrl}/memory-efficient-python.md`,
    ``,
  ].join(`\n`)

  fs.writeFileSync(path.join(publicDir, `llms.txt`), llms)

  const llmsFull = [
    llms,
    ``,
    `# Full Article Index`,
    ``,
    ...posts.map(post => {
      const url = `${site.siteUrl}${post.fields.slug}`
      const markdownUrl = `${site.siteUrl}${post.fields.markdownPath}`
      return [
        `## ${post.frontmatter.title}`,
        ``,
        `URL: ${url}`,
        `Markdown: ${markdownUrl}`,
        `Published: ${post.frontmatter.date}`,
        post.frontmatter.description
          ? `Summary: ${post.frontmatter.description}`
          : `Summary: ${post.excerpt}`,
        normalizeTags(post.frontmatter.tags).length > 0
          ? `Topics: ${normalizeTags(post.frontmatter.tags).join(", ")}`
          : null,
        ``,
      ]
        .filter(line => line !== null)
        .join(`\n`)
    }),
  ].join(`\n`)

  fs.writeFileSync(path.join(publicDir, `llms-full.txt`), llmsFull)
  verifyCodeBlockRendering(publicDir, posts, reporter)
}
