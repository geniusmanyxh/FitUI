import type { IconType } from './icon_type'
import monoArr from './mono_icon_arr'
const monoIcon = [...monoArr]
const monoObj:IconType = {}

monoIcon.forEach((item) => {monoObj[item] = `i-mi-${item}`})
export type MonoIconValues = typeof monoIcon[number]
export const monoSafelist = monoIcon.map((item) => `i-mi-${item}`)
export { monoObj } 