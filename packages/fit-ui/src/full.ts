import type { App } from 'vue'
import { FButton, FIcon, FInput, FMessage, FCodeBlock, FToolTip, FTag, FSwitch, FCheckbox, FModal, FRadio, FLoading, FAlert, FTabs, FDropdown } from './components'

// 全量引入所有样式（不包含 UnoCSS，用户需要自己配置）
import './index.scss'
import '@fstyles/theme/css-var.css'
// import 'uno.css'

// 引入所有组件样式
import './FButton/style'
import './FIcon/style'
import './FInput/style'
import './FMessage/style'
import './FCodeBlock/style'
import './FToolTip/style'
import './FTag/style'
import './FSwitch/style'
import './FCheckbox/style'
import './FModal/style'
import './FRadio/style'
import './FLoading/style'
import './FAlert/style'
import './FTabs/style'
import './FDropdown/style'

import {useMessage} from '@utils/tsHooks/useMessage'

export { useMessage }
export { FButton, FIcon, FInput, FMessage, FCodeBlock, FToolTip, FTag, FSwitch, FCheckbox, FModal, FRadio, FLoading, FAlert, FTabs, FDropdown }

const components = [FButton, FIcon, FInput, FMessage, FCodeBlock, FToolTip, FTag, FSwitch, FCheckbox, FModal, FRadio, FLoading, FAlert, FTabs, FDropdown]

const install = (app: App):any => {
  components.forEach((c) => app.use(c))
}

export default {
  install
}
