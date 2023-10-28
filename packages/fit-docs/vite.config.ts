import { defineConfig } from 'vite'
import  vueJsxPlugin  from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// import Unocss from './config/unocss'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    // 添加JSX插件
    vueJsxPlugin(),
    VueSetupExtend()
  ]
})
