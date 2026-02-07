import type { App } from 'vue'
import {
  FButton, FButtonGroup,
  FIcon,
  FInput, FInputNumber, FTextarea,
  FSelect,
  FCheckbox, FCheckboxGroup,
  FRadio, FRadioGroup,
  FSwitch,
  FForm, FFormItem,
  FMessage, FCodeBlock, FToolTip, FTag,
  FModal, FLoading, FAlert,
  FTabs, FTabPane,
  FDropdown, FDropdownMenu, FDropdownItem,
  FTable, FPagination, FCard, FDivider, FEmpty,
  FBadge, FAvatar, FProgress,
  FMenu,
  FBreadcrumb, FBreadcrumbItem,
  FDrawer, FPopover, FNotification,
  FSkeleton, FSkeletonItem,
  FResult
} from './components'

// 全量引入所有样式（不包含 UnoCSS，用户需要自己配置）
import './index.scss'
import '@fstyles/theme/css-var.css'

// 引入所有组件样式
import './FButton/style'
import './FIcon/style'
import './FInput/style'
import './FInputNumber/style'
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
import './FSelect/style'
import './FForm/style'
import './FTextarea/style'
import './FTable/style'
import './FPagination/style'
import './FCard/style'
import './FDivider/style'
import './FEmpty/style'
import './FBadge/style'
import './FAvatar/style'
import './FProgress/style'
import './FMenu/style'
import './FBreadcrumb/style'
import './FDrawer/style'
import './FPopover/style'
import './FNotification/style'
import './FSkeleton/style'
import './FResult/style'

import { useMessage } from '@utils/tsHooks/useMessage'

// v-loading directive
import vLoading from './FLoading/directive'

export { useMessage }
export {
  FButton, FButtonGroup,
  FIcon,
  FInput, FInputNumber, FTextarea,
  FSelect,
  FCheckbox, FCheckboxGroup,
  FRadio, FRadioGroup,
  FSwitch,
  FForm, FFormItem,
  FMessage, FCodeBlock, FToolTip, FTag,
  FModal, FLoading, FAlert,
  FTabs, FTabPane,
  FDropdown, FDropdownMenu, FDropdownItem,
  FTable, FPagination, FCard, FDivider, FEmpty,
  FBadge, FAvatar, FProgress,
  FMenu,
  FBreadcrumb, FBreadcrumbItem,
  FDrawer, FPopover, FNotification,
  FSkeleton, FSkeletonItem,
  FResult,
  vLoading,
}

const components = [
  FButton, FButtonGroup,
  FIcon,
  FInput, FInputNumber, FTextarea,
  FSelect,
  FCheckbox, FCheckboxGroup,
  FRadio, FRadioGroup,
  FSwitch,
  FForm, FFormItem,
  FMessage, FCodeBlock, FToolTip, FTag,
  FModal, FLoading, FAlert,
  FTabs, FTabPane,
  FDropdown, FDropdownMenu, FDropdownItem,
  FTable, FPagination, FCard, FDivider, FEmpty,
  FBadge, FAvatar, FProgress,
  FMenu,
  FBreadcrumb, FBreadcrumbItem,
  FDrawer, FPopover, FNotification,
  FSkeleton, FSkeletonItem,
  FResult,
]

const install = (app: App): any => {
  components.forEach((c) => app.use(c))
  // Register v-loading directive globally
  app.directive('loading', vLoading)
}

export default {
  install
}
