import React from "react"
import { Link, graphql } from "gatsby"

import HomeLayout from "../components/homelayout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"
import { Helmet } from "react-helmet"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();


class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <HomeLayout location={this.props.location} title={siteTitle}>
        <Helmet>
          <meta name="google-site-verification" content="aAxhI-I1HmxoEa86D9zHsMBtY7sfAVgyX_HfqMSSCCI" />
          <meta name="msvalidate.01" content="9BD6B4DCA2B9F88A132B7DDCA1578919" />
          <meta name="fediverse:creator" content="@vinitkme@fosstodon.org" />
        </Helmet>
        <Seo title="Home" />
        
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
