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
  --mint:  #00FFB2;
  --mintpro: #00E6A1;
    --text: #000;
  }
  html,
  body {
    font-family: IBM\Plex\Sans, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    height: 100%;
    line-height: 1.5;
  }


  @font-face {
    font-family: IBM Plex Sans;
    src: url(/fonts/IBMPlexSans-Regular-Latin1.woff2) format("woff2");
  }
  @font-face {
    font-family: IBM Plex Sans;
    font-style: italic;
    src: url(/fonts/IBMPlexSans-Italic-Latin1.woff2) format("woff2");
  }
  @font-face {
    font-family: IBM Plex Sans;
    font-weight: 600;
    src: url(/fonts/IBMPlexSans-SemiBold-Latin1.woff2) format("woff2");
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
    color: inherit;
    text-decoration: none;
    border-bottom: var(--border) solid var(--gray-line);
  }
  .btn-action { text-decoration: none; background: var(--mint); border: none; padding: 0 7px; display: inline-block; border-radius: 4px; }
  .btn-action:hover { background: var(--mintpro);      box-shadow: 0 4px 12px rgba(0, 255, 178, 0.3);}
  h1, h2, h3, h4, h4 {
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 300;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: Inconsolata-lgc-ep, Consolas, Monaco, monospace;
  }
  code,
  pre {
    white-space: pre-wrap;
  }

  pre {
    font-variant-ligatures: none;
  }
  :not(pre) > code[class*="language-"] {
    font-family: Inconsolata-lgc-ep, Consolas, Monaco, monospace;
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
    font-family: Inconsolata-lgc-ep, Consolas, Monaco, monospace;
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
