import React from "react"
import { Link } from "gatsby"
import { Analytics } from '@vercel/analytics/react';

import { rhythm, scale } from "../utils/typography"

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
