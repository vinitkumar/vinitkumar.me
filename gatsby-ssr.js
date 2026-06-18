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

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <meta
      key="theme-color-light"
      name="theme-color"
      content="#F9F6EE"
      media="(prefers-color-scheme: light)"
    />,
    <meta
      key="theme-color-dark"
      name="theme-color"
      content="#000000"
      media="(prefers-color-scheme: dark)"
    />,
  ])
  
  setPreBodyComponents([
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />,
  ])
}
