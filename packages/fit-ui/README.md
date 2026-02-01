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
  <a href="https://geniusmanyxh.github.io/FitUI">🌐 GitHub Pages</a> |
  <a href="https://github.com/geniusmanyxh/FitUI">🔗 GitHub</a>
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

## 📦 安装

### 使用 npm
```bash
npm install @geniusmanyxh/fit-ui
```

### 使用 yarn
```bash
yarn add @geniusmanyxh/fit-ui
```

### 使用 pnpm
```bash
pnpm add @geniusmanyxh/fit-ui
```

## 🔨 快速开始

### 前置要求

FitUI 使用了 UnoCSS 的原子类和 `@apply` 指令，因此你的项目需要配置 UnoCSS：

```bash
pnpm add -D unocss
```

```typescript
// vite.config.ts
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
  ],
})
```

```typescript
// main.ts
import 'uno.css'
```

### 方式一：全量引入（适合小型项目）

```typescript
import { createApp } from 'vue'
import FitUI from '@geniusmanyxh/fit-ui/full'

const app = createApp(App)
app.use(FitUI)
app.mount('#app')
```

**说明**：`full` 入口包含了所有组件的样式，会自动引入所需的 CSS。

### 方式二：按需手动引入（推荐，包体积最小）

```typescript
import { createApp } from 'vue'
import { FButton, FIcon, FMessage } from '@geniusmanyxh/fit-ui'

const app = createApp(App)
app.use(FButton)
app.use(FIcon)
app.use(FMessage)
app.mount('#app')
```

**注意**：按需引入时，组件样式已经内嵌，无需额外引入 CSS 文件。

### 方式三：自动按需引入（推荐，开发体验最佳）

安装 unplugin-vue-components：

```bash
pnpm add -D unplugin-vue-components
```

配置 Vite：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { FitUIResolver } from '@geniusmanyxh/fit-ui/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [FitUIResolver()],
    }),
  ],
})
```

使用时无需手动引入：

```vue
<template>
  <!-- 直接使用，自动引入组件和样式 -->
  <FButton type="primary">按钮</FButton>
  <FTag label="标签" />
</template>

<script setup lang="ts">
// 无需 import，自动引入
</script>
```

### 组合式 API 使用

```vue
<template>
  <div>
    <FButton type="primary" size="large" @click="showMessage">
      点击我
    </FButton>
    <FTag label="标签" type="success" closable />
    <FToolTip content="提示信息">
      <FButton>悬停提示</FButton>
    </FToolTip>
  </div>
</template>

<script setup lang="ts">
import { FButton, FTag, FToolTip, useMessage } from '@geniusmanyxh/fit-ui'

const { success } = useMessage()

const showMessage = () => {
  success('操作成功！')
}
</script>
```

## 📚 组件列表

FitUI 目前提供以下组件：

| 组件 | 说明 |
|------|------|
| **FButton** | 按钮，支持多种类型、尺寸、图标 |
| **FIcon** | 图标，支持 Logo、Mono、Google 图标集 |
| **FInput** | 输入框 |
| **FMessage** | 全局消息提示，支持多种类型 |
| **FCodeBlock** | 代码块，代码高亮，多主题 |
| **FToolTip** | 工具提示，悬停多方向定位 |
| **FTag** | 标签，多模式、尺寸、可关闭 |
| **FSwitch** | 开关 |
| **FCheckbox** | 复选框 |
| **FModal** | 弹窗/对话框 |
| **FRadio** | 单选框 |
| **FLoading** | 加载态 |
| **FAlert** | 警告提示 |
| **FTabs** | 标签页 |
| **FDropdown** | 下拉菜单 |

### Hooks

| Hook | 说明 |
|------|------|
| **useMessage** | 消息提示钩子，快速调用各类消息 |

更多组件规划与开发规范见仓库 [docs/COMPONENT_GAP_AND_PLAN.md](../docs/COMPONENT_GAP_AND_PLAN.md)、[docs/COMPONENT_DEVELOPMENT_SPEC.md](../docs/COMPONENT_DEVELOPMENT_SPEC.md)。

## 🔄 从 1.x 迁移到 2.x

### 主要变化

1. **样式引入方式改变**
   - ❌ 旧方式：全局引入 `style.css`
   - ✅ 新方式：按需引入或使用 `full` 入口

2. **需要配置 UnoCSS**
   - 组件依赖 UnoCSS，需要在项目中配置

3. **新增 Resolver 支持**
   - 支持自动按需引入

### 迁移步骤

#### 1. 安装 UnoCSS

```bash
pnpm add -D unocss
```

#### 2. 配置 UnoCSS

```typescript
// vite.config.ts
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
  ],
})
```

#### 3. 更新引入方式

**选项 A：全量引入（最简单）**

```typescript
// 旧代码
import FitUI from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/style.css'

