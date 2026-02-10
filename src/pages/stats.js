import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const StatsIndex = (props) => {
  const data = useStaticQuery(graphql`
    query StatsQuery {
      site {
        siteMetadata {
          title
        }
      }
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
              tags
              description
            }
            fields {
              slug
            }
            excerpt
            wordCount {
              words
            }
            timeToRead
          }
        }
      }
    }
  `)
  
  const { title } = data.site.siteMetadata
  
  // Enhanced analytics
  const posts = data.allMarkdownRemark.edges
  const yearStats = {}
  const monthStats = {}
  const tagStats = {}
  const featuredPosts = []
  let totalPosts = 0
  let totalWords = 0
  let totalReadTime = 0
  const postLengths = []
  const writingStreak = {}
  
  // Career milestones and themes
  const careerMilestones = {
    2013: "Started professional career at Changer",
    2015: "First blog about coding passion",
    2018: "Leadership and architecture reflections", 
    2019: "Infrastructure and tooling focus",
    2021: "Mentoring and growth themes emerge",
    2024: "Principal Engineer role, career transition",
    2025: "Django CMS Fellow, 57 OSS PRs, ecosystem modernization"
  }

  const techEvolution = {
    "Early Years (2013-2015)": ["JavaScript", "Python", "Django"],
    "Growth Phase (2016-2018)": ["React", "DevOps", "Leadership"],
    "Expertise Era (2019-2021)": ["Go", "Infrastructure", "Mentoring"],
    "Principal Phase (2022-2024)": ["TypeScript", "Architecture", "Strategy"],
    "Current (2025+)": ["Go Internals", "System Design", "AI Workflows"]
  }

  const interestingTrivia = [
    "🚀 Started coding at age 10 with IBM PC and LOGO",
    "🎸 Learned guitar alongside his kid in 2024",
    "🚶‍♂️ Walks 5-6km daily as part of work-life balance",
    "📚 From college affordability to music lessons — full circle",
    "🔧 Advocates for minimalist tooling — Vim over bloated IDEs",
    "🌍 Has worked across 3+ time zones seamlessly",
    "📖 13-year journey from startup employee to Principal Engineer",
    "🎯 Influenced millions through multi-tenant CMS serving 3k+ websites",
    "💡 Contributed 57 PRs and reviewed 139 PRs in 2025 alone",
    "🧠 Mentors developers and shapes open source ecosystem roadmap"
  ]

  posts.forEach(({ node }) => {
    totalPosts++
    const date = node.frontmatter.date
    const featured = node.frontmatter.featured
    const tags = node.frontmatter.tags || []
    const words = node.wordCount?.words || 0
    const readTime = node.timeToRead || 0
    
    totalWords += words
    totalReadTime += readTime
    postLengths.push(words)

    if (date) {
      const dateObj = new Date(date)
      const year = dateObj.getFullYear()
      const month = dateObj.toLocaleString('default', { month: 'long' })
      
      yearStats[year] = (yearStats[year] || 0) + 1
      monthStats[month] = (monthStats[month] || 0) + 1
      writingStreak[year] = (writingStreak[year] || []).concat(month)
    }

    // Process tags
    if (Array.isArray(tags)) {
      tags.forEach(tag => {
        if (tag) {
          tagStats[tag] = (tagStats[tag] || 0) + 1
        }
      })
    }

    if (featured) {
      featuredPosts.push({
        title: node.frontmatter.title,
        date: date,
        slug: node.fields.slug
      })
    }
  })

  const years = Object.keys(yearStats).sort((a, b) => b - a)
  const mostActiveYear = Object.keys(yearStats).reduce((a, b) => yearStats[a] > yearStats[b] ? a : b)
  const avgWordsPerPost = Math.round(totalWords / totalPosts)
  const longestPost = Math.max(...postLengths)
  const shortestPost = Math.min(...postLengths)
  
  const topTags = Object.entries(tagStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  const mostProductiveMonth = Object.entries(monthStats)
    .sort((a, b) => b[1] - a[1])[0]

  const writingPeriodYears = Math.max(...years) - Math.min(...years) + 1
  const avgPostsPerYear = Math.round(totalPosts / writingPeriodYears)
  const hoursOfContent = Math.round(totalReadTime / 60)

  return (
    <Layout location={props.location} title={title}>
      <Seo title="Blog Analytics & Insights" />
      
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1>📊 Blog Analytics & Insights</h1>
        <p style={{ fontSize: "1.1rem", color: "#666", margin: 0 }}>
          A deep dive into {writingPeriodYears} years of writing, learning, and professional growth
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        {[
          { label: "Total Posts", value: totalPosts, icon: "📝" },
          { label: "Total Words", value: totalWords.toLocaleString(), icon: "📖" },
          { label: "Reading Time", value: `${hoursOfContent}h`, icon: "⏱️" },
          { label: "Avg Words/Post", value: avgWordsPerPost, icon: "📄" },
          { label: "Writing Years", value: writingPeriodYears, icon: "📅" },
          { label: "Posts/Year", value: avgPostsPerYear, icon: "📈" }
        ].map((stat, index) => (
          <div key={index} style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#2d3748" }}>{stat.value}</div>
            <div style={{ fontSize: "0.9rem", color: "#718096" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Career Journey */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        padding: "2rem",
        marginBottom: "2rem",
        color: "white"
      }}>
        <h2 style={{ color: "white" }}>🚀 Career Evolution Through Writing</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem"
        }}>
          {Object.entries(careerMilestones).map(([year, milestone]) => (
            <div key={year} style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "1rem",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>{year}</div>
              <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>{milestone}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interesting Trivia */}
      <div style={{
        background: "#f7fafc",
        borderRadius: "12px",
        padding: "2rem",
        marginBottom: "2rem",
        border: "1px solid #e2e8f0"
      }}>
        <h2>🎯 Interesting Trivia</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem"
        }}>
          {interestingTrivia.map((trivia, index) => (
            <div key={index} style={{
              background: "white",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "0.95rem"
            }}>
              {trivia}
            </div>
          ))}
        </div>
      </div>

      {/* Writing Patterns */}
      <div style={{ 
        marginBottom: "2rem",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "2rem"
      }}>
        {/* Posts by Year */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e2e8f0"
        }}>
          <h2>📈 Posts by Year</h2>
          <div style={{ fontFamily: "monospace", fontSize: "14px", lineHeight: "1.8" }}>
            {years.map(year => {
              const count = yearStats[year]
              const barLength = Math.round((count / Math.max(...Object.values(yearStats))) * 25)
              const bar = "█".repeat(barLength)
              const milestone = careerMilestones[year]
              return (
                <div key={year} style={{ marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ width: "60px", textAlign: "right", marginRight: "15px", fontWeight: "600" }}>
                      {year}
                    </span>
                    <span style={{ width: "40px", textAlign: "right", marginRight: "15px" }}>
                      {count}
                    </span>
                    <span style={{ color: "#4299e1", marginRight: "10px" }}>{bar}</span>
                  </div>
                  {milestone && (
                    <div style={{ 
                      fontSize: "12px", 
                      color: "#718096", 
                      marginLeft: "115px",
                      fontStyle: "italic"
                    }}>
                      {milestone}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Insights */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e2e8f0"
        }}>
          <h2>💡 Quick Insights</h2>
          <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            <div style={{ marginBottom: "1rem" }}>
              <strong>🔥 Most Active:</strong><br/>
              {mostActiveYear} ({yearStats[mostActiveYear]} posts)
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>📅 Productive Month:</strong><br/>
              {mostProductiveMonth?.[0]} ({mostProductiveMonth?.[1]} posts)
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>📏 Post Lengths:</strong><br/>
              {shortestPost} - {longestPost} words
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>⚡ Total Reading:</strong><br/>
              {hoursOfContent} hours of content
            </div>
          </div>
        </div>
      </div>

      {/* Technology Evolution */}
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        marginBottom: "2rem"
      }}>
        <h2>🛠️ Technology Evolution Journey</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}>
          {Object.entries(techEvolution).map(([period, techs]) => (
            <div key={period} style={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "1.5rem"
            }}>
              <h3 style={{ color: "#2d3748" }}>{period}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {techs.map(tech => (
                  <span key={tech} style={{
                    background: "#edf2f7",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    color: "#4a5568"
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tags */}
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        marginBottom: "2rem"
      }}>
        <h2>🏷️ Most Written About Topics</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {topTags.map(([tag, count]) => (
            <span key={tag} style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
              fontSize: "0.9rem",
              fontWeight: "500"
            }}>
              {tag} ({count})
            </span>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e2e8f0"
        }}>
          <h2>⭐ Featured Posts</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem"
          }}>
            {featuredPosts.map((post, index) => (
              <div key={index} style={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "1.5rem",
                background: "#fafafa"
              }}>
                <h3 style={{ color: "#2d3748" }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#718096", margin: 0 }}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default StatsIndex
