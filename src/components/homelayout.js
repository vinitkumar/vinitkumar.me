import React from "react"
import { Link } from "gatsby"
import { Analytics } from '@vercel/analytics/react'
import Navigation from "./Navigation"
import Footer from "./Footer"
import { rhythm, scale } from "../utils/typography"

/**
 * HomeLayout component for the homepage
 * Uses shared Navigation component for consistent nav across site
 */
const HomeLayout = ({ location, title, children }) => {
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
            ...scale(1.5),
            marginBottom: rhythm(0.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              fontWeight: 100,
              fontSize: `54px`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
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
