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
    "Principal Engineer at Scalefusion and Django CMS Fellow. Builds large-scale distributed systems in Go and Python, maintains open-source infrastructure, and writes about engineering craft.",
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
  {
    label: "Programming",
    value: "Go, Python, JavaScript, TypeScript, Ruby, PHP, C",
  },
  {
    label: "DevOps",
    value:
      "AWS, Google Cloud Platform, DigitalOcean, CI/CD (GitHub Actions, Bitbucket Pipelines)",
  },
  {
    label: "Web",
    value:
      "Django, FastAPI, Ruby on Rails, Laravel, Express.js, PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, React",
  },
  { label: "Testing", value: "Unit testing, TDD (Pytest, Vitest, PHPUnit)" },
]

const experience = [
  {
    organization: "Scalefusion",
    role: "Principal Engineer",
    location: "Pune, India",
    period: "Nov 2024 — Present",
    href: "https://scalefusion.com",
    points: [
      "Lead architecture and development of large-scale distributed systems using Go, solving complex engineering challenges with precision.",
      "Design and optimize high-performance back-end systems, ensuring seamless scalability and reliability.",
      "Collaborate cross-functionally to improve system efficiency, implementing solutions that improve performance.",
      "Develop and maintain core services in Go, TypeScript, and Ruby on Rails, ensuring high availability and fault tolerance.",
      "Optimize cloud infrastructure and CI/CD pipelines, improving deployment efficiency and reducing downtime.",
    ],
  },
  {
    organization: "django CMS",
    role: "Django CMS Fellow",
    period: "Nov 2024 — Present",
    href: "https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/",
    points: [
      "Paid fellowship contributing to the django CMS core and its plugin ecosystem.",
    ],
  },
  {
    organization: "Django Software Foundation",
    role: "Individual Member",
    period: "Feb 2024 — Present",
    href: "https://www.djangoproject.com/foundation/individual-members/",
    points: [],
  },
  {
    organization: "KidsKonnect",
    role: "Staff Software Engineer",
    location: "Pune, India",
    period: "Feb 2023 — Nov 2024",
    // TODO(vinit): bullets below sit on Social Schools; move the post-Feb-2023
    // ones up into this entry.
    points: [],
  },
  {
    organization: "Social Schools",
    role: "Staff / Senior Software Engineer",
    location: "Pune, India",
    period: "Feb 2013 — Feb 2023",
    points: [
      "Designed and implemented a highly scalable distributed multitenant CMS in Python, managing more than 2,500 domains and improving page load speeds by 35%.",
      "Led development of an Enrollment Form & CRM system, reducing onboarding time by 40% and increasing customer sign-ups by 25%.",
      "Built an internal monitoring tool, reducing downtime incidents by 30% through real-time uptime tracking.",
      "Developed a Go-based analytics tracker, reducing data processing time by 50% and improving the efficiency of the system.",
      "Created a Celery & RabbitMQ-based distributed task queue, reducing job execution time by 45% and handling 3x more concurrent tasks.",
      "Optimized cloud infrastructure, reducing AWS costs by 20% through auto-scaling and right-sizing instances.",
      "Spearheaded performance improvements, cutting API response times from 400 ms to 120 ms, improving user experience.",
      "Led containerization efforts (Docker, Kubernetes), enabling seamless local development across different OS environments.",
      "Mentored junior developers on Django and React, fostering a culture of best practices and continuous learning.",
    ],
  },
  {
    organization: "Open Source",
    role: "Software Developer",
    location: "Remote",
    period: "2010 — Present",
    href: "https://github.com/vinitkumar",
    points: [
      "Principal author of json2xml, used by engineers from Google, Amazon, and NASA.",
      "Developed a chat-bot in C with a lightweight NLP engine.",
      "Created node-twitter, a Twitter clone using Node.js and MongoDB.",
      "Designed “white paper,” a top-10 Jekyll theme with thousands of downloads.",
    ],
  },
]

const education = [
  {
    organization: "Birla Institute of Technology, Mesra",
    role: "B.E. (Python programming, Linux, C)",
    location: "Ranchi, India",
    period: "Jul 2008 — Apr 2012",
    points: [
      "Graduation project: applied genetic algorithms to predict sedimentation rates in reservoirs in India.",
    ],
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
