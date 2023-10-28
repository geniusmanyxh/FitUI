import {type UserConfig, defineConfig } from 'vitepress'

const sidebar = {
  '/': [
    {
      text: 'Guide',
      items: [
        { text: '快速开始', link: '/' }, 
        { text: '通用', link: '/components/button/' }, 
      ]
    },
    {
      text: 'Components',
      items: [
        { text: '组件', link: '/components/' },
        { text: '按钮', link: '/components/button/' }, 
      ]
    }
  ]
}
const config:UserConfig = {
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