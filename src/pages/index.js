import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
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
        <Bio />
        {posts.map(({ node }) => {

          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h2
                style={{
                  marginBottom: rhythm(1 / 4),
                  fontSize: "2rem",
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
              <span>
                {node.frontmatter.date} {node.frontmatter.featured && <strong style={{ color: 'red' }}>
                  ⭐ featured</strong>}
              </span>
              <p style={{ marginTop: `10px` }}
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

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: [{frontmatter: {featured: ASC}}, {frontmatter: {date: DESC}}]) {
    edges {
      node {
        excerpt(pruneLength: 350)
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
