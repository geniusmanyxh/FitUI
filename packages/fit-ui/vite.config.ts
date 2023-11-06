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



type ExportsType = 'default' | 'named' | 'none' | 'auto'

// const changeCSS =  {
//   name: 'style',
//   // @ts-expect-error
//   generateBundle(config, bundle) {
//       //这里可以获取打包后的文件目录以及代码code
//       const keys = Object.keys(bundle)

//       for (const key of keys) {
//           const bundler: any = bundle[key as any]
//           //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件
//           // @ts-expect-error
//           this.emitFile({
//               type: 'asset',
//               fileName: key,//文件名名不变
//               source: bundler.code.replace(/\.less/g, '.css')
//           })
//       }
//   }
// }

const rollupOptions = {
  external: ['vue', 'vue-router'],
  input:resolve(__dirname,"./src/entry.ts") ,
  output: [
    { 
      //不用打包成.es.js,这里我们想把它打包成.js
      // entryFileNames: "[name].mjs",
      format: 'es',
      //让打包目录和我们目录对应
      preserveModules: true,
      globals: {
        vue: 'Vue',
      },
      exports: 'named' as ExportsType, // 消除默认导出和命名导出的警告
      //配置打包根目录
      dir: resolve(__dirname, "./dist/es"),
    },
    { 
      //不用打包成.es.js,这里我们想把它打包成.js
      // entryFileNames: "[name].js",
      format: 'cjs',
      //让打包目录和我们目录对应
      preserveModules: true,
      globals: {
        vue: 'Vue',
      },
      exports: 'named' as ExportsType, // 消除默认导出和命名导出的警告
      //配置打包根目录
      dir: resolve(__dirname, "./dist/lib"),
    }
  ] 
  
}

export const config = {
  resolve: {
    alias: {
      // vue: 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(), // VUE插件
    vueJsx(), // VUEJSX插件
    VueSetupExtend(),
    UnoCSS(),



    dts(
    //   {
    //   entryRoot: "src",
    //   outDir: [
    //     resolve(__dirname, "./dist/es/src"),
    //     resolve(__dirname, "./dist/lib/src"),
    //   ],
    //   include: ['**/**/*.ts', '**/**/*.tsx', '**/**/*.d.ts'],
    //   //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
    //   tsconfigPath: './tsconfig.json',
    // }
    ),
    // changeCSS,
    DefineOptions()

  ],

  // 添加库模式配置

  build: {
    target: 'modules',
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    // cssCodeSplit: true, // 追加css代码分割
    sourcemap: true, // 生成代码源文件映射文件
    reportCompressedSize: true, // 生成压缩大小报告
    lib: {
      entry: './src/entry.ts',
      name: 'FitUI',
      fileName: (f,e)=>{
        
       let arr = e.split('/')
       let len = arr.length -1
       let dirName = arr[len-1] ?? ''
       let fileName = arr[len].split('.')[0]
       let name =dirName?dirName +'/'+ fileName : fileName
       return name.includes('entry') ?'fit-ui.js': name +'.js'
      },
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
