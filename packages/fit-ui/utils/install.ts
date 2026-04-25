import type { App, Plugin, Component } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T extends Component>(comp: T) => {
  const name = (comp as Component).name || (comp as Component).__name || 'UnknownComponent'
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    app.component(name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}