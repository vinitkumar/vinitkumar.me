import React, { useState, useEffect } from "react"

const labels = {
  en: {
    auto: "Auto",
    autoAria: "Auto theme (follows system)",
    autoTitle: "Follow system preference",
    dark: "Dark",
    darkAria: "Dark theme",
    darkTitle: "Dark mode",
    light: "Light",
    lightAria: "Light theme",
    lightTitle: "Light mode",
  },
  ja: {
    auto: "自動",
    autoAria: "自動テーマ（システム設定に従う）",
    autoTitle: "システム設定に従う",
    dark: "ダーク",
    darkAria: "ダークテーマ",
    darkTitle: "ダークモード",
    light: "ライト",
    lightAria: "ライトテーマ",
    lightTitle: "ライトモード",
  },
}

const ThemeToggle = ({ compact = false, locale = "en" }) => {
  const [colorScheme, setColorScheme] = useState("auto")
  const copy = labels[locale]

  useEffect(() => {
    const saved = localStorage.getItem("colorScheme") || "auto"
    setColorScheme(saved)
    applyColorScheme(saved)
  }, [])

  const applyColorScheme = (scheme) => {
    const root = document.documentElement
    if (scheme === "auto") {
      root.removeAttribute("data-theme")
    } else {
      root.setAttribute("data-theme", scheme)
    }
  }

  const handleSchemeChange = (scheme) => {
    setColorScheme(scheme)
    localStorage.setItem("colorScheme", scheme)
    applyColorScheme(scheme)
  }

  if (compact) {
    return (
      <span className="theme-toggle-group theme-toggle-compact">
        <button
          className={`theme-btn ${colorScheme === "auto" ? "active" : ""}`}
          onClick={() => handleSchemeChange("auto")}
          aria-label={copy.autoAria}
          title={copy.autoTitle}
        >
          ◐
        </button>
        <button
          className={`theme-btn ${colorScheme === "light" ? "active" : ""}`}
          onClick={() => handleSchemeChange("light")}
          aria-label={copy.lightAria}
          title={copy.lightTitle}
        >
          ☀
        </button>
        <button
          className={`theme-btn ${colorScheme === "dark" ? "active" : ""}`}
          onClick={() => handleSchemeChange("dark")}
          aria-label={copy.darkAria}
          title={copy.darkTitle}
        >
          ☽
        </button>
      </span>
    )
  }

  return (
    <span className="theme-toggle-group">
      <button
        className={`theme-btn ${colorScheme === "auto" ? "active" : ""}`}
        onClick={() => handleSchemeChange("auto")}
        aria-label={copy.autoAria}
        title={copy.autoTitle}
      >
        <span className="theme-btn-icon">◐</span>
        {copy.auto}
      </button>
      <button
        className={`theme-btn ${colorScheme === "light" ? "active" : ""}`}
        onClick={() => handleSchemeChange("light")}
        aria-label={copy.lightAria}
        title={copy.lightTitle}
      >
        <span className="theme-btn-icon">☀</span>
        {copy.light}
      </button>
      <button
        className={`theme-btn ${colorScheme === "dark" ? "active" : ""}`}
        onClick={() => handleSchemeChange("dark")}
        aria-label={copy.darkAria}
        title={copy.darkTitle}
      >
        <span className="theme-btn-icon">☽</span>
        {copy.dark}
      </button>
    </span>
  )
}

export default ThemeToggle
