import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"

const StatsIndex = (props) => {
  const data = useStaticQuery(graphql`
    query StatsQuery {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              date
              title
              featured
            }
          }
        }
      }
    }
  `)
  
  // Analyze posts by year
  const posts = data.allMarkdownRemark.edges
  const yearStats = {}
  const featuredPosts = []
  let totalPosts = 0

  posts.forEach(({ node }) => {
    totalPosts++
    const date = node.frontmatter.date
    const featured = node.frontmatter.featured

    if (date) {
      const year = new Date(date).getFullYear()
      yearStats[year] = (yearStats[year] || 0) + 1
    }

    if (featured) {
      featuredPosts.push({
        title: node.frontmatter.title,
        date: date
      })
    }
  })

  const years = Object.keys(yearStats).sort((a, b) => b - a)
  const mostActiveYear = Object.keys(yearStats).reduce((a, b) => yearStats[a] > yearStats[b] ? a : b)

  return (
    <Layout location={props.location}>
      <Seo title="Blog Statistics" />
      <h1>📊 Blog Statistics</h1>
      
      <div style={{ 
        marginTop: rhythm(1), 
        padding: "20px", 
        backgroundColor: "#f9f9f9", 
        borderRadius: "8px"
      }}>
        <div style={{ marginBottom: "20px", fontSize: "1rem", lineHeight: "1.4" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <span><strong>📝 Total Posts:</strong> {totalPosts}</span>
            <span><strong>⭐ Featured Posts:</strong> {featuredPosts.length}</span>
            <span><strong>📅 Years Writing:</strong> {years.length}</span>
            <span><strong>🔥 Most Active Year:</strong> {mostActiveYear} ({yearStats[mostActiveYear]} posts)</span>
            <span><strong>📈 Writing Period:</strong> {Math.min(...years)}-{Math.max(...years)}</span>
          </div>
        </div>

        <h2 style={{ marginBottom: rhythm(0.5), fontSize: "1.5rem" }}>Posts by Year</h2>
        <div style={{ fontFamily: "monospace", fontSize: "12px", lineHeight: "1.3" }}>
          {years.map(year => {
            const count = yearStats[year]
            const barLength = Math.round((count / Math.max(...Object.values(yearStats))) * 30)
            const bar = "█".repeat(barLength)
            return (
              <div key={year} style={{ marginBottom: "3px", display: "flex" }}>
                <span style={{ width: "50px", textAlign: "right", marginRight: "10px" }}>{year}</span>
                <span style={{ width: "30px", textAlign: "right", marginRight: "10px" }}>{count}</span>
                <span style={{ color: "#666" }}>{bar}</span>
              </div>
            )
          })}
        </div>
      </div>

      {featuredPosts.length > 0 && (
        <div style={{ 
          marginTop: rhythm(2), 
          padding: "20px", 
          backgroundColor: "#f9f9f9", 
          borderRadius: "8px"
        }}>
          <h2 style={{ marginBottom: rhythm(0.5), fontSize: "1.5rem" }}>⭐ Featured Posts</h2>
          <ul style={{ marginLeft: "20px" }}>
            {featuredPosts.map((post, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                <strong>{post.title}</strong> - {post.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  )
}

export default StatsIndex 