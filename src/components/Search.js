import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import {
  getPostDescription,
  getPostTitle,
  normalizeTags,
} from "../utils/content"

const Search = ({ posts }) => {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = posts
      .filter(({ node }) => {
        const title = getPostTitle(node).toLowerCase()
        const description = getPostDescription(node).toLowerCase()
        const excerpt = node.excerpt?.toLowerCase() || ""
        const tags = normalizeTags(node.frontmatter.tags).join(" ")

        return (
          title.includes(searchQuery) ||
          description.includes(searchQuery) ||
          excerpt.includes(searchQuery) ||
          tags.includes(searchQuery)
        )
      })
      .slice(0, 8)

    setResults(filtered)
    setActiveIndex(filtered.length > 0 ? 0 : -1)
  }, [query, posts])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        setQuery("")
      }
    }

    const handleShortcut = (event) => {
      const isSearchShortcut =
        event.key === "/" ||
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")
      if (isSearchShortcut && document.activeElement !== inputRef.current) {
        event.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    document.addEventListener("keydown", handleShortcut)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("keydown", handleShortcut)
    }
  }, [])

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery("")
  }

  const handleKeyDown = (event) => {
    if (!isOpen || results.length === 0) return

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % results.length)
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1))
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault()
      window.location.href = results[activeIndex].node.fields.slug
    }
  }

  return (
    <div className="search-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          /
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className="search-input"
          aria-label="Search posts"
          role="combobox"
          aria-expanded={isOpen && query.length >= 2}
          aria-controls="site-search-results"
          aria-activedescendant={
            activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
          }
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => {
              setQuery("")
              inputRef.current?.focus()
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="search-results" id="site-search-results" role="listbox">
          {results.length > 0 ? (
            <>
              <div className="search-results-header">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </div>
              {results.map(({ node }, index) => (
                <Link
                  key={node.fields.slug}
                  id={`search-result-${index}`}
                  to={node.fields.slug}
                  className={`search-result-item ${index === activeIndex ? "active" : ""}`}
                  onClick={handleResultClick}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <div className="search-result-title">
                    {getPostTitle(node)}
                    {node.frontmatter.featured && (
                      <span className="search-result-featured">Featured</span>
                    )}
                  </div>
                  <div className="search-result-date">
                    {node.frontmatter.date}
                  </div>
                  <p className="search-result-description">
                    {getPostDescription(node)}
                  </p>
                </Link>
              ))}
            </>
          ) : (
            <div className="search-no-results">
              No posts found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
