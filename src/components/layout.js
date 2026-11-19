import React from "react"
import { Link } from "gatsby"
import Navigation from "./Navigation"
import Footer from "./Footer"
import { getLocale, getLocalizedPath } from "../utils/i18n"

/**
 * Layout component for inner pages (non-homepage)
 * Uses shared Navigation component for consistent nav across site
 */
const Layout = ({ location, title, children }) => {
  const locale = getLocale(location.pathname)

  return (
    <div className="site-shell">
      <header className="site-header">
        {/* A paragraph, not a heading: each inner page has its own h1. */}
        <p className="site-title">
          <Link to={getLocalizedPath("/", locale)}>{title}</Link>
        </p>
        <Navigation locale={locale} pathname={location.pathname} />
      </header>

      <main>{children}</main>

      <Footer locale={locale} />
    </div>
  )
}

export default Layout
