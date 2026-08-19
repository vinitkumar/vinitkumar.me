import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import portrait from "../../content/assets/vinitgreynew.png"
import { getLanguageAlternates } from "../utils/i18n"

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

  const career = [
    {
      organization: "Scalefusion",
      role: "Principal Engineer",
      period: "Nov 2024—Now",
      href: "https://scalefusion.com",
    },
    {
      organization: "django CMS",
      role: "Django CMS Fellow",
      period: "Nov 2024—Now",
      href: "https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/",
    },
    {
      organization: "Django Software Foundation",
      role: "Individual Member",
      period: "Feb 2024—Now",
      href: "https://www.djangoproject.com/foundation/individual-members/",
    },
    {
      organization: "KidsKonnect",
      role: "Staff Software Engineer",
      period: "Feb 2023—Nov 2024",
    },
    {
      organization: "Social Schools",
      role: "Staff / Senior Software Engineer",
      period: "Feb 2013—Feb 2023",
    },
  ]

  const elsewhereLinks = [
    {
      label: "GitHub",
      value: "@vinitkumar",
      href: "https://github.com/vinitkumar",
    },
    {
      label: "LinkedIn",
      value: "/in/vinitatlinkedin",
      href: "https://www.linkedin.com/in/vinitatlinkedin/",
    },
    {
      label: "GotchaCode",
      value: "gotchacode.com",
      href: "https://www.gotchacode.com",
    },
    {
      label: "Bluesky",
      value: "@vinitkme.bsky.social",
      href: "https://bsky.app/profile/vinitkme.bsky.social",
    },
    {
      label: "Mastodon",
      value: "@vinitkme@fosstodon.org",
      href: "https://fosstodon.org/@vinitkme",
    },
    {
      label: "X",
      value: "@vinitkme",
      href: "https://x.com/vinitkme",
    },
    {
      label: "Email",
      value: "mail@vinitkumar.me",
      href: "mailto:mail@vinitkumar.me",
    },
  ]

  return (
    <Layout location={props.location} title={title}>
      <div className="about-page">
        <header className="about-intro">
          <div className="about-intro-heading">
            <h1>Hello.</h1>
            <p>
              I’m Vinit. I build software, maintain open source, and write down
              what I learn.
            </p>
          </div>

          <div className="about-portrait">
            <div className="about-portrait-frame">
              <img alt="Portrait of Vinit Kumar" src={portrait} />
            </div>
          </div>

          <div className="about-intro-prose">
            <p>
              I’m a programmer who likes code that lasts. I care about the small
              details, but I care even more about shipping useful software that
              stays calm in production.
            </p>
            <p>
              I’m a Principal Engineer at{" "}
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
              . My work moves between product engineering, infrastructure,
              developer tools, and the unglamorous maintenance that keeps a
              mature open-source project healthy.
            </p>
            <p>
              I’ve been building professionally since February 2013. I still
              enjoy opening a blank file, understanding a difficult system, and
              leaving it a little simpler than I found it. This site is where I
              keep the lessons.
            </p>
          </div>
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

        <section className="about-section about-career">
          <div>
            <p className="eyebrow">Career</p>
            <h2>Long-term ownership, from backend systems to open source.</h2>
            <p>
              My career has moved through product engineering, distributed
              systems, team leadership, and open-source stewardship.
            </p>
          </div>

          <div>
            <ol className="about-career-list">
              {career.map((item) => (
                <li key={`${item.organization}-${item.role}`}>
                  <div className="about-career-position">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong>{item.organization}</strong>
                      </a>
                    ) : (
                      <strong>{item.organization}</strong>
                    )}
                    <span>{item.role}</span>
                  </div>
                  <span className="about-career-period">{item.period}</span>
                </li>
              ))}
            </ol>
            <p className="about-career-education">
              B.E. in Civil Engineering, Birla Institute of Technology, Mesra,
              2008—2012.
            </p>
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

        <section className="about-section about-elsewhere">
          <div>
            <p className="eyebrow">Elsewhere</p>
            <h2>Find me around the internet.</h2>
          </div>
          <div>
            <p>
              GitHub is where most of my public code lives. For anything that
              needs more than a short reply, email is best.
            </p>
            <ul className="about-link-list">
              {elsewhereLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutIndex

export const Head = ({ location }) => (
  <Seo
    alternates={getLanguageAlternates(location.pathname)}
    title="About"
    description="About Vinit Kumar, Principal Engineer, Django CMS Fellow, open-source maintainer, writer, and builder of developer tools."
    pathname={location.pathname}
  />
)
