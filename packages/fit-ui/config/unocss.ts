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
  ...colors.map((v) => `bg-${v}-50`),
  ...colors.map((v) => `bg-${v}-100`),
  ...colors.map((v) => `bg-${v}-200`),
  ...colors.map((v) => `bg-${v}-300`),
  ...colors.map((v) => `bg-${v}-400`),
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `bg-${v}-700`),
  ...colors.map((v) => `hover:bg-${v}-700`),
  ...colors.map((v) => `text-${v}-300`),
  ...colors.map((v) => `text-${v}-400`),
  ...colors.map((v) => `text-${v}-500`),
  ...colors.map((v) => `border-${v}-50`),
  ...colors.map((v) => `border-${v}-100`),
  ...colors.map((v) => `border-${v}-200`),
  ...colors.map((v) => `border-${v}-300`),
  ...colors.map((v) => `border-${v}-500`),
  ...allIconSafelist,
]

export default () =>
  Unocss({
    mode: 'dist-chunk',  // 编译到构建产物
    inspector: false,
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
