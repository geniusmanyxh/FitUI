---
alwaysApply: false
description: 开发工具与检查规范
---
# 开发工具与检查

> **适用场景**：代码检查、格式化  
> **相关文件**：`07-commit-guidelines.md`（提交规范）、`12-checklists.md`（检查清单）  
> **预计阅读时间**：5 分钟

---

## 一、代码检查

### 1.1 Lint 检查

```bash
# 运行 oxlint
pnpm lint

# 运行 oxfmt 检查
pnpm format
```

**配置**：
```json
// .oxlintrc.json
{
  "rules": {
    "typescript": true,
    "vue": true,
    "import": true
  }
}
```

**强制规则**：
- ✅ 提交前必须通过 lint 检查
- ✅ 代码必须格式化
- ✅ 禁止 TypeScript 类型错误

### 1.2 常见 Lint 错误

```typescript
// ❌ 错误：未使用的变量
const unused = 123

// ✅ 正确：删除未使用的变量

// ❌ 错误：使用 any
const data: any = {}

// ✅ 正确：使用明确类型
const data: { id: number } = {}

// ❌ 错误：缺少返回值类型
function getData() {
  return { id: 1 }
}

// ✅ 正确：添加返回值类型
function getData(): { id: number } {
  return { id: 1 }
}
```

---

## 二、代码格式化

### 2.1 格式化命令

```bash
# 格式化代码
pnpm format

# 检查格式（不修改）
pnpm format:check
```

### 2.2 格式化规则

```typescript
// ✅ 正确：统一的缩进和空格
const obj = {
  a: 1,
  b: 2,
}

function test(a: number, b: number): number {
  return a + b
}

// ❌ 错误：不一致的格式
const obj={a:1,b:2}

function test(
  a:number,b:number
):number{
  return a+b
}
```

---

## 三、Git Hooks

### 3.1 Husky 配置

```bash
.husky/
├── pre-commit         # 提交前检查（lint, format）
├── pre-push           # 推送前检查（test）
└── commit-msg         # Commit 信息检查（commitlint）
```

### 3.2 pre-commit

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint
pnpm format
```

### 3.3 pre-push

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm test:run
```

### 3.4 commit-msg

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm commitlint --edit $1
```

**强制规则**：
- ✅ 禁止跳过 Git hooks
- ✅ 禁止使用 `--no-verify` 提交
- ✅ Hook 失败必须先修复问题

---

## 四、IDE 配置

### 4.1 推荐插件

- **Vue - Official** - Vue 语言支持
- **TypeScript Vue Plugin (Volar)** - TypeScript 支持
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **SCSS Formatter** - SCSS 格式化
- **GitLens** - Git 增强

### 4.2 VS Code 设置

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "files.associations": {
    "*.vue": "vue"
  },
  "vetur.validation.template": false,
  "vue.languageFeatures": {
    "references": true,
    "rename": true
  }
}
```

### 4.3 自动保存和格式化

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

---

## 五、调试工具

### 5.1 Vue DevTools

安装 [Vue DevTools](https://devtools.vuejs.org/) 浏览器扩展：

- 查看组件树
- 检查响应式数据
- 调试事件和生命周期

### 5.2 浏览器调试

```typescript
// 使用 debugger
const handleClick = () => {
  debugger  // 断点
  console.log('clicked')
}

// 使用 console
console.log('普通日志')
console.info('信息')
console.warn('警告')
console.error('错误')
console.trace('堆栈追踪')
```

### 5.3 组件调试

```vue
<template>
  <div>
    <pre>{{ props }}</pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string
}>()

// 监听 props 变化
watch(
  () => props.type,
  (newVal, oldVal) => {
    console.log('type changed:', { oldVal, newVal })
  }
)
</script>
```

---

## 六、性能工具

### 6.1 构建分析

```bash
# 安装分析工具
pnpm install -D rollup-plugin-visualizer

# vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
```

### 6.2 运行时性能

```typescript
// 性能标记
console.time('render')
// ... 渲染代码
console.timeEnd('render')

// 使用 Performance API
performance.mark('start')
// ... 代码
performance.mark('end')
performance.measure('render', 'start', 'end')
```

---

## 七、检查命令汇总

### 7.1 开发流程

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm ui:dev

# 3. 编写代码

# 4. 运行检查
pnpm lint
pnpm format

# 5. 运行测试
pnpm test:run

# 6. 提交代码
git add .
git commit -m "feat: 新功能"
```

### 7.2 发布流程

```bash
# 1. 发布前检查
pnpm release:check

# 2. 本地预发布
pnpm release:dry

# 3. 正式发布
pnpm release
```

### 7.3 常用命令

```bash
# 开发
pnpm ui:dev          # 启动组件库开发
pnpm docs:dev        # 启动文档站点
pnpm test            # 运行测试（监听）
pnpm test:run        # 运行测试（单次）

# 构建
pnpm ui:build        # 构建组件库
pnpm docs:build      # 构建文档

# 检查
pnpm lint            # Lint 检查
pnpm format          # 格式化
pnpm typecheck       # 类型检查

# 发布
pnpm release:check   # 发布前检查
pnpm release:dry     # 预发布
pnpm release         # 正式发布
```

---

## 八、故障排除

### 8.1 常见问题

**问题**：Lint 检查失败

```bash
# 解决
pnpm lint --fix
```

**问题**：格式化后代码变化大

```bash
# 解决
pnpm format
git add .
git commit -m "style: 格式化代码"
```

**问题**：Git hooks 失败

```bash
# 解决（不推荐，仅用于调试）
git commit --no-verify

# 正确做法：修复问题后重新提交
```

### 8.2 清理和重置

```bash
# 清理
rm -rf node_modules dist
pnpm install

# 重置 Git hooks
pnpm install
```

---

**下一步**：
- 最佳实践请阅读 `11-best-practices.md`
- 检查清单请阅读 `12-checklists.md`
