import * as React from "react"

const themeScript = `
(function() {
  try {
    var scheme = localStorage.getItem('colorScheme');
    if (scheme === 'dark' || scheme === 'light') {
      document.documentElement.setAttribute('data-theme', scheme);
    }
  } catch (e) {}
})();
`

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/CommitMono-400-Regular.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="commit-mono-regular"
    />,
    <link
      rel="preload"
      href="/fonts/CommitMono-700-Regular.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="commit-mono-bold"
    />,
  ])
  
  setPreBodyComponents([
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{ __html: themeScript }}
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
