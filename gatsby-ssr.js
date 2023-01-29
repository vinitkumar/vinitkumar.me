import * as React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/SpaceMono-Regular.ttf"
      as="font"
      type="font/tff"
      crossOrigin="anonymous"
      key="interFont"
    />,
  ])
}
