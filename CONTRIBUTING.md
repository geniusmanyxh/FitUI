# 贡献指南

感谢你对 FitUI 的关注！我们欢迎任何形式的贡献。

## 🎯 贡献类型

- 🐛 报告 Bug
- 💡 提出新特性建议
- 📝 改进文档
- 🔧 提交代码修复或新功能
- ✅ 完善测试用例

## 🚀 快速开始

### 1. Fork 和 Clone

```bash
# Fork 本仓库到你的 GitHub 账号
# 然后 clone 到本地
git clone https://github.com/你的用户名/FitUI.git
cd FitUI
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 创建分支

```bash
# 从 dev-fit-ui 分支创建你的功能分支
git checkout -b feature/my-new-feature dev-fit-ui

# 或修复 bug
git checkout -b fix/bug-description dev-fit-ui
```

### 4. 开发

```bash
# 启动组件库开发服务器
cd packages/fit-ui
pnpm dev

# 在浏览器中打开 http://localhost:8444
```

### 5. 提交代码

```bash
# 添加改动
git add .

# 提交（遵循 Conventional Commits 规范）
git commit -m "feat: add new component"

# 推送到你的仓库
git push origin feature/my-new-feature
```

### 6. 创建 Pull Request

在 GitHub 上创建 Pull Request，描述你的改动。

## 📋 开发规范

### Commit 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 新功能
git commit -m "feat: 添加新的按钮组件"
git commit -m "feat(button): 支持图标插槽"

# Bug 修复
git commit -m "fix: 修复消息组件关闭按钮无效问题"
git commit -m "fix(tag): 修复标签尺寸样式错误"

# 文档
git commit -m "docs: 更新安装说明"
git commit -m "docs(button): 完善按钮组件文档"

# 样式
git commit -m "style: 格式化代码"

# 重构
git commit -m "refactor: 优化工具函数"

# 测试
git commit -m "test: 增加按钮组件测试用例"

# 构建/工程化
git commit -m "chore: 更新依赖版本"
git commit -m "chore(build): 优化构建配置"
```

### 代码风格

- 使用 TypeScript
- 遵循 Vue 3 Composition API 最佳实践
- 使用 `<script setup>` 语法
- 组件命名使用大驼峰（PascalCase）
- 文件名使用大驼峰（如 `FButton/index.vue`）

### 组件开发规范

#### 1. 组件结构

```
src/
└── FYourComponent/
    ├── __tests__/
    │   └── your-component.test.ts  # 单元测试
    ├── style/                       # 样式文件（可选）
    │   └── index.scss
    ├── index.ts                     # 导出文件
    └── index.vue                    # 组件主文件
```

#### 2. 组件模板

```vue
<template>
  <div class="f-your-component">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'FYourComponent',
  inheritAttrs: false,
})

interface Props {
  type?: 'default' | 'primary' | 'success'
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()
</script>

<style scoped lang="scss">
.f-your-component {
  // 样式
}
</style>
```

#### 3. 导出文件 (index.ts)

```typescript
import component from './index.vue'
import { withInstall } from '@utils/install'

const FYourComponent = withInstall(component)

export default FYourComponent
```

#### 4. 在 entry.ts 中注册

```typescript
import { default as FYourComponent } from './FYourComponent'

export { FYourComponent }

const components = [
  // ...其他组件
  FYourComponent,
]
```

### 测试规范

每个组件都应该有对应的单元测试：

```typescript
import FYourComponent from '..'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('FYourComponent', () => {
  test('mount with default props', () => {
    const wrapper = mount(FYourComponent)
    expect(wrapper.exists()).toBe(true)
  })

  test('renders props correctly', () => {
    const wrapper = mount(FYourComponent, {
      props: {
        type: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('primary')
  })

  test('emits events correctly', async () => {
    const wrapper = mount(FYourComponent)
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
```

运行测试：

```bash
# 监听模式
pnpm test

# 单次运行
pnpm test:run
```

## 🔍 代码检查

提交前请确保代码通过检查：

```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 运行测试
pnpm test:run
```

## 📝 文档编写

如果你添加了新组件或新功能，请：

1. 在组件代码中添加 JSDoc 注释
2. 更新 README.md
3. 如果有文档站点，更新相应的文档页面

## 🐛 报告 Bug

提交 Bug 时请包含：

1. **问题描述** - 简要描述问题
2. **复现步骤** - 详细的复现步骤
3. **期望行为** - 你期望的正确行为
4. **实际行为** - 实际发生的情况
5. **环境信息** - 浏览器版本、操作系统等
6. **代码示例** - 最小可复现的代码

## 💡 功能建议

提交新功能建议时请说明：

1. **使用场景** - 什么场景下需要这个功能
2. **解决方案** - 你建议的实现方式
3. **替代方案** - 是否有其他实现方式
4. **API 设计** - 你期望的 API 设计

## ✅ Pull Request 检查清单

提交 PR 前请确认：

- [ ] 代码遵循项目规范
- [ ] 已添加必要的测试用例
- [ ] 所有测试通过
- [ ] 代码通过 lint 检查
- [ ] 更新了相关文档
- [ ] Commit 信息符合规范
- [ ] 已在本地测试过改动

## 📮 联系方式

如有问题，可以通过以下方式联系：

- GitHub Issues: [提交 Issue](https://github.com/geniusmanyxh/FitUI/issues)
- Pull Request: [提交 PR](https://github.com/geniusmanyxh/FitUI/pulls)

## 🙏 致谢

感谢所有为 FitUI 做出贡献的开发者！

---

再次感谢你的贡献！🎉
