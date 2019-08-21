import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Unsplash from "react-unsplash-wrapper"

class AboutIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
      <SEO title="About - Vinit Kumar"></SEO>
        <div style={{position: 'relative', width: '100%', height: 400, margin: 'auto'}}>
          <Unsplash expand photoid="wT5VXP92jFA" />
        </div>
      <h1> About </h1>
      <p>
        Hi,
      </p>
      <p>
        My name is <strong>Vinit Kumar</strong> and I'm a Sofware Engineer.
        I am mainly interested in building scalable backend in Django, Python, Node, Go, Tooling, Vim and Coffee. In my personal website, you will find my thoughts and musings about a range of topics..
      </p>
      <p>
        My strength is in coming up with simple solutions to difficult problems. I specially enjoy reading books, and spending time with my family.
      </p>
      <p>Currently, I lead the development of multi-tenant CMS system at Socialschools B..V. I have 7 years of experience writing backend in Django for a successful product and numerous service projects.</p>
      <p>I do plenty of OSS work and you find the interesting projects at my Github profile <a href="https://github.com/vinitkumar" target="_blank" rel="noopener noreferrer">vinitkumar</a>.</p>
      <p>
        For keeping up with me on twitter, follow me <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/vinitkme">@vinitkme</a>
      </p>
      <p> And to keep up with me on the professional front, connect with me on <a target="_blank"  rel="noopener noreferrer" href="https://www.linkedin.com/in/vinitatlinkedin/">LinkedIn</a> here.</p>
      </Layout>
    );
  }
}


export default AboutIndex;
