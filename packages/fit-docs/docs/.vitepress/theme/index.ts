import Theme from 'vitepress/dist/client/theme-default/index.js'

import FitUI from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/dist/es/style.css'
// import demo from 'vitepress-demoblock/demo.vue'
import showDemo from '../components/showDemo/index.vue'
import './styles/index.scss'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(FitUI)
    app.component('sdemo',showDemo)
  },
}