import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const startDate = new Date("2013-02-01")

const getExperience = () => {
  const currentDate = new Date()
  let years = currentDate.getFullYear() - startDate.getFullYear()
  let months = currentDate.getMonth() - startDate.getMonth()

  if (currentDate.getDate() < startDate.getDate()) {
    months--
  }

  if (months < 0) {
    years--
    months += 12
  }

  return { years, months }
}

const formatNumber = (value) => value.toLocaleString("en-US")

const AboutIndex = (props) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              date
              title
              featured
            }
            fields {
              slug
              collection
            }
            wordCount {
              words
            }
          }
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges.map(({ node }) => node)
  const essays = posts.filter((post) => post.fields.collection !== "til")
  const tilPosts = posts.filter((post) => post.fields.collection === "til")
  const featuredCount = essays.filter(
    (post) => post.frontmatter.featured
  ).length
  const totalWords = posts.reduce(
    (sum, post) => sum + (post.wordCount?.words || 0),
    0
  )
  const latestEssay = essays[0]
  const { years, months } = getExperience()

  const metrics = [
    { label: "Professional experience", value: `${years}+ years` },
    { label: "Essays and notes", value: formatNumber(posts.length) },
    { label: "Featured essays", value: formatNumber(featuredCount) },
    { label: "Words published", value: formatNumber(totalWords) },
  ]

  const currentFocus = [
    "Building system-level product surfaces at Scalefusion, including live SSH terminal workflows and infrastructure that has to stay calm under real users.",
    "Maintaining Django CMS as a Fellow: reviews, modernization work, compatibility, and the steady craft of keeping a mature Python ecosystem healthy.",
    "Sharpening my AI-assisted engineering workflow without outsourcing judgment, taste, or accountability.",
    "Building terminal-first tools in Go, Rust-backed Neovim workflows, and small utilities that make daily engineering faster.",
  ]

  const selectedWork = [
    {
      title: "github-pr-attention",
      body: "A Go terminal UI for treating GitHub pull requests like an inbox: scan, review, approve, merge, and move on without living in browser tabs.",
      href: "/github-pr-attention/",
    },
    {
      title: "fff.nvim fork",
      body: "A fast Neovim picker ecosystem that adds buffer switching, git-status picking, and live colorscheme browsing around a Rust-powered core.",
      href: "/fff-nvim-fork/",
    },
    {
      title: "json2xml across Python, Go, and Zig",
      body: "A polyglot open-source push: CLI support, ports, benchmarks, docs, fuzz tests, and a cleaner story for a long-running project.",
      href: "/json2xml-multiplatform-day/",
    },
  ]

  const principles = [
    "I like software that is boring in production and sharp in the hands of developers.",
    "I trust tests, profiling, review, and small commits more than heroic rewrites.",
    "I use AI as leverage, not as a substitute for understanding the code I ship.",
    "I care about writing because it forces scattered technical experience into something reusable.",
  ]

  return (
    <Layout location={props.location} title={title}>
      <div className="about-page">
        <header className="about-hero">
          <div className="about-hero-copy">
            <p className="eyebrow">About Vinit Kumar</p>
            <h1>
              I build reliable systems, maintain open source, and write about
              the craft of staying useful as software changes.
            </h1>
            <p>
              I am a Principal Engineer at{" "}
              <a
                href="https://scalefusion.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Scalefusion
              </a>{" "}
              and a{" "}
              <a
                href="https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Django CMS Fellow
              </a>
              . My work sits where product engineering, open-source maintenance,
              infrastructure, developer tools, and judgment-heavy AI workflows
              meet.
            </p>
          </div>

          <img
            alt="Vinit Kumar"
            src="https://github.com/vinitkumar.png"
            className="about-avatar"
          />
        </header>

        <section className="about-metrics" aria-label="About summary">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section className="about-section about-now">
          <div>
            <p className="eyebrow">Now</p>
            <h2>What I am focused on in 2026</h2>
          </div>
          <div className="about-now-list">
            {currentFocus.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section className="about-section about-split">
          <div>
            <p className="eyebrow">How I Work</p>
            <h2>Senior engineering, without the theater.</h2>
            <p>
              I have been building professionally since February 2013, which is
              now {years} years and {months} months of learning how systems
              fail, how teams drift, and how good software gets made anyway.
            </p>
            <p>
              My strongest work is usually in the messy middle: turning vague
              product needs into durable interfaces, improving performance,
              making deployment safer, reviewing code with care, and helping
              teams build confidence in the thing they are shipping.
            </p>
          </div>

          <div className="about-principles">
            {principles.map((principle) => (
              <p key={principle}>{principle}</p>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2>Recent things that describe my taste</h2>
            </div>
          </div>

          <div className="about-work-grid">
            {selectedWork.map((item) => (
              <Link key={item.href} to={item.href} className="about-work-item">
                <span>{item.title}</span>
                <p>{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="about-section about-split">
          <div>
            <p className="eyebrow">Writing</p>
            <h2>This site is my public notebook.</h2>
          </div>
          <div>
            <p>
              I write about programming, tooling, open source, personal
              operating systems, and the tension between using AI well and
              keeping your own engineering muscles alive.
            </p>
            {latestEssay && (
              <p>
                Latest essay:{" "}
                <Link to={latestEssay.fields.slug}>
                  {latestEssay.frontmatter.title}
                </Link>
                .
              </p>
            )}
            <p>
              The archive currently has {formatNumber(essays.length)} essays,{" "}
              {formatNumber(tilPosts.length)} TIL notes, and{" "}
              {formatNumber(totalWords)} published words.
            </p>
          </div>
        </section>

        <section className="about-section about-split">
          <div>
            <p className="eyebrow">Outside Code</p>
            <h2>A full life keeps the work honest.</h2>
          </div>
          <div>
            <p>
              I read, sketch, listen to and play music, lift, spend time with my
              family, and keep returning to long-form thinking when the internet
              gets too loud.
            </p>
            <p>
              My wife,{" "}
              <a
                href="https://rituparnadey.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rituparna Dey
              </a>
              , runs{" "}
              <a
                href="https://scoophubs.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ScoopHubs
              </a>
              , a digital marketing company.
            </p>
          </div>
        </section>

        <section className="about-contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Send a good note.</h2>
          </div>
          <p>
            Email me at{" "}
            <a href="mailto:mail@vinitkumar.me">mail@vinitkumar.me</a>, connect
            on{" "}
            <a
              href="https://www.linkedin.com/in/vinitatlinkedin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            , follow{" "}
            <a
              href="https://x.com/vinitkme"
              target="_blank"
              rel="noopener noreferrer"
            >
              @vinitkme
            </a>
            , or sponsor my open-source work on{" "}
            <a
              href="https://github.com/sponsors/vinitkumar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Sponsors
            </a>
            .
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default AboutIndex

export const Head = ({ location }) => (
  <Seo
    title="About"
    description="About Vinit Kumar, Principal Engineer, Django CMS Fellow, open-source maintainer, writer, and builder of developer tools."
    pathname={location.pathname}
  />
)
