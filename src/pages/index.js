import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"

import HomeLayout from "../components/homelayout"
import Seo from "../components/seo"

// Initialize code highlighting
if (typeof window !== "undefined") {
  deckDeckGoHighlightElement()
}

const BlogIndex = ({ data, location }) => {
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  
  const siteTitle = data.site.siteMetadata.title
  const allPosts = data.allMarkdownRemark.edges

  // Check URL parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const featuredFilter = urlParams.get("featured")
      if (featuredFilter === "true") {
        setShowFeaturedOnly(true)
      }
    }
  }, [])

  const toggleFeaturedFilter = () => {
    const newShowFeaturedOnly = !showFeaturedOnly
    setShowFeaturedOnly(newShowFeaturedOnly)

    // Update URL without page refresh
    if (typeof window !== "undefined") {
      const url = new URL(window.location)
      if (newShowFeaturedOnly) {
        url.searchParams.set("featured", "true")
      } else {
        url.searchParams.delete("featured")
      }
      window.history.pushState({}, "", url)
    }
  }

  // Filter posts based on featured status
  const posts = showFeaturedOnly
    ? allPosts.filter(({ node }) => node.frontmatter.featured)
    : allPosts

  const featuredCount = allPosts.filter(
    ({ node }) => node.frontmatter.featured
  ).length

  return (
    <HomeLayout location={location} title={siteTitle}>
      <Helmet>
        <meta
          name="google-site-verification"
          content="aAxhI-I1HmxoEa86D9zHsMBtY7sfAVgyX_HfqMSSCCI"
        />
        <meta name="msvalidate.01" content="9BD6B4DCA2B9F88A132B7DDCA1578919" />
        <meta name="fediverse:creator" content="@vinitkme@fosstodon.org" />
      </Helmet>
      <Seo title="Home" />

      {/* Filter Controls */}
      <div className="filter-controls">
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "1.2rem",
              color: "var(--text)",
              marginBottom: "0.25rem",
            }}
          >
            {showFeaturedOnly ? (
              <>⭐ Featured Posts ({featuredCount})</>
            ) : (
              <>📝 All Posts ({allPosts.length})</>
            )}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "var(--text-muted)",
            }}
          >
            {showFeaturedOnly
              ? "Showing my most valuable and impactful writing"
              : `Browse all posts • ${featuredCount} featured`}
          </p>
        </div>

        <button
          onClick={toggleFeaturedFilter}
          className={`filter-btn ${showFeaturedOnly ? "filter-btn--active" : ""}`}
        >
          {showFeaturedOnly ? <>📚 Show All Posts</> : <>⭐ Show Featured Only</>}
        </button>
      </div>

      <div className="blog-posts-grid">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} className="blog-post-card">
              <div className="blog-post-header">
                <h2 className="blog-post-title">
                  <Link
                    style={{
                      boxShadow: `none`,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h2>
                <div className="blog-post-meta">
                  <span className="blog-post-date">{node.frontmatter.date}</span>
                  {node.frontmatter.featured && (
                    <span className="featured-badge">⭐ Featured</span>
                  )}
                </div>
              </div>

              <div
                className="blog-post-description"
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />

              <div className="blog-post-footer">
                <Link to={node.fields.slug} className="read-more-link">
                  Read more →
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {/* No posts message for featured filter */}
      {showFeaturedOnly && posts.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ fontSize: "1.1rem" }}>No featured posts found.</p>
        </div>
      )}
    </HomeLayout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: [{ frontmatter: { date: DESC } }]) {
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
            featured
          }
        }
      }
    }
  }
`
