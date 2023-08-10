import Theme from 'vitepress/dist/client/theme-default/index.js'
import FitUI from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/dist/entry.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(FitUI)
  },
}