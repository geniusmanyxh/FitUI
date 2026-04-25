import type { App } from 'vue'
import { 
  FButton, FIcon, FInput, FInputNumber, FMessage, FCodeBlock, FToolTip, FTag, FSwitch, FCheckbox, FModal, FRadio, FLoading, FAlert, FTabs, FDropdown, FSelect, FForm, FFormItem, FTextarea, FTable, FPagination, FCard, FDivider, FEmpty, FBadge, FAvatar, FProgress, FMenu, FBreadcrumb, FDrawer, FPopover, FNotification, FSkeleton, FResult,
  FDatePicker, FTimePicker, FSlider, FRate, FSpace, FScrollbar, FBacktop, FWatermark, FTimeline, FTimelineItem, FSteps, FStep, FDescriptions, FImage, FMessageBox, FPopconfirm
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
import './FDatePicker/style'
import './FTimePicker/style'
import './FSlider/style'
import './FRate/style'
import './FSpace/style'
import './FScrollbar/style'
import './FBacktop/style'
import './FWatermark/style'
import './FTimeline/style'
import './FSteps/style'
import './FDescriptions/style'
import './FImage/style'
import './FMessageBox/style'
import './FPopconfirm/style'

import { useMessage } from '@utils/tsHooks/useMessage'
import { useNotification } from '@utils/tsHooks/useNotification'
import { useLoading } from '@utils/tsHooks/useLoading'

export { useMessage, useNotification, useLoading }

export { 
  FButton, FIcon, FInput, FInputNumber, FMessage, FCodeBlock, FToolTip, FTag, FSwitch, FCheckbox, FModal, FRadio, FLoading, FAlert, FTabs, FDropdown, FSelect, FForm, FFormItem, FTextarea, FTable, FPagination, FCard, FDivider, FEmpty, FBadge, FAvatar, FProgress, FMenu, FBreadcrumb, FDrawer, FPopover, FNotification, FSkeleton, FResult,
  FDatePicker, FTimePicker, FSlider, FRate, FSpace, FScrollbar, FBacktop, FWatermark, FTimeline, FTimelineItem, FSteps, FStep, FDescriptions, FImage, FMessageBox, FPopconfirm 
}

const components = [
  FButton, FIcon, FInput, FInputNumber, FMessage, FCodeBlock, FToolTip, FTag, FSwitch, FCheckbox, FModal, FRadio, FLoading, FAlert, FTabs, FDropdown, FSelect, FForm, FFormItem, FTextarea, FTable, FPagination, FCard, FDivider, FEmpty, FBadge, FAvatar, FProgress, FMenu, FBreadcrumb, FDrawer, FPopover, FNotification, FSkeleton, FResult,
  FDatePicker, FTimePicker, FSlider, FRate, FSpace, FScrollbar, FBacktop, FWatermark, FTimeline, FTimelineItem, FSteps, FStep, FDescriptions, FImage, FMessageBox, FPopconfirm
]

const install = (app: App): void => {
  components.forEach((c) => app.use(c))
}

export default {
  install
}
