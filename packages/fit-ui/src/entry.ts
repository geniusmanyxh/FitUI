import { App } from 'vue'
import { default as FButton } from './FButton'
import { default as FIcon } from './FIcon'
import { default as FMessage } from './FMessage'
import 'uno.css'
import './index.scss'
import {useMessage} from '@utils/tsHooks/useMessage'

export { useMessage }
export { FButton, FIcon, FMessage }

const components = [FButton, FIcon, FMessage]
const install = (app: App):any => {
  components.forEach((c) => app.use(c))
}

export default {
  install
}
