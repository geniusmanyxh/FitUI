// vite-plugin-inline-css.ts

import { Plugin } from 'vite';
import  parse  from '@vitejs/plugin-vue'; // 导入 @vue/compiler-sfc 用于解析 Vue 单文件组件
import fs from 'fs';
import path from 'path';

export default function inlineCSSPlugin(): Plugin {
  return {
    name: 'inline-css',
    async transform(code, id) {
      if (id.endsWith('.vue')) {
        const  descriptor = parse(code);
        if (descriptor.styles.length > 0) {
          const cssContent = descriptor.styles[0].content;
          const updatedCode = code.replace(
            '</script>',
            `</script>\n<style>${cssContent}</style>`,
          );
          return updatedCode;
        }
      }
      return null;
    },
  };
}
