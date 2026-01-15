import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"

const Search = ({ posts }) => {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = posts.filter(({ node }) => {
      const title = node.frontmatter.title?.toLowerCase() || ""
      const description = node.frontmatter.description?.toLowerCase() || ""
      const excerpt = node.excerpt?.toLowerCase() || ""
      
      return (
        title.includes(searchQuery) ||
        description.includes(searchQuery) ||
        excerpt.includes(searchQuery)
      )
    }).slice(0, 8)

    setResults(filtered)
  }, [query, posts])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        setQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div className="search-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="search-input"
          aria-label="Search posts"
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
        <div className="search-results">
          {results.length > 0 ? (
            <>
              <div className="search-results-header">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </div>
              {results.map(({ node }) => (
                <Link
                  key={node.fields.slug}
                  to={node.fields.slug}
                  className="search-result-item"
                  onClick={handleResultClick}
                >
                  <div className="search-result-title">
                    {node.frontmatter.title}
                    {node.frontmatter.featured && (
                      <span className="search-result-featured">⭐</span>
                    )}
                  </div>
                  <div className="search-result-date">
                    {node.frontmatter.date}
                  </div>
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
