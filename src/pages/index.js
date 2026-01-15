import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"

import HomeLayout from "../components/homelayout"
import Seo from "../components/seo"
import Search from "../components/Search"
import Pagination from "../components/Pagination"

const POSTS_PER_PAGE = 5

if (typeof window !== "undefined") {
  deckDeckGoHighlightElement()
}

const BlogIndex = ({ data, location }) => {
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  
  const siteTitle = data.site.siteMetadata.title
  const allPosts = data.allMarkdownRemark.edges

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const featuredFilter = urlParams.get("featured")
      const pageParam = urlParams.get("page")
      
      if (featuredFilter === "true") {
        setShowFeaturedOnly(true)
      }
      if (pageParam) {
        const page = parseInt(pageParam, 10)
        if (!isNaN(page) && page > 0) {
          setCurrentPage(page)
        }
      }
    }
  }, [])

  const updateURL = (featured, page) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location)
      if (featured) {
        url.searchParams.set("featured", "true")
      } else {
        url.searchParams.delete("featured")
      }
      if (page > 1) {
        url.searchParams.set("page", page.toString())
      } else {
        url.searchParams.delete("page")
      }
      window.history.pushState({}, "", url)
    }
  }

  const toggleFeaturedFilter = () => {
    const newShowFeaturedOnly = !showFeaturedOnly
    setShowFeaturedOnly(newShowFeaturedOnly)
    setCurrentPage(1)
    updateURL(newShowFeaturedOnly, 1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    updateURL(showFeaturedOnly, page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredPosts = showFeaturedOnly
    ? allPosts.filter(({ node }) => node.frontmatter.featured)
    : allPosts

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

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

      {/* Search */}
      <Search posts={allPosts} />

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
              : `Showing ${startIndex + 1}–${Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} of ${filteredPosts.length} posts • ${featuredCount} featured`}
          </p>
        </div>

        <button
          onClick={toggleFeaturedFilter}
          className={`filter-btn ${showFeaturedOnly ? "filter-btn--active" : ""}`}
        >
          {showFeaturedOnly ? <>📚 Show All Posts</> : <>⭐ Show Featured Only</>}
        </button>
      </div>

      <div className="blog-posts-list">
        {paginatedPosts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const excerpt = node.frontmatter.description || node.excerpt
          return (
            <Link
              key={node.fields.slug}
              to={node.fields.slug}
              className="blog-post-row"
            >
              <div className="blog-post-row-main">
                {node.frontmatter.featured && (
                  <span className="blog-post-row-featured" title="Featured">⭐</span>
                )}
                <span className="blog-post-row-date">{node.frontmatter.date}</span>
                <h2 className="blog-post-row-title">{title}</h2>
                <span className="blog-post-row-arrow">→</span>
              </div>
              <p className="blog-post-row-excerpt">{excerpt}</p>
            </Link>
          )
        })}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* No posts message for featured filter */}
      {showFeaturedOnly && paginatedPosts.length === 0 && (
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
    allMarkdownRemark(
      sort: [{ frontmatter: { date: DESC } }]
      filter: { fields: { collection: { ne: "til" } } }
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
            featured
          }
        }
      }
    }
  }
`
