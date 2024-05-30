///<reference types="vitest"/>
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import UnoCSS from './config/unocss'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'

// import { formatAssetFile,formatChunkFile,formatEntryFile } from './config/formatBuildFileName'

type ExportsType = 'default' | 'named' | 'none' | 'auto'


const rollupOptions = {
  external: ['vue', 'vue-router'],
  input:resolve(__dirname,"./src/entry.ts") ,
  output: [
    { 
      //不用打包成.es.js,这里我们想把它打包成.js
      
      assetFileNames: "assets/[name].[ext]",
      // 指定生成的 entry 文件的名称
      entryFileNames: "[name].js",
      // 指定生成的 chunk 文件的名称
      // chunkFileNames: 'chunks/[name].js',
      format: 'es',
      //让打包目录和我们目录对应
      preserveModules: true,
      preserveModulesRoot: './',
      globals: {
        vue: 'Vue',
      },
      exports: 'named' as ExportsType, // 消除默认导出和命名导出的警告
      //配置打包根目录
      dir: 'dist/es',
    },
    { 
      //不用打包成.es.js,这里我们想把它打包成.js
      assetFileNames: "assets/[name].[ext]",
      // 指定生成的 entry 文件的名称
      entryFileNames: "[name].js",
      // 指定生成的 chunk 文件的名称
      // chunkFileNames: 'chunks/[name].js',
      format: 'cjs',
      //让打包目录和我们目录对应
      preserveModules: true,
      preserveModulesRoot: './',
      globals: {
        vue: 'Vue',
      },
      exports: 'named' as ExportsType, // 消除默认导出和命名导出的警告
      //配置打包根目录
      dir: 'dist/lib',
    }
  ] 
  
}

export const config = {
  define: {
    // 启用生产环境构建下激活不匹配的详细警告
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  resolve: {
    alias: {
      // vue: 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, 'src'),
      '@utils': resolve(__dirname, 'utils'),
      '@enums': resolve(__dirname, 'enums'),
    },
  },
  plugins: [
    vue(), // VUE插件
    vueJsx(), // VUEJSX插件
    VueSetupExtend(),
    UnoCSS(),
    dts({rollupTypes: true}),
    DefineOptions()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    https: false,
  },
  // 添加库模式配置

  build: {
    target: 'modules',
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    // cssCodeSplit: true, // 追加css代码分割
    sourcemap: false, // 生成代码源文件映射文件
    reportCompressedSize: true, // 生成压缩大小报告
    lib: {
      entry: './src/entry.ts',
      name: 'FitUI',
      fileName: 'fitui',
      // 导出模块格式
      // formats: ['es', 'cjs'],
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
