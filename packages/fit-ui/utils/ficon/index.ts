
/**
 *  @description 整理所有图标内容
 *  @author 天界程序员
 */

/** logo相关的安全列表，以及logo对象集合 */
import { logoSafelist, logoObj } from './logo_icon'
import { monoSafelist, monoObj } from './mono_iocn'


/** logo相关图标的联合类型 */
import type { LogoIconValues } from './logo_icon'
import type { MonoIconValues } from './mono_iocn';

export type allIconType = LogoIconValues | MonoIconValues;
export const allIconSafelist = [...logoSafelist,...monoSafelist]
export const allIconObj = {...logoObj,...monoObj}