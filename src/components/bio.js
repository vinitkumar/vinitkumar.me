/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/vinit_kumar.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  const twitterUrl = `https://twitter.com/${social.twitter}`
  return (
    <div
      style={{
        display: `flex`,
        textDecoration: `none`,
        marginBottom: rhythm(2.5),
      }}
    >
      <p style={{
        width: `100%`,
      }}>
        I am a software engineer who loves making computers do things and admires good books, music, art
    and coffee.
        You can read more <Link to="/about">about</Link> me.
        Find my
        {` `}
        <a href="https://vinitkumar.github.io/vinit_kumar.pdf"
          style={{
            textDecoration: `none`,
          }}

    >
         resume
        </a>,
        {` `}
        <a href="/values"
          style={{
            textDecoration: `none`,
          }}
        >
          values
        </a>
        {` `}
        and
        {` `}
        <a href="https://github.com/vinitkumar"
          style={{
            textDecoration: `none`,
          }}
        >
        code
        </a> here.
      </p>
    </div>
  )
}

export default Bio
