const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  
  // Define explicit types for markdown frontmatter
  const typeDefs = `
    type MarkdownRemarkFrontmatter @dontInfer {
      title: String
      date: Date @dateformat
      description: String
      featured: Boolean
      tags: [String]
    }
    
    type MarkdownRemark implements Node @dontInfer {
      frontmatter: MarkdownRemarkFrontmatter
      fields: MarkdownRemarkFields
    }
    
    type MarkdownRemarkFields @dontInfer {
      slug: String
      collection: String
    }
  `
  
  createTypes(typeDefs)
  
  // Create resolver for tags to handle string -> array conversion
  createTypes([
    schema.buildObjectType({
      name: `MarkdownRemarkFrontmatter`,
      fields: {
        tags: {
          type: `[String]`,
          resolve(source) {
            const tags = source.tags
            if (!tags) return []
            if (Array.isArray(tags)) return tags
            if (typeof tags === 'string') return [tags]
            return []
          }
        }
      }
    })
  ])
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tilPost = path.resolve(`./src/templates/til-post.js`)
  
  return graphql(
    `{
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
    edges {
      node {
        fields {
          slug
          collection
        }
        frontmatter {
          title
        }
      }
    }
  }
}`
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Separate blog and TIL posts
    const posts = result.data.allMarkdownRemark.edges
    const blogPosts = posts.filter(post => post.node.fields.collection === 'blog')
    const tilPosts = posts.filter(post => post.node.fields.collection === 'til')

    // Create blog posts pages
    blogPosts.forEach((post, index) => {
      const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
      const next = index === 0 ? null : blogPosts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create TIL posts pages
    tilPosts.forEach((post, index) => {
      const previous = index === tilPosts.length - 1 ? null : tilPosts[index + 1].node
      const next = index === 0 ? null : tilPosts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: tilPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const collection = fileNode.sourceInstanceName
    
    // Create the slug based on collection type
    let slug
    if (collection === 'til') {
      // For TIL posts, create /til/title-format URLs
      const filePath = createFilePath({ node, getNode })
      slug = `/til${filePath}`
    } else {
      // For blog posts, keep existing behavior
      slug = createFilePath({ node, getNode })
    }
    
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    
    createNodeField({
      name: `collection`,
      node,
      value: collection,
    })
  }
}
