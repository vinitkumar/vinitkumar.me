import React from "react"
import { Link } from "gatsby"
import {createGlobalStyle} from "styled-components"

import { rhythm, scale } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
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
    font-family: 'IBM Plex Sans', sans-serif;
    font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
    font-size: calc(var(--cap-height) * var(--cap-ratio));
    font-feature-settings: "kern" 1,"liga" 1,"calt" 1;
    text-rendering: optimizeLegibility;
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h4 {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: normal;
  }
  pre {
    font-variant-ligatures: none;
  }
  :not(pre) > code[class*="language-"] {
    font-family: 'IBM Plex Sans', sans-serif;
    background: rgba(0, 0, 0, 0.08);
    color: rbga(0, 0, 0, 1);
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
