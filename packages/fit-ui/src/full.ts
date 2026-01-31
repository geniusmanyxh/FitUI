import type { App } from 'vue'
import { FButton, FIcon, FMessage, FCodeBlock, FToolTip, FTag } from './components'

// 全量引入所有样式（不包含 UnoCSS，用户需要自己配置）
import './index.scss'
import '@fstyles/theme/css-var.css'

// 引入所有组件样式
import './FButton/style'
import './FIcon/style'
import './FMessage/style'
import './FCodeBlock/style'
import './FToolTip/style'
import './FTag/style'

import {useMessage} from '@utils/tsHooks/useMessage'

export { useMessage }
export { FButton, FIcon, FMessage, FCodeBlock, FToolTip, FTag }

const components = [FButton, FIcon, FMessage, FCodeBlock, FToolTip, FTag]

const install = (app: App):any => {
  components.forEach((c) => app.use(c))
}

export default {
  install
}
