/**
 * Canonical resume data.
 *
 * Consumed by src/pages/resume.js (the HTML page) and by gatsby-node.js
 * (the /resume.md mirror and llms.txt entries). Keep in sync with
 * resume/vinit-kumar.tex, which produces static/resume.pdf.
 */

const profile = {
  name: "Vinit Kumar",
  headline: "Principal Engineer / Django CMS Fellow",
  jobTitle: "Principal Engineer",
  employer: "Scalefusion",
  employerUrl: "https://scalefusion.com",
  location: "Pune, India",
  email: "mail@vinitkumar.me",
  summary:
    "Principal Engineer with 13 years of building and running production back-end systems in Go and Python. Django CMS Fellow maintaining a mature open-source ecosystem, and author of json2xml (180k+ PyPI downloads a month).",
}

const contact = [
  {
    label: "mail@vinitkumar.me",
    href: "mailto:mail@vinitkumar.me",
    local: true,
  },
  { label: "github.com/vinitkumar", href: "https://github.com/vinitkumar" },
  {
    label: "in/vinitatlinkedin",
    href: "https://www.linkedin.com/in/vinitatlinkedin/",
  },
]

const skills = [
  { label: "Languages", value: "Go, Python, TypeScript, JavaScript, Ruby, C" },
  {
    label: "Back end",
    value:
      "Django, FastAPI, Celery, RabbitMQ, PostgreSQL, MySQL, Redis, Elasticsearch",
  },
  {
    label: "Infrastructure",
    value:
      "AWS, Google Cloud, Docker, Kubernetes, GitHub Actions, Bitbucket Pipelines",
  },
  {
    label: "Practices",
    value:
      "System design, performance profiling, TDD (Pytest, Vitest), code review, mentoring",
  },
]

const experience = [
  {
    organization: "Scalefusion",
    role: "Principal Engineer",
    location: "Pune, India",
    period: "Nov 2024 — Present",
    href: "https://scalefusion.com",
    points: [
      "Wrote the Linux client from scratch and own it end to end, supporting 22 Linux distribution and display environment combinations.",
      "Building the new Remote Cast solution with rooms, live annotation, and adaptive bitrate based on the display.",
      "Built the back end for the live SSH terminal service.",
      "Lead architecture of distributed back-end services in Go and TypeScript.",
    ],
  },
  {
    organization: "django CMS",
    role: "Django CMS Fellow (paid fellowship)",
    location: "Remote",
    period: "Nov 2024 — Present",
    href: "https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/",
    points: [
      "Maintain django CMS core, django-filer, and the plugin ecosystem; merged 52 pull requests across 29 repositories.",
      "Reviewed 330+ contributor pull requests; lead modernisation and compatibility work for new Django and Python versions.",
    ],
  },
  {
    organization: "KidsKonnect",
    role: "Staff Software Engineer, Tech Lead (Websites & Onboarding)",
    location: "Pune, India",
    period: "Feb 2023 — Nov 2024",
    points: [
      "Tech lead of the five-person Websites and Onboarding team, including QA; set the code review standards the team worked to.",
      "Owned the multitenant CMS behind 2,500+ customer domains: tenant provisioning, routing, and template isolation.",
      "Owned customer onboarding end to end, so new sites went live with no manual steps.",
      "Improved performance across the domain fleet, instrumented with New Relic and Sentry; built REST APIs with Django REST Framework.",
      "Managed cloud capacity and spend through auto-scaling and right-sizing, working with the hosting provider's DevOps team.",
      "Took on the legacy parts of the platform others avoided and left them easier to change.",
    ],
  },
  {
    organization: "Social Schools",
    role: "Senior to Staff Software Engineer",
    location: "Pune, India",
    period: "Feb 2013 — Feb 2023",
    points: [
      "Designed and built a multitenant CMS in Python serving 2,500+ school domains; cut page load times by 35%.",
      "Cut API response times from 400 ms to 120 ms.",
      "Led the enrolment form and CRM system: onboarding time down 40%, customer sign-ups up 25%.",
      "Built a distributed task queue on Celery and RabbitMQ: job execution time down 45%, 3x concurrent task capacity.",
      "Wrote a Go analytics tracker that halved data processing time.",
      "Reduced AWS costs by 20% through auto-scaling and instance right-sizing; built uptime monitoring that cut incidents by 30%.",
      "Led containerisation with Docker and Kubernetes for consistent local development; mentored engineers on Django and React.",
    ],
  },
  {
    organization: "Open Source & Community",
    role: "Author and maintainer",
    period: "2010 — Present",
    href: "https://github.com/vinitkumar",
    points: [
      "json2xml: Python library with 180k+ PyPI downloads a month and 110 GitHub stars; ported to Go and Zig.",
      "white paper: top-10 Jekyll theme with thousands of downloads.",
      "Individual Member, Django Software Foundation (since Feb 2024).",
    ],
  },
]

const education = [
  {
    organization: "Birla Institute of Technology, Mesra",
    role: "B.E., Civil Engineering",
    location: "Ranchi, India",
    period: "2008 — 2012",
    points: [],
  },
]

const recommendations = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vinitatlinkedin/details/recommendations/",
  },
  { label: "GitHub", href: "https://github.com/vinitkumar" },
]

module.exports = {
  profile,
  contact,
  skills,
  experience,
  education,
  recommendations,
}
