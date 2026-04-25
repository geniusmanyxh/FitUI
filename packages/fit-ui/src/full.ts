import type { App } from 'vue'
import {
  FButton, FButtonGroup,
  FIcon,
  FInput, FInputNumber, FTextarea,
  FSelect, FOption, FOptionGroup,
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
  // 新增组件
  FSpace, FScrollbar, FBacktop, FRate,
  FSlider, FTimePicker, FDatePicker,
  FDescriptions, FTimeline, FTimelineItem, FSteps, FStep,
  FWatermark, FImage, FMessageBox, FPopconfirm
} from './components'
import type { FormInstance, FormItemInstance } from './components'

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
import './FOption/style'
import './FOptionGroup/style'
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
// 新增组件样式
import './FSpace/style'
import './FScrollbar/style'
import './FBacktop/style'
import './FRate/style'
import './FSlider/style'
import './FTimePicker/style'
import './FDatePicker/style'
import './FDescriptions/style'
import './FTimeline/style'
import './FSteps/style'
import './FWatermark/style'
import './FImage/style'
import './FMessageBox/style'
import './FPopconfirm/style'

import { useMessage } from '@utils/tsHooks/useMessage'

// v-loading directive
import vLoading from './FLoading/directive'

export { useMessage }
export {
  FButton, FButtonGroup,
  FIcon,
  FInput, FInputNumber, FTextarea,
  FSelect, FOption, FOptionGroup,
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
  // 新增组件
  FSpace, FScrollbar, FBacktop, FRate,
  FSlider, FTimePicker, FDatePicker,
  FDescriptions, FTimeline, FTimelineItem, FSteps, FStep,
  FWatermark, FImage, FMessageBox, FPopconfirm
}

export type {
  FormInstance,
  FormItemInstance,
}

const components = [
  FButton, FButtonGroup,
  FIcon,
  FInput, FInputNumber, FTextarea,
  FSelect, FOption, FOptionGroup,
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
  // 新增组件
  FSpace, FScrollbar, FBacktop, FRate,
  FSlider, FTimePicker, FDatePicker,
  FDescriptions, FTimeline, FTimelineItem, FSteps, FStep,
  FWatermark, FImage, FMessageBox, FPopconfirm
]

const install = (app: App): void => {
  components.forEach((c) => app.use(c))
  // Register v-loading directive globally
  app.directive('loading', vLoading)
}

export default {
  install
}
