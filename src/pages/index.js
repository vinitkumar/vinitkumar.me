import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"

import HomeLayout from "../components/homelayout"
import Seo from "../components/seo"
import Search from "../components/Search"
import Pagination from "../components/Pagination"
import { getPostTitle, getTopicSlug, normalizeTags } from "../utils/content"
import { getLocale } from "../utils/i18n"

const POSTS_PER_PAGE = 5

const homeCopy = {
  en: {
    allPosts: (count) => `All Posts (${count})`,
    allTil: "All TIL",
    eyebrow: "Principal Engineer · Django CMS Fellow",
    explore: "Explore",
    featured: "Featured",
    featuredDescription: "Showing my most valuable and impactful writing",
    featuredPosts: (count) => `Featured Posts (${count})`,
    featuredWriting: "Featured Writing",
    intro:
      "Writing about robust systems, open source, tools, AI workflows, and engineering craft.",
    noFeatured: "No featured posts found.",
    originalLanguage: null,
    shortNotes: "Short Notes",
    showAll: "Show All Posts",
    showFeatured: "Show Featured Only",
    startHere: "Start Here",
    summary: (start, end, total, featured) =>
      `Showing ${start}–${end} of ${total} posts • ${featured} featured`,
    til: "Today I Learned",
    topics: "Topics",
    translationNote: null,
    viewAll: "View all",
  },
  ja: {
    allPosts: (count) => `すべての記事 (${count})`,
    allTil: "TILをすべて見る",
    eyebrow: "プリンシパルエンジニア · Django CMS フェロー",
    explore: "探す",
    featured: "注目",
    featuredDescription: "特に価値が高く、影響力のある記事を表示しています",
    featuredPosts: (count) => `注目の記事 (${count})`,
    featuredWriting: "注目の記事",
    intro:
      "堅牢なシステム、オープンソース、開発ツール、AIを活用したワークフロー、そしてエンジニアリングの技術について書いています。",
    noFeatured: "注目の記事はまだありません。",
    originalLanguage: "英語",
    shortNotes: "短いメモ",
    showAll: "すべての記事を表示",
    showFeatured: "注目の記事のみ表示",
    startHere: "はじめに",
    summary: (start, end, total, featured) =>
      `${total}件中${start}–${end}件を表示 • 注目記事${featured}件`,
    til: "今日学んだこと",
    topics: "トピック",
    translationNote:
      "サイトの案内は日本語に翻訳されています。記事本文は原文の英語で掲載しています。",
    viewAll: "すべて見る",
  },
}

