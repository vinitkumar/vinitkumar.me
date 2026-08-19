import React from "react"
import { graphql } from "gatsby"

import BlogIndex, { Head as HomeHead } from "../index"

const JapaneseHome = (props) => <BlogIndex {...props} locale="ja" />

export default JapaneseHome

export const Head = (props) => <HomeHead {...props} />

export const pageQuery = graphql`
  query JapaneseHomeQuery {
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
            tags
          }
        }
      }
    }
    allTil: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { collection: { eq: "til" } } }
      limit: 3
    ) {
      edges {
        node {
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
