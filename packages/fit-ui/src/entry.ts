import { App } from 'vue'
import { default as FButton } from './FButton'
import { default as FIcon } from './FIcon'
import { default as FMessage } from './FMessage'
import { default as FCodeBlock } from './FCodeBlock'
import { default as FToolTip } from './FToolTip'
import { default as FTag } from './FTag'

import 'uno.css'
import './index.scss'
import '@fstyles/theme/css-var.css'
import {useMessage} from '@utils/tsHooks/useMessage'

export { useMessage }
export { FButton, FIcon, FMessage,FCodeBlock,FToolTip,FTag }

const components = [FButton, FIcon, FMessage, FCodeBlock,FToolTip,FTag]
const install = (app: App):any => {
  components.forEach((c) => app.use(c))
}

export default {
  install
}
