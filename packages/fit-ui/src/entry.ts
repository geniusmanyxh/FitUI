import { App } from 'vue'
import { default as FButton } from './FButton'
import { default as FIcon } from './FIcon'
import { default as FMessage } from './FMessage'
import { default as FCodeBlock } from './FCodeBlock'

import 'uno.css'
import './index.scss'
// import '@fstyles/global.scss'
import {useMessage} from '@utils/tsHooks/useMessage'

export { useMessage }
export { FButton, FIcon, FMessage,FCodeBlock }

const components = [FButton, FIcon, FMessage, FCodeBlock]
const install = (app: App):any => {
  components.forEach((c) => app.use(c))
}

export default {
  install
}
