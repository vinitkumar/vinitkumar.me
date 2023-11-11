/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

const Bio = () => {
  return (
    <div
      style={{
        display: `flex`,
        textDecoration: `none`,
        marginBottom: rhythm(1),
        marginTop: rhythm(1.5),
      }}
    >
      <p style={{
        width: `100%`,
      }}>
          I'm a <Link to="/about">Software Engineer</Link> who enjoys solving problems and pushing the boundaries of tech. When I'm not coding, you'll find me immersed in good books, music, art, and a cup of coffee. Personally, these <Link to="/values">values</Link> matters to me. Here are links to my <a href="https://vinitkumar.github.io/vinit-kumar.pdf" target="_blank" rel="noopener noreferrer">resume</a> and <a target="_blank" rel="noopener noreferrer" href="https://github.com/vinitkumar">github</a>. I hope you enjoy my writing here.
      </p>
    </div>
  )
}

export default Bio
