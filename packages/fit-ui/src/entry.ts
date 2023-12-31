import { App } from 'vue'
import { default as FButton } from './FButton'
import { default as FIcon } from './FIcon'
import { default as FMessage } from './FMessage'
import 'uno.css'
export { FButton, FIcon, FMessage }

const components = [FButton, FIcon, FMessage]
export default {
  install(app: App) {
    components.forEach((c) => app.use(c))
  },
}
