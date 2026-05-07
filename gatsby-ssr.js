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
  setHeadComponents([])
  
  setPreBodyComponents([
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />,
  ])
}
