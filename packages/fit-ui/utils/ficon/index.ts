
/**
 *  @description 整理所有图标内容
 *  @author 天界程序员
 */

/** logo相关的安全列表，以及logo对象集合 */
import { logoSafelist, logoObj } from './logo_icon'
import { monoSafelist, monoObj } from './mono_icon'
import { googleSafelist, googleObj} from './google_icon'


/** logo相关图标的联合类型 */
import type { LogoIconValues } from './logo_icon'
import type { MonoIconValues } from './mono_icon';
import type { GoogleIconValues } from './google_icon';


export type allIconType = LogoIconValues | MonoIconValues | GoogleIconValues;
export const allIconSafelist = [...logoSafelist,...monoSafelist,...googleSafelist]
export const allIconObj = {...logoObj,...monoObj,...googleObj}
