import { App } from 'vue'
import { default as FButton } from './FButton'
import { default as FIcon } from './FIcon'
import 'uno.css'
export { FButton, FIcon }

const components = [FButton, FIcon]
export default {
  install(app: App) {
    components.forEach((c) => app.use(c))
  },
}
