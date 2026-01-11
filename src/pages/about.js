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
  
  let years = currentDate.getFullYear() - startDate.getFullYear()
  let months = currentDate.getMonth() - startDate.getMonth()
  let days = currentDate.getDate() - startDate.getDate()

  // Adjust if days is negative
  if (days < 0) {
    months--
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
    days += prevMonth.getDate()
  }

  // Adjust if months is negative
  if (months < 0) {
    years--
    months += 12
  }

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
        I'm a <strong>Principal Engineer</strong> at <a href="https://scalefusion.com" target="_blank" rel="noopener noreferrer">Scalefusion</a> with expertise in building system-level features like live SSH terminal interfaces. I'm also a <a href="https://www.django-cms.org/en/blog/2025/12/07/django-cms-fellows-community-annual-report-2025-a-year-of-extraordinary-contributions/" target="_blank" rel="noopener noreferrer">Django CMS Fellow</a>, helping shape the roadmap of the Python ecosystem's most popular CMS. I'm passionate about solving meaningful problems, building robust systems, and pushing technical boundaries. When I'm not coding, you'll find me reading, listening to/playing music, sketching, or enjoying a good cup of coffee.
      </p>

      <p>
        I have <strong>{years} years, {months} months, and {days} days</strong> of professional experience (since February 1, 2013), with deep expertise in Python, Django, Go, TypeScript, and modern system design. I've architected and delivered exceptional products at scale, including a <a href="https://www.divio.com/case-studies/social-schools-divio-transformation/" target="_blank" rel="noopener noreferrer">multi-tenant CMS</a> serving 3,000+ websites and handling millions of requests monthly. In 2025, I contributed <strong>57 merged pull requests and reviewed 139 pull requests</strong> across open source projects, maintaining momentum in infrastructure modernization and ecosystem health.
      </p>

      <p>
        <strong>Backend Mastery:</strong> 12+ years with Python and Django, 5+ years shipping Go in production, optimizing for performance and scalability at every level. <strong>Frontend Strength:</strong> 7+ years of React, 13+ years JavaScript/TypeScript. This full-stack depth enables me to navigate complex systems and collaborate effectively across all engineering disciplines.
      </p>

      <p>
        I excel at optimizing performance, enhancing security, and architecting systems that scale. As a <a href="https://github.com/orgs/django-cms/teams/core-team" target="_blank" rel="noopener noreferrer">Core Developer at DjangoCMS</a> and <a href="https://www.djangoproject.com/foundation/individual-members/" target="_blank" rel="noopener noreferrer">Django Software Foundation Individual Member</a>, I've refined my expertise in line with industry best practices while mentoring the next generation of developers.
      </p>

      <p>
        <strong>Infrastructure & DevOps:</strong> Proficient across AWS, GCP, DigitalOcean, and Azure. I design and deploy robust, scalable solutions that meet enterprise reliability standards. My work includes CI/CD optimization, database architecture, and containerized deployments at scale.
      </p>

      <p>
        <strong>Leadership & Mentorship:</strong> As a Principal Engineer and team leader, I've built high-performing teams that consistently exceed expectations. I foster cultures of innovation, code quality, and continuous learning while practicing what I preach through daily contributions to open source and personal projects.
      </p>

      <p>
        In my free time, I enjoy reading, spending time with my family, and contributing to open source projects. My wife, <a href="https://rituparnadey.com" target="_blank" rel="noopener noreferrer">Rituparna Dey</a>, is the founder of <a href="https://scoophubs.com" target="_blank" rel="noopener noreferrer">ScoopHubs.com</a>, a digital marketing company.
      </p>

      <h2 style={{ marginTop: rhythm(2) }}>What I'm Doing Now</h2>
      <p>
        At <a href="https://scalefusion.com" target="_blank" rel="noopener noreferrer">Scalefusion</a>, I'm shipping system-level features including live SSH terminal interfaces and building infrastructure that scales. As a <a href="https://www.django-cms.org/en/blog/2025/12/07/django-cms-fellows-community-annual-report-2025-a-year-of-extraordinary-contributions/" target="_blank" rel="noopener noreferrer">Django CMS Fellow</a>, I'm modernizing the ecosystem—in 2025 alone, we published Django CMS 5.0 with major JavaScript rewrites, CSP compliance, and Django 6.0 compatibility work.
      </p>
      <p>
        My rhythm: Early mornings for the gym, days for focused work, evenings for open-source contributions, weekends for deep reading and family. I'm deliberately building habits around long-form thinking, writing, and creating.
      </p>
      <p>
        Current technical obsessions: Go's concurrency model and internals, OS-level programming, high-performance networking, distributed systems design, and practical AI workflows. Also deeply invested in code quality, mentorship, and helping developers grow.
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
        If you appreciate my open source work, please consider donating on <a href="https://github.com/sponsors/vinitkumar" rel="noopener noreferrer" target="_blank">GitHub Sponsors</a>. Thank you!
      </p>

      <p style={{ marginTop: rhythm(1), fontStyle: 'italic' }}>
        I hope you enjoy reading my essays.
      </p>
    </Layout>
  );
}

export default AboutIndex
