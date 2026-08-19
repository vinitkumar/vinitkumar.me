import React from "react"
import { Link } from "gatsby"
import { Analytics } from "@vercel/analytics/react"
import Navigation from "./Navigation"
import Footer from "./Footer"
import { getLocale, getLocalizedPath } from "../utils/i18n"

/**
 * HomeLayout component for the homepage
 * Uses shared Navigation component for consistent nav across site
 */
const HomeLayout = ({ location, title, children }) => {
  const locale = getLocale(location.pathname)
  const rootPath = getLocalizedPath("/", locale)
  const isRootPath = location.pathname === rootPath

  return (
    <div className="site-shell">
      <header className="site-header">
        <h1 className="site-title">
          <Link to={getLocalizedPath("/", locale)}>{title}</Link>
        </h1>
        {isRootPath && (
          <Navigation locale={locale} pathname={location.pathname} />
        )}
      </header>

      <main>{children}</main>

      <Analytics />

      <Footer locale={locale} />
    </div>
  )
}

export default HomeLayout
