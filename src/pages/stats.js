import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { getPostTitle, getTopicSlug } from "../utils/content"
import { getLanguageAlternates, getLocale } from "../utils/i18n"

const formatNumber = (value, locale) =>
  value.toLocaleString(locale === "ja" ? "ja-JP" : "en-US")

const formatDate = (date, locale) =>
  new Date(date).toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

const getEra = (year, locale) => {
  if (locale === "ja") {
    if (year <= 2015) return "基礎を磨く"
    if (year <= 2018) return "フルスタックの成長"
    if (year <= 2021) return "システムとリーダーシップ"
    if (year <= 2024) return "プリンシパルエンジニア"
    return "オープンソースとAI"
  }

  if (year <= 2015) return "Early Craft"
  if (year <= 2018) return "Full-Stack Growth"
  if (year <= 2021) return "Systems & Leadership"
  if (year <= 2024) return "Principal Engineer"
  return "Open Source & AI"
}

const statsCopy = {
  en: {
    ariaLabel: "Writing summary",
    averageLength: "Average length",
    averageRead: "Average read",
    cadence: "Cadence",
    currentEra: "Current era",
    depth: "Depth",
    essays: "Essays",
    featuredPosts: "Featured posts",
    heroEyebrow: "Writing Stats",
    heroText:
      "A quantitative view of the site: publishing cadence, topic weight, long-form depth, and the themes that keep showing up over time.",
    heroTitle: "The archive as a map of long-running technical taste.",
    longestEssays: "Longest essays",
    mostActiveYear: "Most active year",
    posts: (count) => `${count} post${count === 1 ? "" : "s"}`,
    postsByYear: "Posts by year",
    publishedPieces: "Published pieces",
    quickRead: "Quick Read",
    readingHours: "Reading hours",
    signals: "Signals",
    startHere: "Start Here",
    themes: "Themes",
    tilNotes: "TIL notes",
    timeline: "Timeline",
    topTopics: "Most written about topics",
    totalWords: "Total words",
    words: (count) => `${count} words`,
    wordsPerPiece: (count) => `${count} words per piece`,
    minutes: (count) => `${count} minutes`,
    yearsPeak: (years, peak) => `${years} years · peak ${peak}`,
    activeYear: (year, count) => `${year} with ${count} posts`,
    writingEras: "Writing eras",
  },
  ja: {
    ariaLabel: "執筆統計の概要",
    averageLength: "平均の長さ",
    averageRead: "平均読了時間",
    cadence: "公開ペース",
    currentEra: "現在の時期",
    depth: "深さ",
    essays: "エッセイ",
    featuredPosts: "注目の記事",
    heroEyebrow: "執筆統計",
    heroText:
      "公開ペース、トピックの比重、長文記事の深さ、そして長年にわたり繰り返し現れるテーマから、このサイトを数字で眺めます。",
    heroTitle: "長年にわたる技術的な関心を、アーカイブから読み解く。",
    longestEssays: "最も長いエッセイ",
    mostActiveYear: "最も活発な年",
    posts: (count) => `${count}件の記事`,
    postsByYear: "年別の記事数",
    publishedPieces: "公開コンテンツ",
    quickRead: "概要",
    readingHours: "読了時間",
    signals: "主な数字",
    startHere: "はじめに",
    themes: "テーマ",
    tilNotes: "TILメモ",
    timeline: "年表",
    topTopics: "最も多く書いたトピック",
    totalWords: "総単語数",
    words: (count) => `${count}語`,
    wordsPerPiece: (count) => `1件あたり${count}語`,
    minutes: (count) => `${count}分`,
    yearsPeak: (years, peak) => `${years}年間 · 最多 ${peak}年`,
    activeYear: (year, count) => `${year}年、${count}件`,
    writingEras: "執筆の時期",
  },
}

