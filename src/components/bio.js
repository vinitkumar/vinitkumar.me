/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
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
    <div
      className="about_inner"
      style={{
        display: `block`,
        textDecoration: `none`,
        marginBottom: rhythm(1),
        marginTop: rhythm(1),
      }}
    >
      <p>
        I'm a <Link to="/about" className="btn-action-latest">Principal Engineer</Link> at <a className= "btn-action-latest" href="https://scalefusion.com">Scalefusion</a> and <a href="https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/" className="btn-action-latest">Django CMS Fellow</a> passionate
        about solving meaningful problems and pushing tech boundaries. I love reading, listening/playing music, appreciating/making art, and enjoying a good cup of coffee.
      </p>
      <p>
        Here are some  <Link className={"btn-action-latest"} to="/recommendations">recommendations</Link> from my current and past colleagues. You can check out my <a href="https://vinitkumar.github.io/vinitkumar.pdf" target="_blank" className="btn-action-latest" rel="noopener noreferrer">latest resume</a> and <a target="_blank" rel="noopener noreferrer" className="btn-action-latest" href="https://github.com/vinitkumar">Github profile</a>.
        You can connect with me on twitter at <a href="https://x.com/intent/user?screen_name=vinitkme" target="_blank" className="btn-action-latest"
          rel="noopener noreferrer">@vinitkme</a> or drop me an email at<a href="mailto:mail@vinitkumar.me" className="btn-action-latest">mail@vinitkumar.me</a>.
      </p>
      <p>I hope you enjoy reading my essays.</p>

      {/* Blog Statistics Section */}
      <div style={{ marginTop: rhythm(1), padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
        <h3 style={{ marginBottom: rhythm(0.3) }}>📊 Blog Stats</h3>

        <div style={{ marginBottom: "15px", fontSize: "13px", lineHeight: "1.3" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <span>📝 {totalPosts}</span>
            <span>⭐ {featuredPosts.length}</span>
            <span>📅 {years.length}y</span>
            <span>🔥 {mostActiveYear} ({yearStats[mostActiveYear]})</span>
            <span>📈 {Math.min(...years)}-{Math.max(...years)}</span>
          </div>
        </div>

        <div style={{ fontFamily: "monospace", fontSize: "11px", lineHeight: "1.2" }}>
          {years.map(year => {
            const count = yearStats[year]
            const barLength = Math.round((count / Math.max(...Object.values(yearStats))) * 25)
            const bar = "█".repeat(barLength)
            return (
              <div key={year} style={{ marginBottom: "2px", display: "flex" }}>
                <span style={{ width: "40px", textAlign: "right", marginRight: "6px" }}>{year}</span>
                <span style={{ width: "20px", textAlign: "right", marginRight: "6px" }}>{count}</span>
                <span style={{ color: "#0066cc" }}>{bar}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Bio
