import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // 1、true时生成eslint配置文件，2、生成后改为false，避免重复消耗
      },
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    // 启用生产环境构建下激活不匹配的详细警告
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },

  server: {
    port: 8080,
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
