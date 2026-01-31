import type { ComponentResolver } from 'unplugin-vue-components'

export interface FitUIResolverOptions {
  /**
   * 导入样式类型
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'scss'
  
  /**
   * 组件前缀
   * @default 'F'
   */
  prefix?: string
}

function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function FitUIResolver(
  options: FitUIResolverOptions = {}
): ComponentResolver {
  const { importStyle = 'css', prefix = 'F' } = options

  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith(prefix)) {
        const componentName = name.slice(prefix.length)
        const kebabName = kebabCase(componentName)
        
        return {
          name,
          from: '@geniusmanyxh/fit-ui',
          sideEffects: importStyle
            ? `@geniusmanyxh/fit-ui/es/${kebabName}/style/${
                importStyle === 'scss' ? 'index' : 'css'
              }`
            : undefined,
        }
      }
    },
  }
}
