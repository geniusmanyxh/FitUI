import { presetUno, presetAttributify, presetIcons } from 'unocss'
import Unocss from 'unocss/vite'
// import type { IconsOptions } from '@unocss/preset-icons'
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

const Icons = [
  'search',
  'edit',
  'check',
  'message',
  'star-off',
  'delete',
  'add',
  'share',
]

const safelist = [
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-700`),
  ...Icons.map((v) => `i-ic-baseline-${v}`),
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
  })
