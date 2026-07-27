import * as React from "react"
import berkaTextRegular from "./src/fonts/berka-text/BerkaText-Regular.woff2"
import berkaTextSemiBold from "./src/fonts/berka-text/BerkaText-SemiBold.woff2"
import berkaTextBold from "./src/fonts/berka-text/BerkaText-Bold.woff2"

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
    <link
      key="preload-berka-text-regular"
      rel="preload"
      href={berkaTextRegular}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="preload-berka-text-semibold"
      rel="preload"
      href={berkaTextSemiBold}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="preload-berka-text-bold"
      rel="preload"
      href={berkaTextBold}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
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
