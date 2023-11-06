import type {UserConfig}  from 'vitepress'
import { envVal } from './envConfig'
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
        { text: '按钮', link: '/components/button/' }, 
        { text: 'icon', link: '/components/icon/' }, 
      ]
    }
  ]
}
const config:UserConfig = {
  base:envVal.VITE_BASE_URL,
  themeConfig: {
    
    sidebar,
    siteTitle: false,
    logo:'/logo.png',
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 天界程序员'
    },
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Conponents', link: '/components/' },
      { text: 'Changelog', link: 'https://github.com/...' }
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
}
export default config