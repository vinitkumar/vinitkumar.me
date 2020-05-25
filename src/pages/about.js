import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const AboutIndex  = (props) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      avatar: file(absolutePath: { regex: "/vinit_kumar.jpg/" }) {
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
    <SEO title="About - Vinit Kumar"></SEO>
    <h1> Bio </h1>
    <p>
      Hi,
    </p>
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
      My name is <strong>Vinit Kumar</strong> and I'm a Software Engineer <span role="img" aria-label="engineer">👨‍💻</span>.
      I am mainly interested in designing scalable systems in Python, Node.js, and Go. I like Vim and good coffee. In this website, you will find my thoughts and musings about a range of topics.
    </p>
    <p>You can download my <span role="img" aria-label="resume">📝</span> <a target='_blank'  rel="noopener noreferrer"  href="https://vinitkumar.github.io/vinit_kumar.pdf"> resume</a> here.</p>
    <p>
      My biggest strength is in coming up with simple solutions for difficult problems. I specially enjoy reading books, and <strong><i>spending time</i></strong> with my family.
    </p>
    <p>I live in Pune with his family. My wife Rituparna is the founder of a Digital Marketing Company <a href="https://scoophubs.com" target="_blank" rel="noopener noreferrer">ScoopHubs.com</a></p>
    <p>Currently, I architect and lead the development of multi-tenant CMS system at Socialschools B.V <span role="img" aria-label="dutch">🇳🇱</span> . I have over 7 years of experience writing backend in Django for a successful product and numerous client projects.</p>
    <p>I do some OSS and you can browse them at my GitHub profile <a href="https://github.com/vinitkumar" target="_blank" rel="noopener noreferrer">vinitkumar</a>.</p>
    <p>
      If you use twitter, you can follow me <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/vinitkme">@vinitkme</a>.
    </p>
    <p>I am on LinkedIn, connect with <a target="_blank"  rel="noopener noreferrer" href="https://www.linkedin.com/in/vinitatlinkedin/">vinitatlinkedin</a> here.</p>
    </Layout>
  );
}



export default AboutIndex;
