import { defineConfig, type RollupOptions } from 'vitest/config'
import type { ServerOptions, Plugin as VitePlugin } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from './config/unocss'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'

const rollupOptions: RollupOptions = {
  external: ['vue', 'vue-router', 'tj-jstools', 'shiki'],
  input: {
    entry: resolve(__dirname, './src/entry.ts'),
    full: resolve(__dirname, './src/full.ts'),
    components: resolve(__dirname, './src/components.ts'),
  },
  output: [
    {
      format: 'es',
      dir: 'dist/es',
      entryFileNames: '[name].js',
      assetFileNames: '[name].[ext]',
      globals: { vue: 'Vue', 'tj-jstools': 'TJJSTOOLS', shiki: 'ShikiCore' },
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: './',
    },
    {
      format: 'cjs',
      dir: 'dist/lib',
      entryFileNames: '[name].js',
      assetFileNames: '[name].[ext]',
      globals: { vue: 'Vue', 'tj-jstools': 'TJJSTOOLS', shiki: 'ShikiCore' },
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: './',
    },
  ],
}

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
    UnoCSS(),
    dts({ 
      rollupTypes: false,
      cleanVueFileName: true,
      include: ['./src/**/*', './utils/**/*', './enums/**/*', './ftypes/**/*']
    }),
    DefineOptions() as unknown as VitePlugin,
  ],
  server: {
    host: '0.0.0.0',
    port: 8444,
    open: false,
    https: false as ServerOptions['https'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    },
  },
  
  build: {
    target: 'esnext',
    rollupOptions,
    minify: false,
    // 默认不生成 sourcemap（生产模式），可通过 --sourcemap 开启
    sourcemap: false,
    reportCompressedSize: false,
    lib: {
      entry: './src/full.ts',
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