import React from "react"
import { Link } from "gatsby"
import {createGlobalStyle} from "styled-components"

import { rhythm, scale } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; }
  :target { scroll-margin-block: 5ex; }
  img, picture, video, canvas, svg { display: block; max-width: 100%; height: auto; }
  p, h1, h2, h3 { overflow-wrap: break-word; }
  body { min-height: 100vh; }
  
  :root {
    --font-base: 1rem;
    --font-small: 0.875rem;
    --font-smaller: 0.75rem;
    --width: 575px;
    --border: 1px;
    --radius: 0;
    --gray-text: rgba(51, 51, 51, 0.6);
    --gray-line: rgba(51, 51, 51, 0.1);
    --gray-bg: rgba(51, 51, 51, 0.02);
    --accent: #2c3338;
    --accent-hover: #000000;
    --text: #2c3338;
    --background: #fcfcfc;
    --terminal-green: #00ff00;
  }

  html,
  body {
    font-family: 'Nebula Sans', sans-serif;
    font-size: var(--font-base);
    font-weight: 400;
    height: 100%;
    line-height: 1.6;
    background-color: var(--background);
    color: var(--text);
  }

  @font-face {
    font-family: Nebula Sans;
    src: url(/fonts/NebulaSans-Book.woff2) format("woff2");
  }
  @font-face {
    font-family: Nebula Sans;
    font-style: italic;
    src: url(/fonts/NebulaSans-BookItalic.woff2) format("woff2");
  }
  @font-face {
    font-family: Nebula Sans;
    font-weight: 600;
    src: url(/fonts/NebulaSans-Bold.woff2) format("woff2");
  }
  @font-face {
    font-family: Inconsolata-lgc-ep;
    font-weight: 400;
    src: url(/fonts/Inconsolata-lgc-ep.woff2) format("woff2");
  }
  @font-face {
    font-family: Inconsolata-lgc-ep;
    font-weight: 700;
    src: url(/fonts/Inconsolata-lgc-bold-ep.woff2) format("woff2");
  }

  a {
    color: var(--text);
    text-decoration: none;
  }

  a:hover {
    color: var(--accent-hover);
  }

  .btn-action-latest { 
    text-decoration: none; 
    background: var(--accent);
    color: white;
    border: none;
    padding: 0.25rem 0.75rem;
    font-size: var(--font-smaller);
    letter-spacing: 0.02em;
    display: inline-block;
    border-radius: 2px;
  }

  .btn-action-latest:hover { 
    color: var(--terminal-green);
  }

  nav {
    margin-bottom: 2rem;
    font-size: 1rem;
    border-top: 1px solid var(--gray-line);
    border-bottom: 1px solid var(--gray-line);
    padding: 1rem 0;
  }

  nav a {
    margin-right: 2rem;
    text-decoration: none;
    color: inherit;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    font-weight: 400;
    letter-spacing: 0.01em;
  }

  nav a:hover {
    background-color: var(--gray-bg);
    color: var(--accent-hover);
    transform: translateY(-1px);
  }

  nav a:last-child {
    margin-right: 0;
  }

  /* Hide or minimize blog stats completely */
  [class*="blog-stats"], 
  [class*="BlogStats"],
  .blog-stats,
  h3:has(+ *[class*="chart"]),
  h3:contains("Blog Stats") {
    display: none;
  }

  /* If the chart can't be hidden, make it minimal */
  svg[class*="chart"] rect,
  svg rect[fill="#1f77b4"],
  svg rect[fill*="blue"],
  .recharts-bar rect,
  .chart rect {
    fill: var(--gray-line) !important;
    opacity: 0.3 !important;
  }

  /* Post list improvements */
  .post-list {
    margin: 2rem 0;
  }

  .post-item {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: var(--border) solid var(--gray-line);
  }

  .post-item:last-child {
    border-bottom: none;
  }

  .post-date {
    font-size: var(--font-smaller);
    color: var(--gray-text);
    margin-bottom: 0.25rem;
  }

  .post-title {
    font-size: 1.25rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .post-description {
    font-size: var(--font-small);
    color: var(--gray-text);
    line-height: 1.5;
  }

  h1, h2, h3, h4, h4 {
    font-family: 'Nebula Sans', sans-serif;
    font-weight: 300;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: Inconsolata-lgc-ep, Consolas, Monaco, monospace;
    font-size: var(--font-small);
  }

  code,
  pre {
    white-space: pre-wrap;
    padding: 0.15em 0.3em;
  }

  pre {
    font-variant-ligatures: none;
  }

  :not(pre) > code[class*="language-"] {
    font-family: Inconsolata-lgc-ep, Consolas, Monaco, monospace;
    color: var(--text);
  }

  pre[class*="language-"] > code {
    font-family: Inconsolata-lgc-ep, Consolas, Monaco, monospace;
  }

  .recommendations-container {
    padding: var(--font-base);
    max-width: 1200px;
    margin: 0 auto;
  }

  .heading {
    text-align: left;
    font-size: 1.5rem;
    margin-bottom: var(--font-base);
    font-weight: 300;
  }

  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--font-base);
  }

  .recommendation-card {
    border-bottom: var(--border) solid var(--gray-line);
    padding: var(--font-base);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .recommendation-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--font-base);
  }

  .avatar {
    width: 40px;
    height: 40px;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    margin-right: var(--font-base);
    background-color: var(--gray-bg);
  }

  .info {
    flex-grow: 1;
  }

  .name {
    font-size: var(--font-base);
    margin: 0;
    font-weight: 400;
  }

  .job-title {
    font-size: var(--font-small);
    color: var(--gray-text);
  }

  .recommendation-text {
    font-size: var(--font-small);
    margin: var(--font-base) 0;
    line-height: 1.5;
  }

  .creation-date {
    font-size: var(--font-smaller);
    color: var(--gray-text);
    text-align: right;
  }
`;

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <>
          <h1
            style={{
              ...scale(1.2),
              marginBottom: rhythm(0.5),
              marginTop: 0,
              fontWeight: 300,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
                fontWeight: 100,
                fontSize: `54px`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
          <nav>
            <Link to="/about">About</Link>
            <Link to="/stats">Stats</Link>
            <Link to="/recommendations">Recommendations</Link>
            <a href="https://vinitkumar.github.io/vinitkumar.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
            <a href="https://www.linkedin.com/in/vinitatlinkedin/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/vinitkme" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://github.com/vinitkumar" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </>
      )
    } else {
      header = (
        <>
          <h1
            style={{
              fontFamily: `Nebula Sans, sans-serif`,
              marginTop: 0,
              fontWeight: 300,
              fontSize: `54px`,
              marginBottom: rhythm(0.5),
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
          <nav>
            <Link to="/about">About</Link>
            <Link to="/stats">Stats</Link>
            <Link to="/recommendations">Recommendations</Link>
            <a href="https://vinitkumar.github.io/vinitkumar.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
            <a href="https://www.linkedin.com/in/vinitatlinkedin/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/vinitkme" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://github.com/vinitkumar" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: `80rem`,
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <GlobalStyle />
        <header>{header}</header>
        <main>{children}</main>
        <footer style={{
          marginTop: rhythm(2),
          fontSize: '0.875rem',
          color: 'rgba(51, 51, 51, 0.6)',
        }}>
          © {new Date().getFullYear()}, Vinit Kumar
        </footer>
      </div>
    )
  }
}

export default Layout
