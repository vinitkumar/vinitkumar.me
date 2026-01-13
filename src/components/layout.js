import React from "react"
import { Link } from "gatsby"
import Navigation from "./Navigation"
import { rhythm, scale } from "../utils/typography"

/**
 * Layout component for inner pages (non-homepage)
 * Uses shared Navigation component for consistent nav across site
 */
const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: `80rem`,
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>
        <h1
          style={{
            ...scale(isRootPath ? 1.2 : 1),
            marginBottom: rhythm(0.5),
            marginTop: 0,
            fontWeight: isRootPath ? 300 : 600,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              fontWeight: isRootPath ? 100 : 600,
              fontSize: `54px`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <Navigation />
      </header>
      
      <main>{children}</main>
      
      <footer
        style={{
          marginTop: rhythm(2),
          fontSize: '0.875rem',
          color: 'var(--gray-text)',
        }}
      >
        © {new Date().getFullYear()}, Vinit Kumar
      </footer>
    </div>
  )
}

export default Layout
