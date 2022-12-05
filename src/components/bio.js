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
          As a <Link to="/about">Software Engineer</Link> with a passion for creating and problem-solving, I am constantly seeking new challenges and opportunities to push the boundaries of what computers can do. I am an avid admirer of good literature, music, art, and coffee. Explore my website to learn more about my skills, experience, and <Link to="/values">values</Link> as a programmer. Here, you can also find links to my <a href="https://vinitkumar.github.io/vinit-kumar.pdf" style={{textDecoration: `none`,}}>resume</a> and <a href="https://github.com/vinitkumar" style={{textDecoration: `none`,}}>code repositories</a> .
      </p>
    </div>
  )
}

export default Bio
