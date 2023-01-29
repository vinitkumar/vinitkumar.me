import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Unsplash from "react-unsplash-wrapper"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"

const AboutIndex  = (props) => {
  const data = useStaticQuery(graphql`query AboutQuery {
  avatar: file(absolutePath: {regex: "/vinit.jpeg/"}) {
    childImageSharp {
      gatsbyImageData(width: 200, height: 200, quality: 100, layout: FIXED)
    }
  }
  site {
    siteMetadata {
      author
    }
  }
}`)

  const { author } = data.site.siteMetadata
  return (
    <Layout location={props.location}>
    <Seo title="About"></Seo>
    <h1>About</h1>
    <div style={{position: 'relative', width: '100%', height: 420, marginBottom: '2rem'}}>
      <Unsplash expand photoId="c4LpYfizLvw" />
    </div>
    <img
      alt={author}
      src="https://github.com/vinitkumar.png"
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        height: 250,
        width: 250,
        minWidth: 50,
        borderRadius: `100%`,
        float: `right`,
      }}
      imgStyle={{
        borderRadius: `50%`,
      }}
    />
      <p>
        Hi there! I'm Vinit Kumar, a Staff Engineer at the Socialschools Websites Team. I specialize in backend development, and have written a highly scalable, multi-tenant system that supports a successful business.
      </p>
      <p>
        As the lead developer and architect for the Socialschools B.V. CMS, I have over ten years of experience using Django to build top-quality products and solutions for clients. I pride myself on my straightforward approach to problem-solving, and my ability to simplify complex challenges.
      </p>

      <p>
        In my free time, I enjoy reading, spending time with my family, and contributing to open source projects. My wife, Rituparna Dey, is the founder of <a href="https://scoophubs.com" target="_blank" rel="noopener noreferrer">ScoopHubs.com</a>, a digital marketing company.
      </p>
      <p>
        You can learn more about me on my LinkedIn profile and my GitHub profile, and if you're on Twitter, you can follow me at <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/vinitkme">vinitkme</a>. And if you appreciate the open source work that I do, please consider supporting my efforts on my <a href="https://github.com/sponsors/vinitkumar" rel="noopener noreferrer" target="_blank">github sponsors </a> and <a href="https://opencollective.com/vinit-kumar" rel="noopener noreferrer" target="_blank">opencollective </a> page. Thank you!
      </p>
    </Layout>
  );
}



export default AboutIndex;
