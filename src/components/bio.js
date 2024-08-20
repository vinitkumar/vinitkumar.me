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
        display: `block`,
        textDecoration: `none`,
        marginBottom: rhythm(1),
        marginTop: rhythm(1.5),
      }}
    >
      <p style={{
        width: `100%`,
      }}>
        I’m a <Link to="/about">Software Engineer</Link> passionate about solving problems and pushing tech boundaries. When I’m not coding, I enjoy reading, listening to music, appreciating art, and having a good cup of coffee. Check out my <a href="https://vinitkumar.github.io/vinitkumar.pdf" target="_blank" rel="noopener noreferrer">latest resume</a> and <a target="_blank" rel="noopener noreferrer" href="https://github.com/vinitkumar">Github profile</a>, and I hope you enjoy reading my essays.
      </p>
      <p style={{
        width: `100%`,
      }}>
        You can also connect with me on Twitter: <a href="https://twitter.com/vinitkme" target="_blank" rel="noopener noreferrer">@vinitkme.</a>
      </p>
    </div>
  )
}

export default Bio
