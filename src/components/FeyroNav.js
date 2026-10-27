import React from "react"
import { Link } from "gatsby"
import { pages } from "../data/feyro"

/**
 * Secondary navigation shared by the Feyro product pages. Gatsby's Link sets
 * aria-current="page" on the active entry, which the CSS uses to highlight it.
 */
const FeyroNav = () => (
  <nav className="feyro-subnav" aria-label="Feyro pages">
    {pages.map((page) => (
      <Link key={page.to} to={page.to}>
        {page.label}
      </Link>
    ))}
  </nav>
)

export default FeyroNav
