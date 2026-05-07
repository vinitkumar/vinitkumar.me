import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"
import { getTopicSlug, normalizeTags } from "../utils/content"
import blog from "../../content/assets/blog.jpg"

const TilPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const tags = normalizeTags(post.frontmatter.tags)

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet>
        <meta name="twitter:image" content={blog} />
      </Helmet>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        pathname={location.pathname}
        type="article"
        date={post.frontmatter.dateISO}
        tags={tags}
      />

      <article className="post-shell til-post">
        <header className="post-header">
          <p className="eyebrow">Today I Learned</p>
          <h1>{post.frontmatter.title}</h1>
          <div className="post-meta">
            <span>{post.frontmatter.date}</span>
            <span>{post.timeToRead || 2} min read</span>
          </div>
          {tags.length > 0 && (
            <div className="post-tags">
              {tags.map(tag => (
                <Link key={tag} to={getTopicSlug(tag)} className="topic-pill">
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <hr
        style={{
          marginTop: rhythm(2),
          marginBottom: rhythm(1),
        }}
      />

      <nav className="post-nav" aria-label="TIL navigation">
        {previous ? (
          <Link to={previous.fields.slug} rel="prev">
            <span>Previous</span>
            <strong>{previous.frontmatter.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={next.fields.slug} rel="next">
            <span>Next</span>
            <strong>{next.frontmatter.title}</strong>
          </Link>
        ) : <span />}
      </nav>

      {/* Back to TIL */}
      <div
        style={{
          marginTop: rhythm(1),
          textAlign: "center",
        }}
      >
        <Link
          to="/til"
          style={{
            color: "var(--blue)",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
          }}
        >
          ← Back to all TIL posts
        </Link>
      </div>
    </Layout>
  )
}

export default TilPostTemplate

export const pageQuery = graphql`
  query TilPostBySlug($slug: String!) {
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
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        description
        tags
      }
    }
  }
`
