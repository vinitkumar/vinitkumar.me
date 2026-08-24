/**
 * Canonical about-page data.
 *
 * Consumed by src/pages/about.js (the HTML page) and by gatsby-node.js
 * (the /about.md mirror and llms.txt entries).
 */

// Plain-text intro used for the Markdown mirror and structured data. The page
// itself renders a richer JSX version with inline links.
const summary =
  "Vinit Kumar is a programmer who likes code that lasts. He is a Principal Engineer at Scalefusion and a Django CMS Fellow, working across product engineering, infrastructure, developer tools, and the unglamorous maintenance that keeps a mature open-source project healthy. He has been building professionally since February 2013."

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

const educationLine =
  "B.E. in Civil Engineering, Birla Institute of Technology, Mesra, 2008—2012."

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

module.exports = {
  summary,
  currentFocus,
  selectedWork,
  principles,
  career,
  educationLine,
  elsewhereLinks,
}
