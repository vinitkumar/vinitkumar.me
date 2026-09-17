import React from "react"
import { Link } from "gatsby"
import ThemeToggle from "./ThemeToggle"
import { getLanguageSwitchPath } from "../utils/i18n"

const externalLinks = [
  {
    href: "https://www.linkedin.com/in/vinitatlinkedin/",
    label: "LinkedIn",
    icon: "linkedin",
    className: "nav-link--linkedin",
  },
  {
    href: "https://x.com/intent/user?screen_name=vinitkme",
    label: "Twitter",
    icon: "twitter",
    className: "nav-link--twitter",
  },
  {
    href: "https://github.com/vinitkumar",
    label: "GitHub",
    icon: "github",
    className: "nav-link--github",
  },
]

const navigationCopy = {
  en: {
    ariaLabel: "Main navigation",
    internalLinks: [
      { to: "/about", label: "About", className: "nav-link--about" },
      { to: "/resume", label: "Resume", className: "nav-link--resume" },
      { to: "/til", label: "TIL", className: "nav-link--til" },
      { to: "/stats", label: "Stats", className: "nav-link--stats" },
      {
        to: "/recommendations",
        label: "Recs",
        className: "nav-link--recommendations",
      },
    ],
    languageAriaLabel: "Choose language",
  },
  ja: {
    ariaLabel: "メインナビゲーション",
    internalLinks: [
      {
        to: "/ja/about/",
        label: "プロフィール",
        className: "nav-link--about",
      },
      { to: "/resume", label: "履歴書", className: "nav-link--resume" },
      { to: "/til", label: "TIL (EN)", className: "nav-link--til" },
      {
        to: "/ja/stats/",
        label: "統計",
        className: "nav-link--stats",
      },
      {
        to: "/ja/recommendations/",
        label: "推薦",
        className: "nav-link--recommendations",
      },
    ],
    languageAriaLabel: "言語を選択",
  },
}

const SocialIcon = ({ name }) => {
  const paths = {
    github:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    linkedin:
      "M5.3 7.8H1.7V19h3.6V7.8ZM3.5 2.2a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM19 12.6c0-3.4-1.8-5-4.3-5-2 0-2.9 1.1-3.4 1.9V7.8H7.7V19h3.6v-5.5c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V19H19v-6.4Z",
    twitter:
      "M3 3h4.6l4.8 6.4L18 3h3l-7.2 8.4L21.5 21h-4.6l-5.1-6.7L6 21H3l7.4-8.7L3 3Zm3.5 2 11.4 14h1.6L8.1 5H6.5Z",
  }

  return (
    <svg
      className="social-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} fill="currentColor" />
    </svg>
  )
}

/**
 * Shared Navigation component used across all layouts
 * Uses CSS classes from global.css for consistent styling
 */
const Navigation = ({ locale = "en", pathname = "/" }) => {
  const copy = navigationCopy[locale]
  return (
    <nav className="site-nav" aria-label={copy.ariaLabel}>
      {copy.internalLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`nav-link ${link.className}`}
          activeClassName="nav-link--active"
        >
          {link.label}
        </Link>
      ))}

      <span className="nav-separator" aria-hidden="true" />

      {externalLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-link ${link.className}`}
        >
          {link.icon && <SocialIcon name={link.icon} />}
          <span className="nav-link-label">{link.label}</span>
        </a>
      ))}

      <span className="nav-separator" aria-hidden="true" />
      <span className="language-switcher" aria-label={copy.languageAriaLabel}>
        <Link
          to={getLanguageSwitchPath(pathname, "en")}
          className="language-flag"
          hrefLang="en"
          lang="en"
          aria-label="English"
          aria-current={locale === "en" ? "page" : undefined}
          title="English"
        >
          <span aria-hidden="true">🇮🇳</span>
        </Link>
        <Link
          to={getLanguageSwitchPath(pathname, "ja")}
          className="language-flag"
          hrefLang="ja"
          lang="ja"
          aria-label="日本語"
          aria-current={locale === "ja" ? "page" : undefined}
          title="日本語"
        >
          <span aria-hidden="true">🇯🇵</span>
        </Link>
      </span>
      <span className="nav-separator" aria-hidden="true" />
      <ThemeToggle compact locale={locale} />
    </nav>
  )
}

export default Navigation
