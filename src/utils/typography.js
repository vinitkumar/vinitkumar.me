import Typography from "typography"
const typography = new Typography({
  baseFontSize: "15px",
  baseLineHeight: 1.4,
  headerFontFamily: ["Crimson Pro", "Georgia", "serif"],
  bodyFontFamily: ["Crimson Pro", "Georgia", "serif"],
})
// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
