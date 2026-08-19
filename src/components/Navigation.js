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
    className: "nav-link--linkedin",
  },
  {
    href: "https://x.com/intent/user?screen_name=vinitkme",
    label: "Twitter",
    className: "nav-link--twitter",
  },
  {
    href: "https://github.com/vinitkumar",
    label: "GitHub",
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
    languageLabel: "日本語",
    languageTitle: "日本語で読む",
    targetLocale: "ja",
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
      { to: "/stats", label: "統計 (EN)", className: "nav-link--stats" },
      {
        to: "/recommendations",
        label: "推薦 (EN)",
        className: "nav-link--recommendations",
      },
    ],
    languageLabel: "English",
    languageTitle: "Read in English",
    targetLocale: "en",
  },
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
          {link.label}
        </a>
      ))}

      <span className="nav-separator" aria-hidden="true" />
      <Link
        to={getLanguageSwitchPath(pathname, copy.targetLocale)}
        className="nav-link nav-link--language"
        hrefLang={copy.targetLocale}
        lang={copy.targetLocale}
        title={copy.languageTitle}
      >
        {copy.languageLabel}
      </Link>
      <span className="nav-separator" aria-hidden="true" />
      <ThemeToggle compact locale={locale} />
    </nav>
  )
}

export default Navigation
