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
