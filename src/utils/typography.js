import Typography from "typography"
import funstonTheme from 'typography-theme-funston'

funstonTheme.baseFontSize = '22px'
const typography = new Typography({
    baseFontSize: "24px",
    baseLineHeight: 1.4,
    headerFontFamily: ['Public Sans', 'sans-serif'],
    bodyFontFamily: ['Public Sans', 'sans-serif'],
  }
)
// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
