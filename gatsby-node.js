const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const tilPostTemplate = path.resolve(`./src/templates/til-post.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              type  # Add a "type" field in the frontmatter of your markdown files to differentiate between "blog" and "til"
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create pages for blog posts and TIL posts.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    const template = post.node.frontmatter.type === "til" ? tilPostTemplate : blogPostTemplate

    createPage({
      path: post.node.fields.slug,
      component: template,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const basePath = node.fileAbsolutePath.includes("/til/")
      ? "til"
      : "blog"  // Differentiating between TIL and blog posts based on the folder structure

    const value = createFilePath({ node, getNode, basePath: `content/${basePath}` })
    
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
