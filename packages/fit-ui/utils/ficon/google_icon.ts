/**
 * @deprecated logo相关图标
 * @author 天界程序员
 */
import type { IconType } from './icon_type'
const googleArr = [
  'baseline-code',
  'baseline-code-off',
  'baseline-qr-code',
  'baseline-qr-code-scanner',
  'baseline-fullscreen',
  'baseline-fullscreen-exit',
] as const
const googleObj:IconType = {}

googleArr.forEach((val)=>{
    googleObj[val] = `i-ic-${val}`
})

export type GoogleIconValues = typeof googleArr[number];
export const googleSafelist = googleArr.map(val=>`i-ic-${val}`)
export  { googleObj }