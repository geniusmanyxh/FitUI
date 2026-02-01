import { defineConfig } from 'vitest/config'
import type { ServerOptions } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import UnoCSS from './config/unocss'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'

type ExportsType = 'default' | 'named' | 'none' | 'auto'

const rollupOptions = {
  external: ['vue', 'vue-router','tj-jstools','shiki'],
  input: {
    entry: resolve(__dirname, "./src/entry.ts"),
    full: resolve(__dirname, "./src/full.ts"),
    components: resolve(__dirname, "./src/components.ts"),
  },
  output: [
    {
      format: 'es',
      dir: 'dist/es',
      entryFileNames: '[name].js',
      // chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: (assetInfo: any) => {
        if (assetInfo.name === 'uno.css') {
          return 'uno.css'
        }
        if (assetInfo.name?.endsWith('.css')) {
          return '[name].css'
        }
        return 'assets/[name].[ext]'
      },
      globals: { vue: 'Vue','tj-jstools':'TJJSTOOLS','shiki':'ShikiCore' },

      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: './',
      // preserveEntrySignatures: 'allow-extension',
    },
    {
      format: 'cjs',
      dir: 'dist/lib',
      entryFileNames: '[name].js',
      // chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: (assetInfo: any) => {
        if (assetInfo.name === 'uno.css') {
          return 'uno.css'
        }
        if (assetInfo.name?.endsWith('.css')) {
          return '[name].css'
        }
        return 'assets/[name].[ext]'
      },
      globals: { vue: 'Vue','tj-jstools':'TJJSTOOLS','shiki':'ShikiCore' },
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: './',
      // preserveEntrySignatures: 'allow-extension',
    },
  ],
} as any;

export const config = defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.mts', '.js', '.jsx', '.mjs', '.json'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@utils': resolve(__dirname, 'utils'),
      '@enums': resolve(__dirname, 'enums'),
      '@ftypes': resolve(__dirname, 'ftypes'),
      '@fstyles': resolve(__dirname, 'styles'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // VueSetupExtend(),
    UnoCSS(),
    dts({ rollupTypes: true }),
    DefineOptions() as any,
  ],
  server: {
    host: '0.0.0.0',
    port: 8444,
    open: false,
    https: false as unknown as ServerOptions['https'], // 显式指定类型
  },
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-ignore
        api: 'modern-compiler' as any,
        // 移除 additionalData，改为显式引入
      }
    },
  },
  
  build: {
    target: 'esnext',
    rollupOptions,
    minify: 'terser',
    // 默认不生成 sourcemap（生产模式），可通过 --sourcemap 开启
    sourcemap: false,
    reportCompressedSize: true,
    lib: {
      entry: './src/entry.ts',
      name: 'FitUI',
      fileName: 'fitui',
    },
    outDir: './dist',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})

export default config