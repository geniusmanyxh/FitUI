/**
 *  @description 整理所有图标内容
 *  @author 天界程序员
 */

/** logo相关的安全列表，以及logo对象集合 */
import { logoSafelist, logoObj } from './logo_icon'


/** logo相关图标的联合类型 */
import type { LogoIconValues } from './logo_icon'


export type allIconType = LogoIconValues
export const allIconSafelist = [...logoSafelist]
export const allIconObj = {...logoObj}