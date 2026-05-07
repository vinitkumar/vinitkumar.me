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

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const tags = normalizeTags(post.frontmatter.tags)
  const relatedPosts = data.relatedPosts.edges.filter(
    ({ node }) => node.fields.slug !== post.fields.slug
  )

  return (
    <Layout location={location} title={siteTitle}>
      <article className="post-shell">
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

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      pathname={location.pathname}
      type="article"
      date={post.frontmatter.dateISO}
      tags={tags}
    />
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
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        description
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
