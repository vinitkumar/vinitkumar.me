import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import blog from "../../content/assets/blog.jpg"

const TilPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet>
        <meta name="twitter:image" content={blog} />
      </Helmet>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      {/* TIL Badge */}
      <div
        style={{
          display: "inline-block",
          backgroundColor: "var(--nav-til)",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "var(--radius-pill)",
          fontSize: "0.8rem",
          fontWeight: "600",
          marginBottom: rhythm(1),
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        Today I Learned
      </div>

      <h1
        style={{
          marginTop: rhythm(0.5),
          marginBottom: 0,
          fontSize: "2rem",
          lineHeight: "1.2",
        }}
      >
        {post.frontmatter.title}
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: rhythm(1),
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            margin: 0,
            color: "var(--gray-text)",
          }}
        >
          {post.frontmatter.date}
        </p>

        {/* Tags */}
        {post.frontmatter.tags && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {post.frontmatter.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: "var(--gray-100)",
                  color: "var(--gray-700)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "var(--radius)",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.7",
        }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <hr
        style={{
          marginTop: rhythm(2),
          marginBottom: rhythm(1),
        }}
      />

      {/* Navigation */}
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          marginLeft: 0,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>

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
            fontSize: "0.9rem",
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
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
