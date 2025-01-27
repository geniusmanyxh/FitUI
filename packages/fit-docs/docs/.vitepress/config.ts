import type { UserConfig } from 'vitepress'
import { envVal } from './envConfig'
import viteConfig from '../../vite.config';
const sidebar = {
  '/': [
    {
      text: 'Guide',
      items: [
        { text: '快速开始', link: '/guide/started' },
      ]
    },
    {
      text: 'Components',
      items: [
        { text: 'FButton', link: '/components/button/' },
        { text: 'FIcon', link: '/components/icon/' },
        { text: 'FToolTip', link: '/components/tooltip/' },
        { text: 'FMessage', link: '/components/message/' },
        { text: 'FCodeBlock', link: '/components/codeBlock/' },
      ]
    }
  ]
}
const config: UserConfig = {
  base: envVal.VITE_BASE_URL,
  title: 'Fit-UI',
  description: 'Vue 3 组件库.',
  head: [
    ['link', { rel: 'icon', href: '/Fit.png' }],
  ],
  themeConfig: {
    sidebar,
    siteTitle: false,
    logo: '/Fit.png',
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 天界程序员'
    },
    nav: [
      { text: 'Guide', link: '/guide/started' },
      { text: 'Conponents', link: '/components/button/' },
      { text: 'Changelog', link: 'https://github.com/geniusmanyxh/FitUI/blob/master/CHANGELOG.md' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/geniusmanyxh/FitUI' },
    ]
  },
  markdown: {
    config: (md) => {
      // md.use(demoblock)
    }
  },
  vite:{
    ...viteConfig as any
  }
}
export default config