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
  },
  markdown: {
    config: (md) => {
      // md.use(demoblock)
  }
  },
}
export default config