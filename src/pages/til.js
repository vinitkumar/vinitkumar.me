import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"

const TilIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const tilPosts = data.allMarkdownRemark.edges

  const avgReadTime =
    Math.round(
      tilPosts.reduce((acc, post) => acc + (post.node.timeToRead || 2), 0) /
        tilPosts.length
    ) || 2

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet>
        <meta
          name="description"
          content="Today I Learned - Short notes on programming, technology, and development insights"
        />
      </Helmet>
      <Seo title="Today I Learned" />

      {/* Header */}
      <header
        style={{
          marginBottom: rhythm(2),
          textAlign: "center",
          padding: rhythm(2),
          background: "linear-gradient(135deg, var(--nav-til) 0%, #d97706 100%)",
          borderRadius: "var(--radius)",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            margin: 0,
            marginBottom: rhythm(0.5),
            fontWeight: "300",
          }}
        >
          Today I Learned
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            margin: 0,
            opacity: 0.9,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Short notes on programming, technology, and development insights. Quick
          reads that pack valuable knowledge.
        </p>
      </header>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: rhythm(2),
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "1rem",
            background: "var(--gray-100)",
            borderRadius: "var(--radius-small)",
            minWidth: "120px",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "var(--blue)",
            }}
          >
            {tilPosts.length}
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--gray-500)",
              fontWeight: "500",
            }}
          >
            TIL Posts
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "1rem",
            background: "var(--gray-100)",
            borderRadius: "var(--radius-small)",
            minWidth: "120px",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "var(--green)",
            }}
          >
            {avgReadTime}
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--gray-500)",
              fontWeight: "500",
            }}
          >
            Avg. Read Time
          </div>
        </div>
      </div>

      {/* TIL Posts Grid */}
      <div className="blog-posts-grid">
        {tilPosts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const description = node.frontmatter.description || node.excerpt
          const tags = node.frontmatter.tags || []

          return (
            <Link
              key={node.fields.slug}
              to={node.fields.slug}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <article className="blog-post-card">
                {/* TIL Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "1rem",
                    background: "var(--nav-til)",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "var(--radius)",
                    fontSize: "0.7rem",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  TIL
                </div>

                {/* Header */}
                <header style={{ marginBottom: "1.5rem", marginTop: "0.5rem" }}>
                  <h2
                    style={{
                      fontSize: "1.4rem",
                      margin: "0 0 1rem 0",
                      fontWeight: "600",
                      lineHeight: "1.3",
                    }}
                  >
                    {title}
                  </h2>

                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      fontSize: "0.9rem",
                      color: "var(--gray-500)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{node.frontmatter.date}</span>
                    <span>•</span>
                    <span>{node.timeToRead || 2} min read</span>
                  </div>
                </header>

                {/* Description */}
                <div
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "var(--text)",
                    marginBottom: "1.5rem",
                    flexGrow: 1,
                  }}
                >
                  <p style={{ margin: 0 }}>{description}</p>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {tags.slice(0, 3).map((tag, index) => (
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
                    {tags.length > 3 && (
                      <span
                        style={{
                          color: "var(--gray-500)",
                          fontSize: "0.75rem",
                          alignSelf: "center",
                        }}
                      >
                        +{tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <footer
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--gray-line)",
                  }}
                >
                  <div className="read-more-link">Read more →</div>
                </footer>
              </article>
            </Link>
          )
        })}
      </div>

      {/* Empty State */}
      {tilPosts.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "var(--gray-500)",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📚</div>
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
              color: "var(--text)",
            }}
          >
            No TIL posts yet
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            Check back soon for quick insights and learning notes!
          </p>
        </div>
      )}
    </Layout>
  )
}

export default TilIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { collection: { eq: "til" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
          timeToRead
        }
      }
    }
  }
`
