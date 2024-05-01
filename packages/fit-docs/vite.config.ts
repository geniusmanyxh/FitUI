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
  ],
  // build: {
  //   target:''
  // },
  server: {
    port: 8443,
    // host: '0.0.0.0',
    open: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