const StatsIndex = (props) => {
  const locale = getLocale(props.location.pathname)
  const copy = statsCopy[locale]
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
      era: getEra(Number(year), locale),
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
    { label: copy.publishedPieces, value: formatNumber(posts.length, locale) },
    { label: copy.essays, value: formatNumber(blogPosts.length, locale) },
    { label: copy.tilNotes, value: formatNumber(tilPosts.length, locale) },
    { label: copy.totalWords, value: formatNumber(totals.words, locale) },
    { label: copy.readingHours, value: `${readingHours}h` },
    { label: copy.featuredPosts, value: formatNumber(totals.featured, locale) },
  ]

  return (
    <Layout location={props.location} title={title}>
      <div className="stats-page">
        <header className="stats-hero">
          <p className="eyebrow">{copy.heroEyebrow}</p>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroText}</p>
        </header>

        <section className="stats-metrics" aria-label={copy.ariaLabel}>
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
                <p className="eyebrow">{copy.cadence}</p>
                <h2>{copy.postsByYear}</h2>
              </div>
              <span className="stats-note">
                {copy.yearsPeak(writingYears, mostActiveYear?.year)}
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
                <p className="eyebrow">{copy.quickRead}</p>
                <h2>{copy.signals}</h2>
              </div>
            </div>
            <dl className="stats-facts">
              <div>
                <dt>{copy.mostActiveYear}</dt>
                <dd>
                  {copy.activeYear(mostActiveYear?.year, mostActiveYear?.count)}
                </dd>
              </div>
              <div>
                <dt>{copy.averageLength}</dt>
                <dd>
                  {copy.wordsPerPiece(formatNumber(avgWordsPerPost, locale))}
                </dd>
              </div>
              <div>
                <dt>{copy.averageRead}</dt>
                <dd>{copy.minutes(avgReadTime)}</dd>
              </div>
              <div>
                <dt>{copy.currentEra}</dt>
                <dd>{getEra(endYear, locale)}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="stats-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.themes}</p>
              <h2>{copy.topTopics}</h2>
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
              <p className="eyebrow">{copy.timeline}</p>
              <h2>{copy.writingEras}</h2>
            </div>
          </div>
          <div className="era-grid">
            {sortedYears.map((entry) => (
              <div className="era-card" key={entry.year}>
                <span>{entry.year}</span>
                <strong>{entry.era}</strong>
                <p>{copy.posts(entry.count)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-split">
          <div className="stats-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{copy.depth}</p>
                <h2>{copy.longestEssays}</h2>
              </div>
            </div>
            <div className="compact-post-list">
              {longestPosts.map((post) => (
                <Link
                  key={post.fields.slug}
                  to={post.fields.slug}
                  className="compact-post-link"
                >
                  <span>
                    {copy.words(
                      formatNumber(post.wordCount?.words || 0, locale)
                    )}
                  </span>
                  <strong lang={locale === "ja" ? "en" : undefined}>
                    {getPostTitle(post)}
                  </strong>
                </Link>
              ))}
            </div>
          </div>

          <div className="stats-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{copy.startHere}</p>
                <h2>{copy.featuredPosts}</h2>
              </div>
            </div>
            <div className="compact-post-list">
              {featuredPosts.map((post) => (
                <Link
                  key={post.fields.slug}
                  to={post.fields.slug}
                  className="compact-post-link"
                >
                  <span>{formatDate(post.frontmatter.date, locale)}</span>
                  <strong lang={locale === "ja" ? "en" : undefined}>
                    {getPostTitle(post)}
                  </strong>
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

export const Head = ({ location }) => {
  const locale = getLocale(location.pathname)

  return (
    <Seo
      alternates={getLanguageAlternates(location.pathname)}
      title={locale === "ja" ? "執筆統計" : "Writing Stats"}
      description={
        locale === "ja"
          ? "Vinit Kumarのエッセイ、技術メモ、トピック、執筆履歴、注目記事を数字で紹介します。"
          : "A data view of Vinit Kumar's essays, technical notes, topics, writing history, and featured posts."
      }
      lang={locale}
      pathname={location.pathname}
    />
  )
}
