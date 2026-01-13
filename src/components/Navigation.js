import React from "react"
import { Link } from "gatsby"

/**
 * Shared Navigation component used across all layouts
 * Uses CSS classes from global.css for consistent styling
 */
const Navigation = () => {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      {/* Internal Pages */}
      <Link to="/about" className="nav-link nav-link--about">
        About
      </Link>
      <Link to="/til" className="nav-link nav-link--til">
        TIL
      </Link>
      <Link to="/stats" className="nav-link nav-link--stats">
        Stats
      </Link>
      <Link to="/recommendations" className="nav-link nav-link--recommendations">
        Recommendations
      </Link>
      
      {/* Separator between internal and external links */}
      <span className="nav-separator" aria-hidden="true" />
      
      {/* External Links */}
      <a
        href="https://vinitkumar.github.io/vinitkumar.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link nav-link--resume"
      >
        Resume
      </a>
      <a
        href="https://www.linkedin.com/in/vinitatlinkedin/"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link nav-link--linkedin"
      >
        LinkedIn
      </a>
      <a
        href="https://x.com/vinitkme"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link nav-link--twitter"
      >
        Twitter
      </a>
      <a
        href="https://github.com/vinitkumar"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link nav-link--github"
      >
        GitHub
      </a>
    </nav>
  )
}

export default Navigation
