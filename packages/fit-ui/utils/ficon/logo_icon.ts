/**
 * @deprecated logo相关图标
 * @author 天界程序员
 */
import type { IconType } from './icon_type'
const logoArr = [
  'google',
  'baidu',
  'apple',
  'github',
  'typescript',
  'android',
  'windows',
  'edge'
] as const
const logoObj:IconType = {}

logoArr.forEach((val)=>{
  logoObj[val] = `i-bxl-${val}`
})

export type LogoIconValues = typeof logoArr[number];
export const logoSafelist = logoArr.map(val=>`i-bxl-${val}`)
export  { logoObj }