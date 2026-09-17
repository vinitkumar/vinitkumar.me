import React from "react"
import ThemeToggle from "./ThemeToggle"

const LICENSE_URL = "https://creativecommons.org/licenses/by-nc-sa/4.0/"
const FONTS_URL = "https://github.com/vinitkumar/berka-mono-closer"

const footerCopy = {
  en: {
    tagline:
      "Writing about robust systems, open source, tools, AI workflows, and engineering craft.",
    elsewhere: "Elsewhere",
    site: "Site",
    mail: "Mail",
    rss: "RSS feed",
    aiTransparency: "AI transparency",
    sponsor: "Sponsor on GitHub",
    license: "CC BY-NC-SA 4.0",
    setIn: "Set in ",
    fonts: "Berka Text & Berka Mono",
    theme: "Theme",
  },
  ja: {
    tagline:
      "堅牢なシステム、オープンソース、開発ツール、AIを活用したワークフロー、そしてエンジニアリングの技術について書いています。",
    elsewhere: "リンク",
    site: "サイト",
    mail: "メール",
    rss: "RSSフィード",
    aiTransparency: "AI利用の透明性 (EN)",
    sponsor: "GitHubでスポンサー",
    license: "CC BY-NC-SA 4.0",
    setIn: "使用フォント：",
    fonts: "Berka Text & Berka Mono",
    theme: "テーマ",
  },
}

const elsewhereLinks = [
  { href: "https://github.com/vinitkumar", label: "GitHub" },
  { href: "https://bsky.app/profile/vinitkme.bsky.social", label: "Bluesky" },
  { href: "https://fosstodon.org/@vinitkme", label: "Mastodon" },
  { href: "https://x.com/intent/user?screen_name=vinitkme", label: "X" },
]

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

const Footer = ({ locale = "en" }) => {
  const copy = footerCopy[locale] || footerCopy.en

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <p className="footer-name">Vinit Kumar</p>
          <p className="footer-tagline">{copy.tagline}</p>
        </div>

        <nav className="footer-group" aria-label={copy.elsewhere}>
          <p className="footer-label">{copy.elsewhere}</p>
          <a href="mailto:mail@vinitkumar.me">{copy.mail}</a>
          {elsewhereLinks.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </nav>

        <nav className="footer-group" aria-label={copy.site}>
          <p className="footer-label">{copy.site}</p>
          <a href="/rss.xml">{copy.rss}</a>
          <a href="/ai-transparency">{copy.aiTransparency}</a>
          <ExternalLink href="https://github.com/sponsors/vinitkumar">
            {copy.sponsor}
          </ExternalLink>
        </nav>
      </div>

      {/* Legal line and theme switch share one quiet row. */}
      <div className="footer-bar">
        <p className="footer-legal">
          <span>© {new Date().getFullYear()} Vinit Kumar</span>
          <ExternalLink href={LICENSE_URL}>{copy.license}</ExternalLink>
          <span>
            {copy.setIn}
            <ExternalLink href={FONTS_URL}>{copy.fonts}</ExternalLink>
          </span>
        </p>
        <div className="footer-theme">
          <span className="footer-label">{copy.theme}</span>
          <ThemeToggle locale={locale} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
