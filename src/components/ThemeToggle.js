import React, { useState, useEffect } from "react"

const ThemeToggle = ({ compact = false }) => {
  const [colorScheme, setColorScheme] = useState("auto")

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
          aria-label="Auto theme"
          title="Follow system"
        >
          ◐
        </button>
        <button
          className={`theme-btn ${colorScheme === "light" ? "active" : ""}`}
          onClick={() => handleSchemeChange("light")}
          aria-label="Light theme"
          title="Light mode"
        >
          ☀
        </button>
        <button
          className={`theme-btn ${colorScheme === "dark" ? "active" : ""}`}
          onClick={() => handleSchemeChange("dark")}
          aria-label="Dark theme"
          title="Dark mode"
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
        aria-label="Auto theme (follows system)"
        title="Follow system preference"
      >
        <span className="theme-btn-icon">◐</span>Auto
      </button>
      <button
        className={`theme-btn ${colorScheme === "light" ? "active" : ""}`}
        onClick={() => handleSchemeChange("light")}
        aria-label="Light theme"
        title="Light mode"
      >
        <span className="theme-btn-icon">☀</span>Light
      </button>
      <button
        className={`theme-btn ${colorScheme === "dark" ? "active" : ""}`}
        onClick={() => handleSchemeChange("dark")}
        aria-label="Dark theme"
        title="Dark mode"
      >
        <span className="theme-btn-icon">☽</span>Dark
      </button>
    </span>
  )
}

export default ThemeToggle