// 新代码
import FitUI from '@geniusmanyxh/fit-ui/full'
```

**选项 B：按需引入（推荐）**

```typescript
// 旧代码
import { FButton } from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/style.css'

// 新代码
import { FButton } from '@geniusmanyxh/fit-ui'
// 样式已自动包含，无需额外引入
```

## 🎨 组件示例

### 按钮 Button

```vue
<template>
  <!-- 基础按钮 -->
  <FButton>默认按钮</FButton>
  <FButton type="primary">主要按钮</FButton>
  <FButton type="success">成功按钮</FButton>
  <FButton type="warning">警告按钮</FButton>
  <FButton type="danger">危险按钮</FButton>
  
  <!-- 朴素按钮 -->
  <FButton plain>朴素按钮</FButton>
  
  <!-- 圆角按钮 -->
  <FButton round>圆角按钮</FButton>
  
  <!-- 不同尺寸 -->
  <FButton size="large">大型按钮</FButton>
  <FButton size="small">小型按钮</FButton>
  
  <!-- 带图标 -->
  <FButton icon="search">搜索</FButton>
</template>
```

### 消息提示 Message

```vue
<script setup lang="ts">
import { useMessage } from '@geniusmanyxh/fit-ui'

const { success, error, warning, info } = useMessage()

const showSuccess = () => success('操作成功！')
const showError = () => error('操作失败！')
const showWarning = () => warning('警告信息！')
const showInfo = () => info('提示信息！')
</script>
```

### 标签 Tag

```vue
<template>
  <!-- 不同类型 -->
  <FTag label="默认标签" />
  <FTag label="主要标签" type="primary" />
  <FTag label="成功标签" type="success" />
  
  <!-- 不同模式 -->
  <FTag label="深色" mode="dark" />
  <FTag label="浅色" mode="light" />
  <FTag label="朴素" mode="plain" />
  
  <!-- 可关闭 -->
  <FTag label="可关闭" closable @close="handleClose" />
  
  <!-- 不同尺寸 -->
  <FTag label="迷你" size="mini" />
  <FTag label="小型" size="small" />
  <FTag label="中等" size="medium" />
  <FTag label="大型" size="large" />
</template>
```

## 🛠️ 开发

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 本地开发

```bash
# 克隆项目
git clone https://github.com/geniusmanyxh/FitUI.git
cd FitUI

# 安装依赖
pnpm install

# 启动开发服务器
pnpm --filter fit-ui dev

# 或在 packages/fit-ui 目录下
cd packages/fit-ui
pnpm dev
```

### 构建

```bash
# 生产构建（无 sourcemap）
pnpm run build

# 开发构建（带 sourcemap）
pnpm run build:sourcemap
```

### 测试

```bash
# 运行测试
pnpm test

# 单次运行测试
pnpm test:run
```

### 代码规范

```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 📝 版本规范

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工程化相关

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 贡献指南

- 代码需要通过 lint 和 test 检查
- 新增功能需要添加相应的单元测试
- 提交信息需要符合 Conventional Commits 规范
- PR 描述需要清晰说明改动内容

## 📄 开源协议

[ISC](https://github.com/geniusmanyxh/FitUI/blob/main/LICENSE) © geniusmanyxh

## 🙏 致谢

感谢所有贡献者的付出！

## 📮 联系方式

- 作者：geniusmanyxh
- GitHub：[https://github.com/geniusmanyxh/FitUI](https://github.com/geniusmanyxh/FitUI)
- 文档：[http://fitui.itbooks.work](http://fitui.itbooks.work)

---

<p align="center">
  如果这个项目对你有帮助，请给一个 ⭐️ Star 支持一下！
</p>
