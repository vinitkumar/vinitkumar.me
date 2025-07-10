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
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 300;
    color: var(--text);
    line-height: 1.2;
  }

  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .recommendation-card {
    background: #ffffff;
    border: 1px solid var(--gray-line);
    border-radius: 12px;
    padding: 2rem;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  }

  .recommendation-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border-color: var(--accent);
  }

  .recommendation-card::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 4rem;
    font-weight: 300;
    color: var(--gray-line);
    line-height: 1;
    font-family: Georgia, serif;
  }

  .recommendation-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    margin-top: 1rem;
  }

  .avatar {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--accent) 0%, #4a5568 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 1rem;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(44, 51, 56, 0.15);
    letter-spacing: 0.5px;
  }

  .info {
    flex-grow: 1;
  }

  .name {
    font-size: 1.25rem;
    margin: 0 0 0.25rem 0;
    font-weight: 600;
    color: var(--text);
    line-height: 1.2;
  }

  .job-title {
    font-size: 0.9rem;
    color: var(--gray-text);
    margin: 0;
    line-height: 1.3;
    font-weight: 500;
  }

  .recommendation-text {
    font-size: 0.95rem;
    margin: 1.5rem 0;
    line-height: 1.6;
    color: var(--text);
    font-style: italic;
    position: relative;
  }

  .creation-date {
    font-size: 0.8rem;
    color: var(--gray-text);
    text-align: right;
    margin: 0;
    font-weight: 500;
    border-top: 1px solid var(--gray-line);
    padding-top: 1rem;
  }

  /* Blog Post Cards */
  .blog-posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .blog-post-card {
    background: #ffffff;
    border: 1px solid var(--gray-line);
    border-radius: 12px;
    padding: 2rem;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    height: fit-content;
  }

  .blog-post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border-color: var(--accent);
  }

  .blog-post-header {
    margin-bottom: 1.5rem;
  }

  .blog-post-title {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    font-weight: 600;
    color: var(--text);
    line-height: 1.3;
    transition: color 0.2s ease;
  }

  .blog-post-card:hover .blog-post-title {
    color: var(--accent);
  }

  .blog-post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .blog-post-date {
    font-size: 0.9rem;
    color: var(--gray-text);
    font-weight: 500;
  }

  .featured-badge {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 4px rgba(238, 90, 36, 0.3);
  }

  .blog-post-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text);
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  .blog-post-description p {
    margin: 0;
  }

  .blog-post-footer {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--gray-line);
  }

  .read-more-link {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .read-more-link:hover {
    color: var(--text);
    transform: translateX(4px);
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
          <nav style={{
            marginBottom: rhythm(1.5),
            fontSize: '1rem',
            borderTop: '1px solid rgba(51, 51, 51, 0.1)',
            borderBottom: '1px solid rgba(51, 51, 51, 0.1)',
            padding: '1.5rem 0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <Link 
              to="/about" 
              style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              👤 About
            </Link>
            <Link 
              to="/til" 
              style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              📚 TIL
            </Link>
            <Link 
              to="/stats" 
              style={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(139, 92, 246, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              📊 Stats
            </Link>
            <Link 
              to="/recommendations" 
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              ⭐ Recommendations
            </Link>
            <a 
              href="https://vinitkumar.github.io/vinitkumar.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              📄 Resume
            </a>
            <a 
              href="https://www.linkedin.com/in/vinitatlinkedin/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                background: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 119, 181, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              💼 LinkedIn
            </a>
            <a 
              href="https://x.com/vinitkme" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                background: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(29, 161, 242, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              🐦 Twitter
            </a>
            <a 
              href="https://github.com/vinitkumar" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(55, 65, 81, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              💻 GitHub
            </a>
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
          <nav style={{
            marginBottom: rhythm(1.5),
            fontSize: '1rem',
            borderTop: '1px solid rgba(51, 51, 51, 0.1)',
            borderBottom: '1px solid rgba(51, 51, 51, 0.1)',
            padding: '1.5rem 0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <Link 
              to="/about" 
              style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              👤 About
            </Link>
            <Link 
              to="/til" 
              style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              📚 TIL
            </Link>
            <Link 
              to="/stats" 
              style={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(139, 92, 246, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              📊 Stats
            </Link>
            <Link 
              to="/recommendations" 
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              ⭐ Recommendations
            </Link>
            <a 
              href="https://vinitkumar.github.io/vinitkumar.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              📄 Resume
            </a>
            <a 
              href="https://www.linkedin.com/in/vinitatlinkedin/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                background: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 119, 181, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              💼 LinkedIn
            </a>
            <a 
              href="https://x.com/vinitkme" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                background: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(29, 161, 242, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              🐦 Twitter
            </a>
            <a 
              href="https://github.com/vinitkumar" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                color: 'white',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(55, 65, 81, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              💻 GitHub
            </a>
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
