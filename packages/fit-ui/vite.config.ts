import { defineConfig, UserConfigExport } from 'vite'
import type { ServerOptions } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import UnoCSS from './config/unocss'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'

type ExportsType = 'default' | 'named' | 'none' | 'auto'

const rollupOptions = {
  external: ['vue', 'vue-router','tj-jstools'],
  input: resolve(__dirname, "./src/entry.ts"),
  output: [
    {
      format: 'es',
      dir: 'dist/es',
      entryFileNames: '[name].js',
      // chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: "assets/[name].[ext]",
      globals: { vue: 'Vue','tj-jstools':'TJJSTOOLS' },

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
      assetFileNames: "assets/[name].[ext]",
      globals: { vue: 'Vue','tj-jstools':'TJJSTOOLS' },
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: './',
      // preserveEntrySignatures: 'allow-extension',
    },
  ],
} as any;

export const config: UserConfigExport = {
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  resolve: {
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
    VueSetupExtend(),
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
        api: 'modern-compiler',
        additionalData: `
        
        @use "@fstyles/global" as *;`,
      }
    },
  },
  build: {
    target: 'modules',
    rollupOptions,
    minify: 'terser',
    sourcemap: false,
    reportCompressedSize: true,
    lib: {
      entry: './src/entry.ts',
      name: 'FitUI',
      fileName: 'fitui',
    },
    outDir: './dist',
  },
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  //   transformMode: {
  //     web: [/.[tj]sx$/],
  //   },
  // },
}

export default defineConfig(config)