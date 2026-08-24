/**
 * schema.org ProfilePage/Person graph, shared by /about and /resume.
 *
 * This is the machine-readable version of the same facts the pages render, so
 * assistants and search engines get the employer, tenure, and skills as data
 * rather than having to infer them from prose.
 */

const { experience, education, profile, skills } = require("./resume")
const { elsewhereLinks } = require("./about")

const SITE_URL = "https://vinitkumar.me"

// Every skill row flattened into individual topics.
const knowsAbout = skills
  .flatMap((row) => row.value.split(/,\s*/))
  .map((topic) => topic.replace(/\s*\([^)]*\)/, "").trim())
  .filter(Boolean)

const sameAs = elsewhereLinks
  .map((link) => link.href)
  .filter((href) => href.startsWith("http"))

// schema.org has no work-history array, so past and present employers are
// expressed as affiliations. "Open Source" is not an organisation, so it is
// excluded.
const affiliation = experience
  .filter((entry) => entry.organization !== "Open Source")
  .map((entry) => ({
    "@type": "Organization",
    name: entry.organization,
    ...(entry.href ? { url: entry.href } : {}),
  }))

const buildPerson = () => ({
  "@type": "Person",
  name: profile.name,
  url: `${SITE_URL}/about/`,
  email: `mailto:${profile.email}`,
  jobTitle: profile.jobTitle,
  description: profile.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: profile.employer,
    url: profile.employerUrl,
  },
  alumniOf: education.map((entry) => ({
    "@type": "CollegeOrUniversity",
    name: entry.organization,
  })),
  hasOccupation: {
    "@type": "Occupation",
    name: profile.jobTitle,
    occupationalCategory: "15-1252.00", // O*NET: Software Developers
  },
  affiliation,
  knowsAbout,
  sameAs,
})

// pagePath is the page the graph describes, e.g. "/resume/".
const buildProfilePage = (pagePath) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}${pagePath}`,
  mainEntity: buildPerson(),
})

module.exports = { buildPerson, buildProfilePage, knowsAbout, SITE_URL }
