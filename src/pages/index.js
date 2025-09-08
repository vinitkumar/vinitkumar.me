import React from "react"
import { Link, graphql } from "gatsby"

import HomeLayout from "../components/homelayout"
import Seo from "../components/seo"
import { Helmet } from "react-helmet"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();


class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFeaturedOnly: false
    }
  }

  componentDidMount() {
    // Check URL parameters on mount
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const featuredFilter = urlParams.get('featured')
      if (featuredFilter === 'true') {
        this.setState({ showFeaturedOnly: true })
      }
    }
  }

  toggleFeaturedFilter = () => {
    const newShowFeaturedOnly = !this.state.showFeaturedOnly
    this.setState({ showFeaturedOnly: newShowFeaturedOnly })

    // Update URL without page refresh
    if (typeof window !== 'undefined') {
      const url = new URL(window.location)
      if (newShowFeaturedOnly) {
        url.searchParams.set('featured', 'true')
      } else {
        url.searchParams.delete('featured')
      }
      window.history.pushState({}, '', url)
    }
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const allPosts = data.allMarkdownRemark.edges

    // Filter posts based on featured status
    const posts = this.state.showFeaturedOnly
      ? allPosts.filter(({ node }) => node.frontmatter.featured)
      : allPosts

    const featuredCount = allPosts.filter(({ node }) => node.frontmatter.featured).length

    return (
      <HomeLayout location={this.props.location} title={siteTitle}>
        <Helmet>
          <meta name="google-site-verification" content="aAxhI-I1HmxoEa86D9zHsMBtY7sfAVgyX_HfqMSSCCI" />
          <meta name="msvalidate.01" content="9BD6B4DCA2B9F88A132B7DDCA1578919" />
          <meta name="fediverse:creator" content="@vinitkme@fosstodon.org" />
        </Helmet>
        <Seo title="Home" />

        {/* Filter Controls */}
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '1.2rem',
              color: '#2d3748',
              marginBottom: '0.25rem'
            }}>
              {this.state.showFeaturedOnly ? (
                <>⭐ Featured Posts ({featuredCount})</>
              ) : (
                <>📝 All Posts ({allPosts.length})</>
              )}
            </h3>
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: '#718096'
            }}>
              {this.state.showFeaturedOnly
                ? 'Showing my most valuable and impactful writing'
                : `Browse all posts • ${featuredCount} featured`
              }
            </p>
          </div>

          <button
            onClick={this.toggleFeaturedFilter}
            style={{
              background: this.state.showFeaturedOnly
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : '#ff0000',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: this.state.showFeaturedOnly
                ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                : '0 4px 12px rgba(99, 102, 241, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = this.state.showFeaturedOnly
                ? '0 6px 16px rgba(16, 185, 129, 0.4)'
                : '0 6px 16px rgba(99, 102, 241, 0.4)'
            }}
            onFocus={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = this.state.showFeaturedOnly
                ? '0 6px 16px rgba(16, 185, 129, 0.4)'
                : '0 6px 16px rgba(99, 102, 241, 0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = this.state.showFeaturedOnly
                ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                : '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
            onBlur={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = this.state.showFeaturedOnly
                ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                : '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
          >
            {this.state.showFeaturedOnly ? (
              <>📚 Show All Posts</>
            ) : (
              <>⭐ Show Featured Only</>
            )}
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
                        textDecoration: 'none',
                        color: 'inherit'
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
                  <Link
                    to={node.fields.slug}
                    className="read-more-link"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* No posts message for featured filter */}
        {this.state.showFeaturedOnly && posts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#718096'
          }}>
            <p style={{ fontSize: '1.1rem' }}>No featured posts found.</p>
          </div>
        )}
      </HomeLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: [{frontmatter: {date: DESC}}]) {
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
}`
