import React from "react"
import { Link } from "gatsby"
import { Analytics } from '@vercel/analytics/react';
import styled, { createGlobalStyle } from "styled-components"

import { rhythm, scale } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
  :root {
    --text: #2c3338;
    --accent: #3b82f6;
    --gray-text: #6b7280;
    --gray-line: #e5e7eb;
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

class HomeLayout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <>
          <h1
            style={{
              ...scale(1.5),
              marginBottom: rhythm(0.5),
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                fontWeight: 100,
                fontSize: `54px`,
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
            padding: '1rem 0',
          }}>
            <Link 
              to="/about" 
              style={{ 
                marginRight: '2rem',
                textDecoration: 'none',
                color: 'inherit',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                fontWeight: '400',
                letterSpacing: '0.01em',
              }}
            >
              About
            </Link>
            <Link 
              to="/stats" 
              style={{ 
                marginRight: '2rem',
                textDecoration: 'none',
                color: 'inherit',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                fontWeight: '400',
                letterSpacing: '0.01em',
              }}
            >
              Stats
            </Link>
            <Link 
              to="/recommendations" 
              style={{ 
                marginRight: '2rem',
                textDecoration: 'none',
                color: 'inherit',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                fontWeight: '400',
                letterSpacing: '0.01em',
              }}
            >
              Recommendations
            </Link>
            <a 
              href="https://vinitkumar.github.io/vinitkumar.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                marginRight: '2rem',
                textDecoration: 'none',
                color: 'inherit',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                fontWeight: '400',
                letterSpacing: '0.01em',
              }}
            >
              Resume
            </a>
            <a 
              href="https://www.linkedin.com/in/vinitatlinkedin/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                marginRight: '2rem',
                textDecoration: 'none',
                color: 'inherit',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                fontWeight: '400',
                letterSpacing: '0.01em',
              }}
            >
              LinkedIn
            </a>
            <a 
              href="https://x.com/vinitkme" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                marginRight: '2rem',
                textDecoration: 'none',
                color: 'inherit',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                fontWeight: '400',
                letterSpacing: '0.01em',
              }}
            >
              Twitter
            </a>
            <a 
              href="https://github.com/vinitkumar" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                textDecoration: 'none',
                color: 'inherit',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                fontWeight: '400',
                letterSpacing: '0.01em',
              }}
            >
              GitHub
            </a>
          </nav>
        </>
      )
    } else {
      header = (
        <h1
          style={{
            fontFamily: `Satoshi, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              fontWeight: 100,
              fontSize: `54px`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
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
        <Analytics />
        <footer>
          © {new Date().getFullYear()}, Vinit Kumar
        </footer>
      </div>
    )
  }
}

export default HomeLayout
