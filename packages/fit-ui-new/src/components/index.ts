import { App } from 'vue'
import {default as FIcon} from './icon/index'
import {default as FButton } from './button/index'

const components = [FIcon,FButton ]
export default {
  install(app: App) {
    components.forEach((c) => app.use(c))
  },
}