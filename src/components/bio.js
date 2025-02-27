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
      className="about_inner"
      style={{
        display: `block`,
        textDecoration: `none`,
        marginBottom: rhythm(1),
        marginTop: rhythm(1),
      }}
    >
      <p>
        I’m a <Link to="/about" className="btn-action">Principal Engineer</Link> at <a className= "btn-action" href="https://scalefusion.com">Scalefusion</a> and <a href="https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/" className="btn-action">Django CMS Fellow</a> passionate
        about solving meaningful problems and pushing tech boundaries. I love reading, listening/playing music, appreciating/making art, and enjoying a good cup of coffee.
      </p>
      <p>
        Here are some  <Link className={"btn-action"} to="/recommendations">recommendations</Link> from my current and past colleagues. You can check out my <a href="https://vinitkumar.github.io/vinitkumar.pdf" target="_blank" className="btn-action" rel="noopener noreferrer">latest resume</a> and <a target="_blank" rel="noopener noreferrer" className="btn-action" href="https://github.com/vinitkumar">Github profile</a>.
        You can connect with me on twitter at <a href="https://twitter.com/vinitkme" target="_blank" className="btn-action"
          rel="noopener noreferrer">@vinitkme</a> or drop me an email at<a href="mailto:mail@vinitkumar.me" className="btn-action">mail@vinitkumar.me</a>.
      </p>
      <p>I hope you enjoy reading my essays.</p>
    </div>
  )
}

export default Bio
