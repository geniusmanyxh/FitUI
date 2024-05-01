///<reference types="vitest"/>
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'
import autoprefixer from 'autoprefixer';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
// import copy from 'rollup-plugin-copy';
// import vitePluginAutoCss from './src/plugins/vite-plugin-auto-css'


type ExportsType = 'default' | 'named' | 'none' | 'auto'

const changeAssetsName = (assetInfo:any) => {
  console.log(assetInfo);
  let extType = assetInfo.name.split('.')[1];
  if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
    extType = 'img';
  }
  if (/\.([cm]?js|ts)$/.test(assetInfo.name)) {
    extType = 'js';
  }
  if (/\.css$/.test(assetInfo.name)) {
    extType = 'css';
  }
  // 使用[name]保留原文件名，[hash]或[hash:8]添加哈希，以确保文件名唯一
  return `${extType}/${assetInfo.name}`;
}

const rollupOptions = {
  external: ['vue', 'vue-router'],
  input: resolve(__dirname, "./src/entry.ts"),
  output: [
    {
      //不用打包成.es.js,这里我们想把它打包成.js
      // entryFileNames: "[name].mjs",
      // 指定生成的 asset 文件的名称
      // assetFileNames: 'assets/[name][extname]',
      assetFileNames: changeAssetsName,
      // 指定生成的 entry 文件的名称
      entryFileNames: 'entry/[name].js',
      // 指定生成的 chunk 文件的名称
      chunkFileNames: 'chunks/[name].js',
      format: 'es',
      //让打包目录和我们目录对应
      preserveModules: true,
      // preserveEntrySignatures: 'strict',
      globals: {
        vue: 'Vue',
      },
      exports: 'named' as ExportsType, // 消除默认导出和命名导出的警告
      //配置打包根目录
      dir: resolve(__dirname, "./dist/es"),
    },
    {
      // entryFileNames: "[name].js",
      // 指定生成的 asset 文件的名称
      assetFileNames: changeAssetsName,
      // 指定生成的 entry 文件的名称
      entryFileNames: 'entry/[name].js',
      // 指定生成的 chunk 文件的名称
      chunkFileNames: 'chunks/[name].js',
      format: 'cjs',
      //让打包目录和我们目录对应
      preserveModules: true,
      // preserveEntrySignatures: 'strict',
      globals: {
        vue: 'Vue',
      },
      exports: 'named' as ExportsType, // 消除默认导出和命名导出的警告
      //配置打包根目录
      dir: resolve(__dirname, "./dist/lib"),
    }
  ],
  // plugins:[copy()]

}

export const config = {
  resolve: {
    alias: {
      // vue: 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, 'src'),
      '@util': resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [
    vue(), // VUE插件
    vueJsx(), // VUEJSX插件
    DefineOptions(),
    VueSetupExtend(),
    vanillaExtractPlugin(),
    dts({ rollupTypes: true }),

  ],

  // css:{
  //   postcss: {
  //     plugins: [
  //       autoprefixer(),
  //     ],
  //   },
  // },
  // 添加库模式配置

  build: {
    target: 'modules',
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    cssCodeSplit: false, // 追加css代码分割
    sourcemap: false, // 生成代码源文件映射文件
    reportCompressedSize: true, // 生成压缩大小报告
    lib: {
      entry: './src/entry.ts',
      name: 'FUI',
      fileName: 'fui',
      // 导出模块格式
      // formats: ['es', 'umd', 'iife'],
    },
    outDir: './dist',
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
} as UserConfig

export default defineConfig(config)
