import type { allIconType } from '@utils/ficon'

export type MenuModeType = 'vertical' | 'horizontal'
export type MenuThemeType = 'light' | 'dark'

export interface MenuItem {
  key: string
  label?: string
  icon?: allIconType
  disabled?: boolean
  children?: MenuItem[]
}

export interface MenuProps {
  mode?: MenuModeType
  theme?: MenuThemeType
  defaultActive?: string
  collapse?: boolean
  items?: MenuItem[]
  router?: boolean
  defaultOpeneds?: string[]
  uniqueOpened?: boolean
  menuTrigger?: 'hover' | 'click'
  backgroundColor?: string
  textColor?: string
  activeTextColor?: string
  collapseTransition?: boolean
  ellipsis?: boolean
}

export interface MenuEmits {
  (e: 'select', key: string, item: MenuItem): void
  (e: 'open', key: string, item: MenuItem): void
  (e: 'close', key: string, item: MenuItem): void
}
