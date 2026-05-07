import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { getPostTitle, getTopicSlug } from "../utils/content"

const formatNumber = (value) => value.toLocaleString("en-US")

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

const getEra = (year) => {
  if (year <= 2015) return "Early Craft"
  if (year <= 2018) return "Full-Stack Growth"
  if (year <= 2021) return "Systems & Leadership"
  if (year <= 2024) return "Principal Engineer"
  return "Open Source & AI"
}

const StatsIndex = (props) => {
  const data = useStaticQuery(graphql`
    query StatsQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
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
              collection
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
  const posts = data.allMarkdownRemark.edges.map(({ node }) => node)
  const blogPosts = posts.filter((post) => post.fields.collection !== "til")
  const tilPosts = posts.filter((post) => post.fields.collection === "til")

  const totals = posts.reduce(
    (acc, post) => {
      const words = post.wordCount?.words || 0
      acc.words += words
      acc.readTime += post.timeToRead || 0
      if (post.frontmatter.featured) acc.featured += 1
      return acc
    },
    { words: 0, readTime: 0, featured: 0 }
  )

  const postsByYear = posts.reduce((acc, post) => {
    if (!post.frontmatter.date) return acc
    const year = new Date(post.frontmatter.date).getFullYear()
    acc[year] = (acc[year] || 0) + 1
    return acc
  }, {})

  const tagCounts = posts.reduce((acc, post) => {
    ;(post.frontmatter.tags || []).forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {})

  const sortedYears = Object.entries(postsByYear)
    .map(([year, count]) => ({
      year: Number(year),
      count,
      era: getEra(Number(year)),
    }))
    .sort((a, b) => a.year - b.year)

  const maxYearCount = Math.max(...sortedYears.map((entry) => entry.count))
  const startYear = sortedYears[0]?.year
  const endYear = sortedYears[sortedYears.length - 1]?.year
  const writingYears = startYear && endYear ? endYear - startYear + 1 : 0

  const topTopics = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)

  const longestPosts = [...blogPosts]
    .sort((a, b) => (b.wordCount?.words || 0) - (a.wordCount?.words || 0))
    .slice(0, 5)

  const featuredPosts = blogPosts
    .filter((post) => post.frontmatter.featured)
    .slice(0, 6)

  const mostActiveYear = [...sortedYears].sort((a, b) => b.count - a.count)[0]
  const avgWordsPerPost = Math.round(totals.words / posts.length)
  const avgReadTime = Math.round(totals.readTime / posts.length)
  const readingHours = Math.round(totals.readTime / 60)

  const metrics = [
    { label: "Published pieces", value: formatNumber(posts.length) },
    { label: "Essays", value: formatNumber(blogPosts.length) },
    { label: "TIL notes", value: formatNumber(tilPosts.length) },
    { label: "Total words", value: formatNumber(totals.words) },
    { label: "Reading hours", value: `${readingHours}h` },
    { label: "Featured posts", value: formatNumber(totals.featured) },
  ]

  return (
    <Layout location={props.location} title={title}>
      <div className="stats-page">
        <header className="stats-hero">
          <p className="eyebrow">Writing Stats</p>
          <h1>The archive as a map of long-running technical taste.</h1>
          <p>
            A quantitative view of the site: publishing cadence, topic weight,
            long-form depth, and the themes that keep showing up over time.
          </p>
        </header>

        <section className="stats-metrics" aria-label="Writing summary">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section className="stats-split">
          <div className="stats-panel stats-panel-large">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Cadence</p>
                <h2>Posts by year</h2>
              </div>
              <span className="stats-note">
                {writingYears} years · peak {mostActiveYear?.year}
              </span>
            </div>
            <div className="year-bars">
              {sortedYears.map((entry) => (
                <div className="year-bar-row" key={entry.year}>
                  <span>{entry.year}</span>
                  <div className="year-bar-track">
                    <div
                      className="year-bar-fill"
                      style={{
                        width: `${(entry.count / maxYearCount) * 100}%`,
                      }}
                    />
                  </div>
                  <strong>{entry.count}</strong>
                </div>
              ))}
            </div>
          </div>

          <aside className="stats-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Quick Read</p>
                <h2>Signals</h2>
              </div>
            </div>
            <dl className="stats-facts">
              <div>
                <dt>Most active year</dt>
                <dd>
                  {mostActiveYear?.year} with {mostActiveYear?.count} posts
                </dd>
              </div>
              <div>
                <dt>Average length</dt>
                <dd>{formatNumber(avgWordsPerPost)} words per piece</dd>
              </div>
              <div>
                <dt>Average read</dt>
                <dd>{avgReadTime} minutes</dd>
              </div>
              <div>
                <dt>Current era</dt>
                <dd>{getEra(endYear)}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="stats-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Themes</p>
              <h2>Most written about topics</h2>
            </div>
          </div>
          <div className="topic-cloud stats-topic-cloud">
            {topTopics.map(([tag, count]) => (
              <Link key={tag} to={getTopicSlug(tag)} className="topic-pill">
                {tag}
                <span>{count}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="stats-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Timeline</p>
              <h2>Writing eras</h2>
            </div>
          </div>
          <div className="era-grid">
            {sortedYears.map((entry) => (
              <div className="era-card" key={entry.year}>
                <span>{entry.year}</span>
                <strong>{entry.era}</strong>
                <p>
                  {entry.count} post{entry.count === 1 ? "" : "s"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-split">
          <div className="stats-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Depth</p>
                <h2>Longest essays</h2>
              </div>
            </div>
            <div className="compact-post-list">
              {longestPosts.map((post) => (
                <Link
                  key={post.fields.slug}
                  to={post.fields.slug}
                  className="compact-post-link"
                >
                  <span>{formatNumber(post.wordCount?.words || 0)} words</span>
                  <strong>{getPostTitle(post)}</strong>
                </Link>
              ))}
            </div>
          </div>

          <div className="stats-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Start Here</p>
                <h2>Featured posts</h2>
              </div>
            </div>
            <div className="compact-post-list">
              {featuredPosts.map((post) => (
                <Link
                  key={post.fields.slug}
                  to={post.fields.slug}
                  className="compact-post-link"
                >
                  <span>{formatDate(post.frontmatter.date)}</span>
                  <strong>{getPostTitle(post)}</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default StatsIndex

export const Head = ({ location }) => (
  <Seo
    title="Writing Stats"
    description="A data view of Vinit Kumar's essays, technical notes, topics, writing history, and featured posts."
    pathname={location.pathname}
  />
)
