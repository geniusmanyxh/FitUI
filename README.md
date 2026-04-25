# FitUI

<p align="center">
  <img src="https://img.shields.io/npm/v/@geniusmanyxh/fit-ui?color=3b82f6&label=npm" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/@geniusmanyxh/fit-ui?color=22c55e" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/geniusmanyxh/FitUI?color=eab308" alt="license" />
  <img src="https://img.shields.io/github/stars/geniusmanyxh/FitUI?style=social" alt="stars" />
</p>

<p align="center">
  基于 Vue 3 + Vite + UnoCSS 的现代化 UI 组件库
</p>

<p align="center">
  <a href="http://fitui.itbooks.work">📖 在线文档</a> | 
  <a href="https://geniusmanyxh.github.io/FitUI">🌐 GitHub Pages</a>
</p>

---

## ✨ 特性

- 🚀 **现代化技术栈** - 基于 Vue 3、Vite、UnoCSS 构建
- 📦 **按需引入** - 支持 Tree Shaking，只打包使用的组件
- 🎨 **灵活主题** - 支持自定义主题配置
- 💪 **TypeScript** - 完整的类型定义支持
- 🧪 **单元测试** - 使用 Vitest 保证组件质量
- 📝 **规范化** - 代码风格统一，遵循最佳实践
- 🌍 **双格式导出** - 同时支持 ESM 和 CJS

## 📦 快速开始

### 安装

```bash
# npm
npm install @geniusmanyxh/fit-ui

# yarn
yarn add @geniusmanyxh/fit-ui

# pnpm
pnpm add @geniusmanyxh/fit-ui
```

### 使用

```vue
<script setup lang="ts">
import { FButton, useMessage } from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/style.css'

const { success } = useMessage()
</script>

<template>
  <FButton type="primary" @click="success('Hello FitUI!')">
    点击我
  </FButton>
</template>
```

更多详情请查看 [完整文档](http://fitui.itbooks.work)

## 📚 组件

- **FButton** - 按钮组件
- **FIcon** - 图标组件
- **FMessage** - 消息提示
- **FTag** - 标签组件
- **FToolTip** - 工具提示
- **FCodeBlock** - 代码块

## 🏗️ 项目结构

```
FitUI/
├── packages/
│   ├── fit-ui/          # 组件库源码
│   └── fit-docs/        # 文档站点
├── scripts/             # 构建脚本
└── README.md
```

## 🛠️ 本地开发

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 启动组件库开发服务器
pnpm ui:dev

# 启动文档站点
pnpm docs:dev

# 构建组件库
pnpm ui:build

# 构建文档站点
pnpm docs:build

# 运行测试
cd packages/fit-ui && pnpm test
```

## 🤝 贡献

欢迎贡献代码！请阅读 [贡献指南](./packages/fit-ui/README.md#-贡献)

提交前请确保：
- ✅ 代码通过 lint 检查
- ✅ 代码通过测试
- ✅ 提交信息符合 [Conventional Commits](https://www.conventionalcommits.org/) 规范

## 📝 Commit 规范

本项目使用 Husky + Commitlint 确保提交规范：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工程化

## 📄 开源协议

[ISC](./LICENSE) © geniusmanyxh

## 🔗 相关链接

- [在线文档](http://fitui.itbooks.work)
- [GitHub Pages](https://geniusmanyxh.github.io/FitUI)
- [npm 包](https://www.npmjs.com/package/@geniusmanyxh/fit-ui)
- [更新日志](./CHANGELOG.md)

---

<p align="center">
  如果觉得不错，请给个 ⭐️ Star 支持一下！
</p>