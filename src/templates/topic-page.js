import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { getPostDescription, getPostTitle } from "../utils/content"

const TopicPage = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { tag } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <header className="topic-header">
        <p className="eyebrow">Topic</p>
        <h1>{tag}</h1>
        <p>
          {posts.length} post{posts.length === 1 ? "" : "s"} in this topic.
        </p>
      </header>

      <div className="blog-posts-list">
        {posts.map(({ node }) => (
          <Link
            key={node.fields.slug}
            to={node.fields.slug}
            className="blog-post-row"
          >
            <div className="blog-post-row-header">
              <div className="blog-post-row-meta">
                <h2 className="blog-post-row-title">{getPostTitle(node)}</h2>
              </div>
              <span className="blog-post-row-arrow" aria-hidden="true">
                →
              </span>
            </div>
            <span className="blog-post-row-date">{node.frontmatter.date}</span>
            <p className="blog-post-row-excerpt">{getPostDescription(node)}</p>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default TopicPage

export const Head = ({ location, pageContext }) => (
  <Seo
    title={`Topic: ${pageContext.tag}`}
    description={`Writing by Vinit Kumar about ${pageContext.tag}.`}
    pathname={location.pathname}
  />
)

export const pageQuery = graphql`
  query TopicPageByTag($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 180)
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
