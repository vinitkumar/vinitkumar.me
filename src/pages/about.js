import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"

const AboutIndex = (props) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      avatar: file(absolutePath: {regex: "/vinit.jpeg/"}) {
        childImageSharp {
          gatsbyImageData(width: 200, height: 200, quality: 100, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `)

  const { author, title } = data.site.siteMetadata

  // Calculate dynamic experience
  const startDate = new Date('2013-02-01')
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate - startDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffYears = Math.floor(diffDays / 365.25)

  return (
    <Layout location={props.location} title={title}>
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
        I'm a <strong>Principal Engineer</strong> at <a href="https://scalefusion.com" target="_blank" rel="noopener noreferrer">Scalefusion</a> and <a href="https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/" target="_blank" rel="noopener noreferrer">Django CMS Fellow</a> passionate about solving meaningful problems and pushing tech boundaries. I love reading, listening/playing music, appreciating/making art, and enjoying a good cup of coffee.
      </p>

      <p>
        I have <strong>{diffYears} years</strong> of experience ({diffDays.toLocaleString()} days since February 1, 2013) specializing in Django, Python, Go, and TypeScript.
        I have successfully built and delivered exceptional products and services throughout my career. Notably, I have led the architecture and development of a <a href="https://www.divio.com/case-studies/social-schools-divio-transformation/" target="_blank" rel="noopener noreferrer">cutting-edge Multi-tenant CMS</a>, catering to an extensive network of over 3k websites. This robust CMS is designed to handle a substantial volume of multi-million monthly requests with efficiency and scalability at its core.
      </p>

      <p>
        In addition to my backend expertise with Python, Django, and Go, I possess extensive frontend proficiency, including 7 years of React experience and over a decade of mastery in JavaScript, TypeScript, and related technologies. This comprehensive skill set enables me to seamlessly navigate complex codebases while collaborating effectively with diverse stakeholders.
      </p>

      <p>
        I excel in optimizing performance and enhancing the security of services, consistently delivering top-tier results. As a <a href="https://github.com/orgs/django-cms/teams/core-team" target="_blank" rel="noopener noreferrer">Core Developer at DjangoCMS</a>, the industry's most popular Django-based CMS, I have gained invaluable insights and refined my expertise in line with industry best practices.
      </p>

      <p>
        I am also invited as an <a href="https://www.djangoproject.com/foundation/individual-members/" target="_blank" rel="noopener noreferrer">Individual Member</a> with Django Software Foundation.
      </p>

      <p>
        Moreover, I am well-versed in various cloud platforms, such as AWS, GCP, DigitalOcean, and Azure. Leveraging these powerful platforms, I am adept at deploying and managing robust, scalable solutions that meet the highest standards of performance and reliability.
      </p>

      <p>
        In my role as a Staff Software Engineer and Team Leader, I have demonstrated my ability to lead high-performing teams effectively. By fostering a culture of innovation and excellence, I have successfully steered projects toward success, consistently meeting and exceeding expectations.
      </p>

      <p>
        I am deeply passionate about driving innovation and delivering exceptional outcomes in every project I undertake. My proven track record and my unwavering commitment to excellence make me an ideal candidate for leading and contributing to high-performing teams.
      </p>

      <p>
        In my free time, I enjoy reading, spending time with my family, and contributing to open source projects. My wife, <a href="https://rituparnadey.com" target="_blank" rel="noopener noreferrer">Rituparna Dey</a>, is the founder of <a href="https://scoophubs.com" target="_blank" rel="noopener noreferrer">ScoopHubs.com</a>, a digital marketing company.
      </p>

      <h2 style={{ marginTop: rhythm(2) }}>What I’m Doing Now</h2>
      <p>
        Right now, I’m focused on building robust system-level features at <a href="https://scalefusion.com" target="_blank" rel="noopener noreferrer">Scalefusion</a>, including a live terminal interface over SSH. I'm also actively mentoring contributors and shaping the future roadmap as a <a href="https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/" target="_blank" rel="noopener noreferrer">Django CMS Fellow</a>.
      </p>
      <p>
        Mornings are for the gym 🏋️‍♂️, evenings for OSS work, and weekends for deep thinking and family time. I'm also working on tightening my focus and building long-term rituals around reading and creating.
      </p>
      <p>
        Some current interests: Go internals, OS-level programming, high-performance networking, and managing cognitive load as a Principal Engineer.
      </p>

      <h2 style={{ marginTop: rhythm(2) }}>Books on My Desk</h2>
      <ul>
        <li><strong>Deep Work</strong> by Cal Newport — revisiting for sharper focus</li>
        <li><strong>The Almanack of Naval Ravikant</strong> by Eric Jorgenson — timeless clarity on leverage and self-mastery</li>
        <li><strong>The Psychology of Money</strong> by Morgan Housel — reframes decisions and behavior with money</li>
        <li><strong>Zen and the Art of Motorcycle Maintenance</strong> by Robert Pirsig — makes you slow down and think deeply</li>
        <li><strong>Designing Data-Intensive Applications</strong> by Martin Kleppmann — constant source of insight for backend systems</li>
        <li><strong>Compilers (The Dragon Book)</strong> by Aho, Lam, Sethi, Ullman — foundational and fascinating, still working through it</li>
        <li><strong>Concurrency in Go</strong> by Katherine Cox-Buday — sharpens my understanding of Go's concurrency model</li>
      </ul>
      <p>📖 Full list & themes → <a href="/books-on-my-desk/">vinitkumar.me/books-on-my-desk</a></p>
      <p>
        I often share thoughts from these on <a href="https://x.com/vinitkme" target="_blank" rel="noopener noreferrer">Twitter</a> or <a href="https://www.linkedin.com/in/vinitatlinkedin/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
      </p>

      <h2 style={{ marginTop: rhythm(2) }}>Connect with me</h2>
      <p>
        You can connect with me on <a href="https://www.linkedin.com/in/vinitatlinkedin/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and Twitter/X <a target="_blank" rel="noopener noreferrer" href="https://x.com/vinitkme">@vinitkme</a>. You can also reach me via email at <a href="mailto:mail@vinitkumar.me">mail@vinitkumar.me</a>.
      </p>

      <p>
        If you appreciate my open source work, please consider donating on <a href="https://github.com/sponsors/vinitkumar" rel="noopener noreferrer" target="_blank">GitHub Sponsors</a> and <a href="https://opencollective.com/vinit-kumar" rel="noopener noreferrer" target="_blank">OpenCollective</a>. Thank you!
      </p>

      <p style={{ marginTop: rhythm(1), fontStyle: 'italic' }}>
        I hope you enjoy reading my essays.
      </p>
    </Layout>
  );
}

export default AboutIndex
