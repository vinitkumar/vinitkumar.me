const DEFAULT_LOCALE = "en"
const JAPANESE_LOCALE = "ja"
const TRANSLATED_PATHS = new Set(["/", "/about/"])

const normalizePath = (pathname = "/") => {
  const path = pathname.split(/[?#]/, 1)[0] || "/"
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`

  return withLeadingSlash === "/"
    ? withLeadingSlash
    : `${withLeadingSlash.replace(/\/+$/, "")}/`
}

const getLocale = (pathname = "/") =>
  /^\/ja(?:\/|$)/.test(normalizePath(pathname))
    ? JAPANESE_LOCALE
    : DEFAULT_LOCALE

const getBasePath = (pathname = "/") => {
  const normalized = normalizePath(pathname)

  if (getLocale(normalized) !== JAPANESE_LOCALE) return normalized

  const withoutLocale = normalized.replace(/^\/ja(?=\/|$)/, "")
  return withoutLocale || "/"
}

const getLocalizedPath = (pathname, locale) => {
  const basePath = getBasePath(pathname)

  if (locale === JAPANESE_LOCALE) {
    return basePath === "/" ? "/ja/" : `/ja${basePath}`
  }

  return basePath
}

const getLanguageSwitchPath = (pathname, targetLocale) => {
  const basePath = getBasePath(pathname)

  if (!TRANSLATED_PATHS.has(basePath)) {
    return targetLocale === JAPANESE_LOCALE ? "/ja/" : "/"
  }

  return getLocalizedPath(basePath, targetLocale)
}

const getLanguageAlternates = (pathname) => {
  const basePath = getBasePath(pathname)

  if (!TRANSLATED_PATHS.has(basePath)) return []

  return [
    { lang: DEFAULT_LOCALE, path: getLocalizedPath(basePath, DEFAULT_LOCALE) },
    {
      lang: JAPANESE_LOCALE,
      path: getLocalizedPath(basePath, JAPANESE_LOCALE),
    },
    { lang: "x-default", path: getLocalizedPath(basePath, DEFAULT_LOCALE) },
  ]
}

module.exports = {
  DEFAULT_LOCALE,
  JAPANESE_LOCALE,
  getLanguageAlternates,
  getLanguageSwitchPath,
  getLocale,
  getLocalizedPath,
}
