import React from "react"
import ThemeToggle from "./ThemeToggle"

const Footer = () => {
  return (
    <footer className="site-footer">
      <p className="footer-copyright">
        © Copyright {new Date().getFullYear()} by Vinit Kumar.
      </p>
      <p className="footer-license">
        Content licensed under the{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative Commons attribution-noncommercial-sharealike License
        </a>
        .
      </p>
      <p className="footer-contact">
        Contact me via{" "}
        <a href="mailto:mail@vinitkumar.me">mail</a>,{" "}
        <a
          href="https://bsky.app/profile/vinitkme.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
        >
          bluesky
        </a>
        ,{" "}
        <a
          href="https://fosstodon.org/@vinitkme"
          target="_blank"
          rel="noopener noreferrer"
        >
          mastodon
        </a>
        ,{" "}
        <a
          href="https://x.com/intent/user?screen_name=vinitkme"
          target="_blank"
          rel="noopener noreferrer"
        >
          x
        </a>
        , or{" "}
        <a
          href="https://github.com/vinitkumar"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        .
      </p>
      <p className="footer-sponsor">
        You can sponsor me on{" "}
        <a
          href="https://github.com/sponsors/vinitkumar"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        .
      </p>
      <p className="footer-info">
        More info:{" "}
        <a href="/ai-transparency">AI transparency</a>. Subscribe via{" "}
        <a href="/rss.xml">RSS</a>.
      </p>
      <p className="footer-theme">
        <span>Theme:</span>
        <ThemeToggle />
      </p>
    </footer>
  )
}

export default Footer
