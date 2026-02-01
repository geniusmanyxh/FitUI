export type MenuModeType = 'vertical' | 'horizontal'
export type MenuThemeType = 'light' | 'dark'

export interface MenuItem {
  key: string
  label?: string
  icon?: string
  disabled?: boolean
  children?: MenuItem[]
}

export interface MenuProps {
  mode?: MenuModeType
  theme?: MenuThemeType
  defaultActive?: string
  collapse?: boolean
  items?: MenuItem[]
}

export interface MenuEmits {
  (e: 'select', key: string, item: MenuItem): void
  (e: 'open', key: string, item: MenuItem): void
  (e: 'close', key: string, item: MenuItem): void
}
