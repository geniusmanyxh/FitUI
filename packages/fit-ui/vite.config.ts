///<reference types="vitest"/>
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from './config/unocss'
import dts from 'vite-plugin-dts'

type ExportsType = 'default' | 'named' | 'none' | 'auto'
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue',
    },
    exports: 'named' as ExportsType, // 消除默认导出和命名导出的警告
  },
}

export default defineConfig({
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    vue(), // VUE插件
    vueJsx(), // VUEJSX插件
    UnoCSS(),
    dts()
  ],

  // 添加库模式配置

  build: {
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    cssCodeSplit: true, // 追加css代码分割 
    sourcemap: true, // 生成代码源文件映射文件
    reportCompressedSize: true, // 生成压缩大小报告
    lib: {
      entry: './src/entry.ts',
      name: 'FitUI',
      fileName: 'fit-ui',
      // 导出模块格式
      formats: ['es', 'umd', 'iife'],
    },
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    }
  }
} as UserConfig)
