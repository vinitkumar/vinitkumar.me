import * as React from "react"

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/AvenirLTProBook.otf"
      as="font"
      type="font/opentype"
      crossOrigin="anonymous"
      key="avenir-pro-regular"
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
