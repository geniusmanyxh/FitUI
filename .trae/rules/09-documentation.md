---
alwaysApply: false
description: 文档规范
---
# 文档规范

> **适用场景**：编写注释、更新文档  
> **相关文件**：`02-code-style.md`（代码风格）、`09-documentation.md`（文档站点）  
> **预计阅读时间**：6 分钟

---

## 一、代码注释

### 1.1 JSDoc 规范

```typescript
/**
 * FButton 按钮组件
 *
 * @description 支持多种类型、尺寸和状态的按钮组件
 * @example
 * ```vue
 * <FButton type="primary" size="large">主要按钮</FButton>
 * <FButton type="success" plain>朴素按钮</FButton>
 * <FButton type="danger" round icon="delete">删除</FButton>
 * <FButton type="primary" loading>加载中</FButton>
 * ```
 */
```

**强制规则**：
- ✅ 组件必须有 JSDoc 说明
- ✅ 必须包含 `@description` 功能描述
- ✅ 必须提供 `@example` 使用示例
- ✅ 示例代码必须可运行

### 1.2 Props 注释

```typescript
interface ButtonProps {
  /** 
   * 按钮类型 
   * @default 'default'
   */
  type?: ButtonType
  
  /** 
   * 按钮尺寸
   * @default 'medium'
   */
  size?: SizeType
  
  /** 是否禁用 */
  disabled?: boolean
  
  /** 
   * 是否加载中
   * @default false
   */
  loading?: boolean
}
```

**强制规则**：
- ✅ Props 必须有注释
- ✅ 提供默认值的 Props 必须标注 `@default`
- ✅ 注释应简洁明了

### 1.3 Emits 注释

```typescript
const emit = defineEmits<{
  /** 点击按钮时触发 */
  (e: 'click', event: MouseEvent): void
  
  /** 更新 modelValue 时触发 */
  (e: 'update:modelValue', value: boolean): void
}>()
```

---

## 二、组件文档

### 2.1 文档结构

```
packages/fit-docs/docs/
├── components/          # 组件文档
│   └── button/
│       └── index.md
├── examples/            # 示例代码
│   └── button/
│       └── index.vue
├── guide/               # 指南
│   └── started.md
└── index.md             # 首页
```

### 2.2 文档模板

```markdown
# FButton 按钮

按钮用于触发一个操作，如提交、删除等。

## 基础用法

```vue
<template>
  <FButton>默认按钮</FButton>
  <FButton type="primary">主要按钮</FButton>
  <FButton type="success">成功按钮</FButton>
</template>
```

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 按钮类型 | `ButtonType` | `default` \| `primary` \| `success` \| `warning` \| `danger` \| `info` | `default` |
| size | 按钮尺寸 | `SizeType` | `small` \| `medium` \| `large` | `medium` |
| disabled | 是否禁用 | `boolean` | - | `false` |
| loading | 是否加载中 | `boolean` | - | `false` |

## Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| click | 点击按钮时触发 | `(event: MouseEvent)` |

## Slots

| 名称 | 说明 |
|------|------|
| default | 按钮内容 |
| icon | 图标内容 |
| loading | 加载中内容 |

## 示例

### 图标按钮

```vue
<template>
  <FButton icon="search">搜索</FButton>
  <FButton icon="delete" type="danger">删除</FButton>
</template>
```

### 加载状态

```vue
<template>
  <FButton loading>加载中</FButton>
  <FButton loading type="primary">
    <template #loading>
      <span>自定义加载内容</span>
    </template>
    加载中
  </FButton>
</template>
```
```

**强制规则**：
- ✅ 新增组件必须同步更新文档
- ✅ 文档必须包含 API 表格（Props、Events、Slots）
- ✅ 必须提供至少 3 个使用示例
- ✅ 示例代码必须可运行

---

## 三、示例代码规范

### 3.1 示例文件结构

```vue
<!-- examples/FButton/button_icon.vue -->
<template>
  <div class="example">
    <FButton icon="search">搜索</FButton>
    <FButton icon="delete" type="danger">删除</FButton>
  </div>
</template>

<script setup lang="ts">
import { FButton } from '@geniusmanyxh/fit-ui'
</script>

<style scoped>
.example {
  display: flex;
  gap: 16px;
}
</style>
```

### 3.2 示例命名

```
button_icon.vue      # 图标按钮
button_size.vue      # 尺寸
button_round.vue     # 圆角按钮
button_loading.vue   # 加载状态
```

**强制规则**：
- ✅ 示例文件名应反映功能
- ✅ 示例代码应简洁（< 50 行）
- ✅ 示例应可独立运行

---

## 四、README 规范

### 4.1 组件 README

```markdown
# FButton

按钮组件

## 安装

```bash
npm install @geniusmanyxh/fit-ui
```

## 使用

```vue
<template>
  <FButton type="primary">主要按钮</FButton>
</template>

<script setup>
import { FButton } from '@geniusmanyxh/fit-ui'
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 类型 | `ButtonType` | `default` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| click | 点击 | `MouseEvent` |
```

### 4.2 项目 README

```markdown
# FitUI

基于 Vue 3 + Vite + UnoCSS 的 UI 组件库

## 特性

- 🚀 基于 Vue 3 Composition API
- ⚡️ 使用 Vite 构建，极速开发体验
- 🎨 使用 UnoCSS，灵活的样式定制
- 📦 支持按需引入和全量引入
- 🛠️ 完整的 TypeScript 支持

## 安装

```bash
npm install @geniusmanyxh/fit-ui
```

## 快速开始

```vue
<template>
  <FButton type="primary">Hello FitUI</FButton>
</template>

<script setup>
import { FButton } from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/style.css'
</script>
```

## 文档

查看完整文档：[https://geniusmanyxh.github.io/FitUI](https://geniusmanyxh.github.io/FitUI)

## 贡献

详见 [CONTRIBUTING.md](CONTRIBUTING.md)

## License

ISC
```

---

## 五、注释最佳实践

### 5.1 何时注释

```typescript
// ✅ 正确：解释复杂逻辑
// 使用防抖避免频繁触发
const debouncedSave = debounce(() => {
  saveData()
}, 300)

// ✅ 正确：说明原因
// 由于 Safari 兼容性问题，需要使用此方案
const fixSafariBug = () => {
  // ...
}

// ❌ 错误：解释显而易见的代码
// 设置 count 为 0
let count = 0

// ❌ 错误：注释掉代码
// const oldFunction = () => {}
```

### 5.2 TODO 注释

```typescript
// TODO: 优化性能，使用缓存
const expensiveCalculation = () => {
  // ...
}

// FIXME: 处理边界情况
const handleEdgeCase = () => {
  // ...
}

// HACK: 临时解决方案，待重构
const workaround = () => {
  // ...
}
```

**强制规则**：
- ✅ TODO 必须说明要做什么
- ✅ FIXME 必须说明问题
- ✅ HACK 必须标记为临时方案

---

## 六、文档站点

### 6.1 VitePress 配置

```typescript
// .vitepress/config.ts
export default defineConfig({
  title: 'FitUI',
  description: '基于 Vue 3 的 UI 组件库',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/started' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/components/': [
        { text: 'FButton 按钮', link: '/components/button' },
        { text: 'FInput 输入框', link: '/components/input' },
      ],
    },
  },
})
```

### 6.2 文档部署

```bash
# 构建文档
pnpm docs:build

# 部署到 GitHub Pages
pnpm docs:deploy
```

---

**下一步**：
- 开发工具请阅读 `10-dev-tools.md`
- 检查清单请阅读 `12-checklists.md`