const BlogIndex = ({
  data,
  location,
  locale = getLocale(location.pathname),
}) => {
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const siteTitle = data.site.siteMetadata.title
  const allPosts = data.allMarkdownRemark.edges
  const tilPosts = data.allTil.edges
  const copy = homeCopy[locale]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const featuredFilter = urlParams.get("featured")
      const pageParam = urlParams.get("page")

      if (featuredFilter === "true") {
        setShowFeaturedOnly(true)
      }
      if (pageParam) {
        const page = parseInt(pageParam, 10)
        if (!isNaN(page) && page > 0) {
          setCurrentPage(page)
        }
      }
    }
  }, [])

  const updateURL = (featured, page) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location)
      if (featured) {
        url.searchParams.set("featured", "true")
      } else {
        url.searchParams.delete("featured")
      }
      if (page > 1) {
        url.searchParams.set("page", page.toString())
      } else {
        url.searchParams.delete("page")
      }
      window.history.pushState({}, "", url)
    }
  }

  const toggleFeaturedFilter = () => {
    const newShowFeaturedOnly = !showFeaturedOnly
    setShowFeaturedOnly(newShowFeaturedOnly)
    setCurrentPage(1)
    updateURL(newShowFeaturedOnly, 1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    updateURL(showFeaturedOnly, page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredPosts = showFeaturedOnly
    ? allPosts.filter(({ node }) => node.frontmatter.featured)
    : allPosts

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  )

  const featuredCount = allPosts.filter(
    ({ node }) => node.frontmatter.featured
  ).length
  const featuredPosts = allPosts
    .filter(({ node }) => node.frontmatter.featured)
    .slice(0, 4)
  const topicCounts = allPosts.reduce((counts, { node }) => {
    normalizeTags(node.frontmatter.tags).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1
    })
    return counts
  }, {})
  const topTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return (
    <HomeLayout location={location} title={siteTitle}>
      <section className="home-intro">
        <div className="home-intro-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <p>{copy.intro}</p>
          {copy.translationNote && <p>{copy.translationNote}</p>}
        </div>
        <div className="home-intro-actions">
          <a href="/rss.xml" className="text-action">
            RSS
          </a>
        </div>
      </section>

      <Search locale={locale} posts={allPosts} />

      <section className="home-section writing-index">
        <div className="filter-controls">
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "1.5rem",
                color: "var(--text)",
                marginBottom: "0.25rem",
              }}
            >
              {showFeaturedOnly ? (
                <>{copy.featuredPosts(featuredCount)}</>
              ) : (
                <>{copy.allPosts(allPosts.length)}</>
              )}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "1.1rem",
                color: "var(--text-muted)",
              }}
            >
              {showFeaturedOnly
                ? copy.featuredDescription
                : copy.summary(
                    startIndex + 1,
                    Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length),
                    filteredPosts.length,
                    featuredCount
                  )}
            </p>
          </div>

          <button
            onClick={toggleFeaturedFilter}
            className={`filter-btn ${showFeaturedOnly ? "filter-btn--active" : ""}`}
          >
            {showFeaturedOnly ? copy.showAll : copy.showFeatured}
          </button>
        </div>

        <div className="blog-posts-list">
          {paginatedPosts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const excerpt = node.frontmatter.description || node.excerpt
            return (
              <Link
                key={node.fields.slug}
                to={node.fields.slug}
                className="blog-post-row"
              >
                <div className="blog-post-row-header">
                  <div className="blog-post-row-meta">
                    {node.frontmatter.featured && (
                      <span
                        className="blog-post-row-featured"
                        title={copy.featured}
                      >
                        {copy.featured}
                      </span>
                    )}
                    {copy.originalLanguage && (
                      <span className="blog-post-row-featured">
                        {copy.originalLanguage}
                      </span>
                    )}
                    <h2
                      className="blog-post-row-title"
                      lang={locale === "ja" ? "en" : undefined}
                    >
                      {title}
                    </h2>
                  </div>
                  <span className="blog-post-row-arrow">→</span>
                </div>
                <span className="blog-post-row-date">
                  {node.frontmatter.date}
                </span>
                <p
                  className="blog-post-row-excerpt"
                  lang={locale === "ja" ? "en" : undefined}
                >
                  {excerpt}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          locale={locale}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* No posts message for featured filter */}
        {showFeaturedOnly && paginatedPosts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "var(--text-muted)",
            }}
          >
            <p style={{ fontSize: "1.1rem" }}>{copy.noFeatured}</p>
          </div>
        )}
      </section>

      <section className="home-section discovery-strip">
        {featuredPosts.length > 0 && (
          <div className="discovery-panel start-here-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{copy.startHere}</p>
                <h2>{copy.featuredWriting}</h2>
              </div>
              <button
                onClick={() => {
                  setShowFeaturedOnly(true)
                  setCurrentPage(1)
                  updateURL(true, 1)
                }}
                className="text-button"
              >
                {copy.viewAll}
              </button>
            </div>
            <div className="compact-post-list">
              {featuredPosts.map(({ node }) => (
                <Link
                  key={node.fields.slug}
                  to={node.fields.slug}
                  className="compact-post-link"
                >
                  <span>{node.frontmatter.date}</span>
                  <strong lang={locale === "ja" ? "en" : undefined}>
                    {getPostTitle(node)}
                  </strong>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="discovery-panel topics-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.explore}</p>
              <h2>{copy.topics}</h2>
            </div>
          </div>
          <div className="topic-cloud">
            {topTopics.map(([tag, count]) => (
              <Link key={tag} to={getTopicSlug(tag)} className="topic-pill">
                {tag}
                <span>{count}</span>
              </Link>
            ))}
          </div>
        </div>

        {tilPosts.length > 0 && (
          <div className="discovery-panel til-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{copy.til}</p>
                <h2>{copy.shortNotes}</h2>
              </div>
              <Link to="/til" className="text-action">
                {copy.allTil}
              </Link>
            </div>
            <div className="compact-post-list">
              {tilPosts.map(({ node }) => (
                <Link
                  key={node.fields.slug}
                  to={node.fields.slug}
                  className="compact-post-link"
                >
                  <span>{node.frontmatter.date}</span>
                  <strong lang={locale === "ja" ? "en" : undefined}>
                    {getPostTitle(node)}
                  </strong>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </HomeLayout>
  )
}

export default BlogIndex

export const Head = ({ location }) => {
  const locale = getLocale(location.pathname)

  return (
    <Seo
      title={locale === "ja" ? "ホーム" : "Home"}
      description={
        locale === "ja"
          ? "Vinit Kumarの日本語サイト。堅牢なシステム、オープンソース、開発ツール、AIワークフローについて紹介します。"
          : undefined
      }
      lang={locale}
      pathname={location.pathname}
      meta={[
        {
          name: "google-site-verification",
          content: "aAxhI-I1HmxoEa86D9zHsMBtY7sfAVgyX_HfqMSSCCI",
        },
        {
          name: "msvalidate.01",
          content: "9BD6B4DCA2B9F88A132B7DDCA1578919",
        },
        {
          name: "fediverse:creator",
          content: "@vinitkme@fosstodon.org",
        },
      ]}
    />
  )
}

export const pageQuery = graphql`
  {
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
