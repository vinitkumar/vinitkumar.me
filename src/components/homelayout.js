import React from "react"
import { Link } from "gatsby"
import { Analytics } from "@vercel/analytics/react"
import Navigation from "./Navigation"
import Footer from "./Footer"

/**
 * HomeLayout component for the homepage
 * Uses shared Navigation component for consistent nav across site
 */
const HomeLayout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="site-shell">
      <header className="site-header">
        <h1 className="site-title">
          <Link to={`/`}>{title}</Link>
        </h1>
        {isRootPath && <Navigation />}
      </header>

      <main>{children}</main>

      <Analytics />

      <Footer />
    </div>
  )
}

export default HomeLayout
