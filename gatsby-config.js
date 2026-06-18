module.exports = {
  siteMetadata: {
    title: `Vinit Kumar`,
    author: `Vinit Kumar`,
    description: `My essays on programming, technology and life`,
    siteUrl: `https://vinitkumar.me`,
    social: {
      twitter: `vinitkme`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/topics/**`, `/stats/`, `/404/`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark {
              nodes {
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "YYYY-MM-DD")
                  noindex
                  canonicalPath
                }
              }
            }
          }
        `,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMarkdownRemark: { nodes: markdownNodes },
        }) => {
          const markdownByPath = markdownNodes.reduce((pages, node) => {
            pages[node.fields.slug] = node.frontmatter
            return pages
          }, {})

          return allPages
            .map((page) => ({
              ...page,
              ...markdownByPath[page.path],
            }))
            .filter((page) => !page.noindex && !page.canonicalPath)
        },
        serialize: ({ path, date }) => ({
          url: path,
          ...(date ? { lastmod: date } : {}),
        }),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/til`,
        name: `til`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: "carbon",
              theme: "blackboard",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [`G-FGECNRP32R`],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Vinit's blog`,
        short_name: `Vinit Kumar`,
        start_url: `/`,
        background_color: `#F9F6EE`,
        theme_color: `#F9F6EE`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`,
      },
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const isTil = edge.node.fields.collection === "til"
                const title = isTil
                  ? `[TIL] ${edge.node.frontmatter.title}`
                  : edge.node.frontmatter.title
                return Object.assign({}, edge.node.frontmatter, {
                  title,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC }}
                  filter: {
                    frontmatter: {
                      noindex: { ne: true }
                      canonicalPath: { eq: null }
                    }
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug
                        collection
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Vinit Kumar",
          },
        ],
      },
    },
  ],
}
