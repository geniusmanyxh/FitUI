import type { IconSize, SizeType} from './size_type'

const IconSizeMap = {
  large: '36px',
  medium: '24px',
  small: '12px',
} as const

/**
 * @description 计算图标的大小，返回对应尺寸
 * @param size 尺寸可以是 'large'|'medium' | 'small' | number
 * @returns 默认是medium大小，根据参数计算对应的尺寸大小, 如果是数字则直接返回
 */
export const computeIconSize = (size: IconSize = 'medium') => {
  const valType = typeof size
  if (valType === 'number') {
    return `${size}px`
  } else if (valType === 'string') {
    if (Object.keys(IconSizeMap).includes(size as string)) {
      return IconSizeMap[size as SizeType]
    } else {
      return IconSizeMap['medium']
    }
  } else {
    return IconSizeMap['medium']
  }
}

