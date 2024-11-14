import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
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
        I am currently employed as a Principal Engineer working for [ScaleFusion](https://scalefusion.com).
      </p>

       <p>
        <ul>
        <li>
          I have 11 years of experience specializing in Django and Python.
          I have successfully built and delivered exceptional products and services throughout my career. Notably, I have led the architecture and development of a <a href="https://www.divio.com/case-studies/social-schools-divio-transformation/" target="_blank" rel="noopener noreferrer">cutting-edge Multi-tenant CMS</a>, catering to an extensive network of over 3k websites. This robust CMS is designed to handle a substantial volume of multi-million monthly requests with efficiency and scalability at its core.</li>

         <li>In addition to my backend expertise, I possess extensive frontend proficiency, including 7 years of React experience and over a decade of mastery in JavaScript and related technologies. This comprehensive skill set enables me to seamlessly navigate complex codebases while collaborating effectively with diverse stakeholders.</li>
        <li>I excel in optimizing performance and enhancing the security of services, consistently delivering top-tier results. </li>
        <li>As a <a href="https://github.com/orgs/django-cms/teams/core-team" target="_blank" rel="noopener noreferrer">Core Developer at DjangoCMS</a>, the industry's most popular Django-based CMS, I have gained invaluable insights and refined my expertise in line with industry best practices.</li>
        <li>
          I am also invited as an <a href="https://www.djangoproject.com/foundation/individual-members/" target="_blank" rel="noopener noreferrer">Individual Member</a> with Django Software Foundation.
  </li>

        <li>Moreover, I am well-versed in various cloud platforms, such as AWS, GCP, DigitalOcean, and Azure. Leveraging these powerful platforms, I am adept at deploying and managing robust, scalable solutions that meet the highest standards of performance and reliability.</li>

        <li>In my role as a Staff Software Engineer and Team Leader, I have demonstrated my ability to lead high-performing teams effectively. By fostering a culture of innovation and excellence, I have successfully steered projects toward success, consistently meeting and exceeding expectations.</li>
      </ul>
      </p>
      <p>
        I am deeply passionate about driving innovation and delivering exceptional outcomes in every project I undertake. My proven track record and my unwavering commitment to excellence make me an ideal candidate for leading and contributing to high-performing teams.
      </p>

      <p>
        In my free time, I enjoy reading, spending time with my family, and contributing to open source projects. My wife, <a href="https://rituparnadey.com" target="_blank" rel="noopener noreferrer">Rituparna Dey</a>, is the founder of <a href="https://scoophubs.com" target="_blank" rel="noopener noreferrer">ScoopHubs.com</a>, a digital marketing company.
      </p>
      <p>
          You can connect with me on <a href="https://www.linkedin.com/in/vinitatlinkedin/" target="_blank" rel="noopener noreferrer">linkedIn</a> and twitter/X <a target="_blank" rel="noopener noreferrer" href="https://x.com/vinitkme">@vinitkme</a>. If you appreciate my open source work, please consider donating on <a href="https://github.com/sponsors/vinitkumar" rel="noopener noreferrer" target="_blank">github sponsors </a> and <a href="https://opencollective.com/vinit-kumar" rel="noopener noreferrer" target="_blank">opencollective </a>. Thank you!
      </p>
    </Layout>
  );
}



export default AboutIndex;
