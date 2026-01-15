import React from "react"
import { Link } from "gatsby"

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
    icon: "📄"
  },
  { 
    href: "https://www.linkedin.com/in/vinitatlinkedin/", 
    label: "LinkedIn", 
    className: "nav-link--linkedin",
    icon: null
  },
  { 
    href: "https://x.com/intent/user?screen_name=vinitkme", 
    label: "Twitter", 
    className: "nav-link--twitter",
    icon: null
  },
  { 
    href: "https://github.com/vinitkumar", 
    label: "GitHub", 
    className: "nav-link--github",
    icon: null
  },
]

/**
 * Shared Navigation component used across all layouts
 * Uses CSS classes from global.css for consistent styling
 */
const Navigation = () => {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      {/* Site Pages Group */}
      <span className="nav-group-label">Pages</span>
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
      
      {/* Visual Separator */}
      <span className="nav-separator" aria-hidden="true" />
      
      {/* External Links Group */}
      <span className="nav-group-label">Connect</span>
      {externalLinks.map(link => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-link ${link.className}`}
        >
          {link.icon && <span className="nav-icon">{link.icon}</span>}
          {link.label}
        </a>
      ))}
    </nav>
  )
}

export default Navigation
