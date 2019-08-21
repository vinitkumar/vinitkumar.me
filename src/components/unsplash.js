import React from 'react';

// Constants
const PATH = "//source.unsplash.com"
const USER = "user"
const COLLECTION = "collection"
const DAILY = "daily"
const RANDOM = "random"
const WIDTH = 1080
const HEIGHT = 720
const DEFAULT_STYLES = {
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto"
}
const EXPAND_STYLES = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 0
}

// Helper to generate url for unsplash
const generateUrl = (
  width,
  height,
  keywords,
) => {
  const url = [PATH]

  url.push(`${width}x${height}`)
  if (keywords) url.push(`?${keywords.replace(/\s/g, "")}`)

  return url.join("/")
}


function GetUnsplashURL(keywords) {
  const url = encodeURI(
    generateUrl(
      1080,
      720,
      keywords
    )
  )
  return url;
}


export default GetUnsplashURL;
