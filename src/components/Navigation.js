import React from "react"
import { Link } from "gatsby"
import ThemeToggle from "./ThemeToggle"
import { getLanguageSwitchPath } from "../utils/i18n"

const externalLinks = [
  {
    href: "https://vinitkumar.github.io/vinitkumar.pdf",
    label: "Resume",
    className: "nav-link--resume",
  },
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
      "M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.8-1.5-2.6-.3-5.4-1.3-5.4-5.6 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.8 5.7 19 5.8 19 5.8c.6 1.5.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.1 0 4.4-2.7 5.3-5.4 5.6.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z",
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
  const localizedExternalLinks = externalLinks.map((link) => ({
    ...link,
    label: locale === "ja" && link.label === "Resume" ? "履歴書" : link.label,
  }))

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

      {localizedExternalLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-link ${link.className}`}
        >
          {link.icon && <SocialIcon name={link.icon} />}
          {link.label}
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
