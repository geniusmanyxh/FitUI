import type { SizeType } from './size_type'

const btnSize:SizeType[] | string [] = ['small','medium','large'] 

const btnSizeClass:{[k:string]:string} = {}

btnSize.forEach(val => {
  btnSizeClass[val] = val + '_but'
})

export { btnSizeClass }