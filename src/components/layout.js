import React from "react"
import { Link } from "gatsby"
import Navigation from "./Navigation"
import Footer from "./Footer"

/**
 * Layout component for inner pages (non-homepage)
 * Uses shared Navigation component for consistent nav across site
 */
const Layout = ({ location, title, children }) => {
  return (
    <div className="site-shell">
      <header className="site-header">
        <h1 className="site-title">
          <Link to={`/`}>{title}</Link>
        </h1>
        <Navigation />
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
