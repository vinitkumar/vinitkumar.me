import * as React from "react"

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/AvenirLTProBook.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="avenir-pro-book"
    />,
    <link
      rel="preload"
      href="/fonts/AvenirLTProHeavy.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="avenir-pro-heavy"
    />,
    <link
      rel="preload"
      href="/fonts/Inconsolata-lgc-ep.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="inconsolata-code"
    />,
  ])
  
  // Load the deckdeckgo highlight-code web component script
  // This ensures code highlighting works on direct page loads (not just client-side navigation)
  setPostBodyComponents([
    <script
      key="deckdeckgo-highlight-code"
      type="module"
      src="https://unpkg.com/@deckdeckgo/highlight-code@latest/dist/deckdeckgo-highlight-code/deckdeckgo-highlight-code.esm.js"
    />,
  ])
}
