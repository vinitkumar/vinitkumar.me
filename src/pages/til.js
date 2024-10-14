import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const TILPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <h1>Today I Learned</h1>
      <p>A collection of things I've learned, one day at a time.</p>
      <ul>
        {posts.map(({ node }) => (
          <li key={node.id}>
            <a href={node.fields.slug}>{node.frontmatter.title}</a>
            <p>{node.excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query pageUsersvinitkumarprojectsvinitkumarMesrcpagestilJs1059855306 {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/til/"}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default TILPage

