import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import {
  contact,
  education,
  experience,
  profile,
  recommendations,
  skills,
} from "../data/resume"
import { buildProfilePage } from "../data/person"

// Data lives in src/data/resume.js so gatsby-node can build /resume.md from it.
const RESUME_PDF = "/resume.pdf"

// Shared renderer for the experience, open-source, and education entry lists.
const EntryList = ({ entries }) => (
  <ol className="resume-entries">
    {entries.map((entry) => (
      <li key={`${entry.organization}-${entry.role}`}>
        <div className="resume-entry-head">
          <div>
            <strong>
              {entry.href ? (
                <a href={entry.href} target="_blank" rel="noopener noreferrer">
                  {entry.organization}
                </a>
              ) : (
                entry.organization
              )}
            </strong>
            <span className="resume-entry-role">
              {entry.role}
              {entry.location && (
                <>
                  <span className="resume-entry-dot" aria-hidden="true">
                    •
                  </span>
                  {entry.location}
                </>
              )}
            </span>
          </div>
          <span className="resume-entry-period">{entry.period}</span>
        </div>

        {entry.points.length > 0 && (
          <ul className="resume-points">
            {entry.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ol>
)

const Section = ({ title, children }) => (
  <section className="resume-section">
    <h2 className="resume-section-title">{title}</h2>
    {children}
  </section>
)

const ResumePage = ({ location }) => (
  <Layout location={location} title="Resume">
    <article className="resume-page">
      <header className="resume-header">
        <div className="resume-identity">
          <h1>{profile.name}</h1>
          <p className="resume-tagline">{profile.headline}</p>
        </div>

        <a className="resume-download" href={RESUME_PDF} download>
          Download PDF
        </a>
      </header>

      <ul className="resume-contact">
        {contact.map((item) => (
          <li key={item.href}>
            {/* mailto: and tel: should not open a blank tab. */}
            <a
              href={item.href}
              target={item.local ? undefined : "_blank"}
              rel={item.local ? undefined : "noopener noreferrer"}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <Section title="Skills">
        <dl className="resume-skills">
          {skills.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Experience">
        <EntryList entries={experience} />
      </Section>

      <Section title="Education">
        <EntryList entries={education} />
      </Section>

      <Section title="Recommendations">
        <p className="resume-summary">
          Available on{" "}
          {recommendations.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && " and "}
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <strong>{item.label}</strong>
              </a>
            </React.Fragment>
          ))}
          .
        </p>
      </Section>

      <footer className="resume-footer">
        <a className="resume-download" href={RESUME_PDF} download>
          Download PDF
        </a>
        <p>Typeset in LaTeX. Source lives with this site.</p>
      </footer>
    </article>
  </Layout>
)

export default ResumePage

export const Head = ({ location }) => (
  <Seo
    title="Resume"
    description="Resume of Vinit Kumar — Principal Engineer at Scalefusion, Django CMS Fellow, open-source maintainer."
    pathname={location.pathname}
    markdownPath="/resume.md"
    structuredData={[buildProfilePage("/resume/")]}
  />
)
