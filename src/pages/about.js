import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"

const AboutIndex  = (props) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      avatar: file(absolutePath: { regex: "/vinit.jpeg/" }) {
        childImageSharp {
          fixed(width: 200, height: 200, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <Layout location={props.location}>
    <Seo title="About - Vinit Kumar"></Seo>
    <h1>About</h1>
    <Image
      fixed={data.avatar.childImageSharp.fixed}
      alt={author}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        minWidth: 50,
        borderRadius: `100%`,
        float: `right`,
      }}
      imgStyle={{
        borderRadius: `50%`,
      }}
    />
    <p>
      My name is <strong>Vinit Kumar</strong>, and I'm a Staff Engineer at Socialschools Websites Team.<br/>
      <br/>
      I have written a multi-tenant backend system that scales to more than 50m requests/month and powers a profitable business. 
    </p>

    <p>I lead the development and architecture of a multi-tenant CMS at Socialschools B.V. I have more than 9 years of experience writing backend in Django for a couple of successful products and numerous client projects. You can download my <a target='_blank'  rel="noopener noreferrer"  href="https://vinitkumar.github.io/vinit_kumar.pdf"> resume</a> here. My strength is in coming up with simple solutions for difficult problems.
    </p>
    <p>I enjoy reading books, and <strong><i>spending time</i></strong> with family. I live in Pune with my family. My wife <a target='_blank'  rel="noopener noreferrer"  href="https://rituparnadey.com">Rituparna Dey</a> is founder of a Digital Marketing Company <a href="https://scoophubs.com" target="_blank" rel="noopener noreferrer">ScoopHubs.com</a></p>
    <p>I contribute to some open source software and you can browse them at my github profile <a href="https://github.com/vinitkumar" target="_blank" rel="noopener noreferrer">vinitkumar</a>.
      If you use twitter, you can follow me <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/vinitkme">vinitkme</a> on twitter.
    I am also on <a target="_blank"  rel="noopener noreferrer" href="https://www.linkedin.com/in/vinitatlinkedin/">LinkedIn</a>.
    </p>
    <p>If you use any of my OSS software, please consider sponsoring my work <span rel="img" aria-label="heart-emoji">❤️ </span>, so that I can justify spending time on OSS that benefits you all. You can sponsor me on my <a href="https://opencollective.com/vinit-kumar" rel="noopener noreferrer" target="_blank">opencollective </a> here.</p>
    <iframe src="https://github.com/sponsors/vinitkumar/card" title="Sponsor vinitkumar" height="225" width="600" style={{ "border":
      "0"}}></iframe>

    </Layout>
  );
}



export default AboutIndex;
