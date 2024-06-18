import React from "react"
import { Link } from "gatsby"
import {createGlobalStyle} from "styled-components"

import { rhythm, scale } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'IBM Plex Mono', monospace;
    font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
    font-size: 15px;
    font-smoothing: antialiased;
    font-variant-ligatures: none;
  }
  h1, h2, h3, h4, h4 {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: normal;
  }
  pre {
    font-variant-ligatures: none;
  }
  :not(pre) > code[class*="language-"] {
    font-family: 'IBM Plex Mono', monospace;
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
    font-family: 'IBM Plex Mono', monospace;
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
