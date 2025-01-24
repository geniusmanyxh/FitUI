import { presetUno, presetAttributify, presetIcons } from 'unocss'
import Unocss from 'unocss/vite'
// import type { IconsOptions } from '@unocss/preset-icons'
import  transformerDirectives from '@unocss/transformer-directives'
import { allIconSafelist } from '../utils/ficon'
const colors = [
  'white',
  'black',
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
]

const safelist = [
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-700`),
  ...allIconSafelist,
]

export default () =>
  Unocss({
    safelist,
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        prefix: 'i-',
        extraProperties: {
          display: 'inline-block',
        },
      }),
    ],
    // transformCSS: true,
    transformers: [
      transformerDirectives()
    ]
  })
