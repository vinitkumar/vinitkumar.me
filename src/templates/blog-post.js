import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"
import {
  getPostDescription,
  getPostTitle,
  getTopicSlug,
  normalizeTags,
} from "../utils/content"

const postAccentByTag = {
  ai: "#F9A8D4",
  android: "#3DDC84",
  benchmarks: "#0A84FF",
  career: "#3DDC84",
  cli: "#0A84FF",
  cleanup: "#7FE5F0",
  cloud: "#C4B7FF",
  code: "#00D084",
  coding: "#00D084",
  commandline: "#7FE5F0",
  css: "#C4B7FF",
  development: "#7FE5F0",
  devops: "#C4B7FF",
  django: "#A8E6C0",
  "django-admin": "#A8E6C0",
  editors: "#7FE5F0",
  emacs: "#7FE5F0",
  expert: "#7FE5F0",
  general: "#FDFD96",
  git: "#00D084",
  go: "#00D084",
  gps: "#3DDC84",
  growth: "#FDFD96",
  hack: "#0A84FF",
  happy: "#FDFD96",
  images: "#F6AF7B",
  infra: "#C4B7FF",
  javascript: "#00D084",
  jekyll: "#C4B7FF",
  job: "#3DDC84",
  jobs: "#3DDC84",
  json2xml: "#0A84FF",
  latex: "#0A84FF",
  learning: "#FDFD96",
  life: "#FDFD96",
  mac: "#7FE5F0",
  machine: "#6DCFF6",
  macos: "#7FE5F0",
  macvim: "#7FE5F0",
  memory: "#0A84FF",
  mongodb: "#00D084",
  node: "#00D084",
  opensource: "#0A84FF",
  "open-source": "#0A84FF",
  oss: "#0A84FF",
  pdf: "#0A84FF",
  performance: "#0A84FF",
  productivity: "#FDFD96",
  programming: "#00D084",
  project: "#0A84FF",
  projects: "#0A84FF",
  python: "#A8E6C0",
  react: "#C4B7FF",
  "responsive-design": "#C4B7FF",
  rust: "#F6AF7B",
  self: "#FDFD96",
  "self-improvement": "#FDFD96",
  "self-improvements": "#FDFD96",
  setup: "#6DCFF6",
  software: "#7FE5F0",
  tech: "#C4B7FF",
  theme: "#C4B7FF",
  tooling: "#7FE5F0",
  value: "#FDFD96",
  "version-control": "#00D084",
  vim: "#7FE5F0",
  web: "#C4B7FF",
  "web-development": "#C4B7FF",
  work: "#3DDC84",
  workspace: "#6DCFF6",
  zig: "#F6AF7B",
}

const getPostAccentColor = (tags) =>
  tags.map((tag) => postAccentByTag[tag]).find(Boolean) || "#C4B7FF"

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const tags = normalizeTags(post.frontmatter.tags)
  const postAccentColor = getPostAccentColor(tags)
  const relatedPosts = data.relatedPosts.edges.filter(
    ({ node }) => node.fields.slug !== post.fields.slug
  )

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="post-shell starikov-post-accent"
        style={{ "--post-accent": postAccentColor }}
      >
        <header className="post-header">
          <p className="eyebrow">Essay</p>
          <h1>{post.frontmatter.title}</h1>
          <div className="post-meta">
            <span>{post.frontmatter.date}</span>
            <span>{post.timeToRead} min read</span>
            {post.wordCount?.words && (
              <span>{post.wordCount.words.toLocaleString()} words</span>
            )}
          </div>
          {tags.length > 0 && (
            <div className="post-tags">
              {tags.map((tag) => (
                <Link key={tag} to={getTopicSlug(tag)} className="topic-pill">
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {post.headings.length > 2 && (
          <nav className="toc" aria-label="Table of contents">
            <p className="eyebrow">Contents</p>
            {post.headings.map((heading) => (
              <a key={heading.id} href={`#${heading.id}`}>
                {heading.value}
              </a>
            ))}
          </nav>
        )}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      {relatedPosts.length > 0 && (
        <section className="related-posts">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Keep Reading</p>
              <h2>Related Posts</h2>
            </div>
          </div>
          <div className="compact-post-list">
            {relatedPosts.map(({ node }) => (
              <Link
                key={node.fields.slug}
                to={node.fields.slug}
                className="compact-post-link"
              >
                <span>{node.frontmatter.date}</span>
                <strong>{getPostTitle(node)}</strong>
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav className="post-nav" aria-label="Post navigation">
        {previous ? (
          <Link to={previous.fields.slug} rel="prev">
            <span>Previous</span>
            <strong>{previous.frontmatter.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={next.fields.slug} rel="next">
            <span>Next</span>
            <strong>{next.frontmatter.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data, location }) => {
  const post = data.markdownRemark
  const tags = normalizeTags(post.frontmatter.tags)
  const isCanonicalPost =
    !post.frontmatter.canonicalPath && !post.frontmatter.noindex

  return (
    <>
      <body className="post-template" />
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        canonicalPath={post.frontmatter.canonicalPath}
        markdownPath={isCanonicalPost ? post.fields.markdownPath : undefined}
        noindex={post.frontmatter.noindex}
        pathname={location.pathname}
        type="article"
        date={post.frontmatter.dateISO}
        tags={tags}
      />
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tags: [String]) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 300)
      html
      headings(depth: h2) {
        id
        value
      }
      timeToRead
      wordCount {
        words
      }
      fields {
        slug
        markdownPath
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        description
        canonicalPath
        noindex
        tags
      }
    }
    relatedPosts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        fields: { collection: { eq: "blog" } }
        frontmatter: { tags: { in: $tags } }
      }
      limit: 4
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
