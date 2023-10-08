
import * as fs from 'fs-extra'
import * as path from 'path'
// 读取 vite 配置
import { config } from '../vite.config'
import { build, defineConfig } from 'vite'
import type { UserConfig, InlineConfig } from 'vite'

const buildAll = async () => {
  // 全量打包
  await build(defineConfig(config as UserConfig) as InlineConfig)
  // await build(defineConfig({}))

  const srcDir = path.resolve(__dirname, '../src/')
  fs.readdirSync(srcDir)
    .filter((name) => {
      // 只要目录不要文件，且里面包含index.ts
      const componentDir = path.resolve(srcDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async (name:string) => {
      const outDir = path.resolve(config.build.outDir, name)
      console.log('555',path.resolve(srcDir, name,'index.ts'))
      const custom = {
        lib: {
          entry: path.resolve(srcDir, name,'index.ts'),
          name, // 导出模块名
          fileName: `index`,
          formats: [`es`, `umd`],
        },
        outDir,
      }

      Object.assign(config.build, custom)
      await build(defineConfig(config as UserConfig) as InlineConfig)

      fs.outputFile(
        path.resolve(outDir, `package.json`),
        `{
            "name": "fit-ui-${name.toLocaleLowerCase()}",
            "main": "index.umd.js",
            "module": "index.mjs"
          }`,
        `utf-8`
      )
    })
}

buildAll()
