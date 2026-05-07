import React from "react"
import { Link } from "gatsby"
import ThemeToggle from "./ThemeToggle"

// Navigation link data for easy maintenance
const internalLinks = [
  { to: "/about", label: "About", className: "nav-link--about" },
  { to: "/til", label: "TIL", className: "nav-link--til" },
  { to: "/stats", label: "Stats", className: "nav-link--stats" },
  { to: "/recommendations", label: "Recs", className: "nav-link--recommendations" },
]

const externalLinks = [
  { 
    href: "https://vinitkumar.github.io/vinitkumar.pdf", 
    label: "Resume", 
    className: "nav-link--resume",
  },
  { 
    href: "https://www.linkedin.com/in/vinitatlinkedin/", 
    label: "LinkedIn", 
    className: "nav-link--linkedin",
  },
  { 
    href: "https://x.com/intent/user?screen_name=vinitkme", 
    label: "Twitter", 
    className: "nav-link--twitter",
  },
  { 
    href: "https://github.com/vinitkumar", 
    label: "GitHub", 
    className: "nav-link--github",
  },
]

/**
 * Shared Navigation component used across all layouts
 * Uses CSS classes from global.css for consistent styling
 */
const Navigation = () => {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      {internalLinks.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`nav-link ${link.className}`}
          activeClassName="nav-link--active"
        >
          {link.label}
        </Link>
      ))}
      
      <span className="nav-separator" aria-hidden="true" />
      
      {externalLinks.map(link => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-link ${link.className}`}
        >
          {link.label}
        </a>
      ))}
      
      <span className="nav-separator" aria-hidden="true" />
      <ThemeToggle compact />
    </nav>
  )
}

export default Navigation
