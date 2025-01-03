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
    --cap-height: calc(1rem * 12.5 / 16);
    --cap-ratio: calc(1 / 0.698);

    --gap: var(--cap-height);
    --font-smaller: calc(var(--cap-height) * 11 / 12 * var(--cap-ratio));
    --font-small: calc(var(--cap-height) * 10 / 12 * var(--cap-ratio));
    --width: 575px;
    --border: 1.5px;
    --radius: calc(var(--cap-height) / 3);
    --gray-text: rgba(0, 0, 0, 0.4);
    --gray-line: rgba(0, 0, 0, 0.2);
    --gray-bg: rgba(0, 0, 0, 0.06);
    --text: #000;
  }
  body {
    font-family: 'Atkinson', sans-serif;
    font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
    font-size: calc(var(--cap-height) * var(--cap-ratio));
    font-feature-settings: "kern" 1,"liga" 1,"calt" 1;
    text-rendering: optimizeLegibility;
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: inherit;
    text-decoration: none;
    border-bottom: var(--border) solid var(--gray-line);
  }
  .btn-action { text-decoration: none; background: var(--gray-bg); border: none; padding: 0 7px; display: inline-block; border-radius: 4px; }
  .btn-action:hover { background: rgba(0,0,0,0.2); }
  h1, h2, h3, h4, h4 {
      font-family: 'Atkinson', sans-serif;
      font-weight: normal;
  }
  pre {
    font-variant-ligatures: none;
  }
  :not(pre) > code[class*="language-"] {
    font-family: 'Atkinson', sans-serif;
    background: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 1);
  }
  pre[class*="language-"],
  :not(pre) > code[class*="language-"] {
    border: 0;
  }
  pre[class*="language-"] {
    background: rgba(0, 0, 0, 0.02);
  }
  pre[class*="language-"] > code {
    font-family: 'IBM Plex Sans', sans-serif;
    background: none;
  }
  .recommendations-container {
    padding: 20px 20px 20px 0; 
    max-width: 1200px;
    margin: 0 auto;
  }

  .heading {
    text-align: left;
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .recommendation-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .recommendation-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .avatar {
    width: 50px;
    height: 50px;
    background-color: var(--gray-bg);
    color: inherit;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-right: 15px;
  }

  .info {
    flex-grow: 1;
  }

  .name {
    font-size: 1.25rem;
    margin: 0;
  }

  .job-title {
    font-size: 0.9rem;
    color: #666;
  }

  .recommendation-text {
    font-size: 1rem;
    margin: 15px 0;
  }

  .creation-date {
    font-size: 0.8rem;
    color: #888;
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
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
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
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Satoshi, sans-serif`,
            marginTop: 0,
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
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: `78rem`,
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <a href="/" className="back-link">Back to Home</a>
        <GlobalStyle />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Vinit Kumar
        </footer>
      </div>
    )
  }
}

export default Layout
