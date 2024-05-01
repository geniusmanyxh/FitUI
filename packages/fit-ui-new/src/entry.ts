import { App } from 'vue'
import {default as FIcon} from './components/icon'
import {default as FButton } from './components/button'

export {
  FButton,FIcon
}

const components = [FButton,FIcon]

const install = (app: App):any => {
  components.forEach((c) => app.use(c))
}
export default {
  install
}

