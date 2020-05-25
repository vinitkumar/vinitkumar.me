import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import HomeLayout from "../components/homelayout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { Helmet } from "react-helmet"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <HomeLayout location={this.props.location} title={siteTitle}>
        <Helmet>
          <meta name="google-site-verification" content="aAxhI-I1HmxoEa86D9zHsMBtY7sfAVgyX_HfqMSSCCI" />
        </Helmet>
        <SEO title="Vinit Kumar - Blog on Programming & Software Development" />
        <Bio />
        {posts.map(({ node }) => {
          
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small> {node.frontmatter.featured && <small><strong>
                featured</strong></small>}
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </HomeLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
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
