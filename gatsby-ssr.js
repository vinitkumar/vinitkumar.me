import * as React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/NebulaSans-Book.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="nebulasans-regular"
    />,
  ])
}
