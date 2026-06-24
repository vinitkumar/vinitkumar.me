import Typography from "typography"
const typography = new Typography({
  baseFontSize: "17px",
  baseLineHeight: 1.6,
  headerFontFamily: ["Berka Text", "system-ui", "sans-serif"],
  bodyFontFamily: ["Berka Text", "system-ui", "sans-serif"],
})
// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
