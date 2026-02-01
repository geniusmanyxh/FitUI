export type ResultStatusType = 'success' | 'error' | 'info' | 'warning' | '404' | '500'

export interface ResultProps {
  status?: ResultStatusType
  title?: string
  subTitle?: string
  icon?: string
}

export interface ResultEmits {
  (e: 'click', event: MouseEvent): void
}
