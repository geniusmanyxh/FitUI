---
alwaysApply: false
description: 模块划分和依赖管理规范
---
# 模块划分和依赖管理

> **适用场景**：设计模块、管理依赖  
> **相关文件**：`01-techstack.md`（技术栈）、`03-file-structure.md`（文件结构）  
> **预计阅读时间**：6 分钟

---

## 一、模块划分

### 1.1 核心模块

| 模块 | 路径 | 职责 |
|------|------|------|
| **组件模块** | `src/F*` | UI 组件实现 |
| **工具模块** | `utils/` | 通用工具函数 |
| **类型模块** | `enums/`, `ftypes/` | 类型定义和枚举 |
| **样式模块** | `style/`, `fstyles/` | 全局样式和主题 |
| **组合式函数** | `utils/tsHooks/` | 可复用逻辑 |

### 1.2 依赖分层

```
应用层 (fit-docs, fit-test)
    ↓
组件层 (fit-ui)
    ↓
工具层 (utils, enums, ftypes)
    ↓
基础依赖 (Vue, Vite, UnoCSS)
```

**强制规则**：
- ✅ 禁止循环依赖
- ✅ 工具层不得依赖组件层
- ✅ 组件只能依赖工具层和基础依赖
- ✅ 使用路径别名管理依赖路径

---

## 二、依赖管理

### 2.1 package.json 规范

```json
{
  "name": "@geniusmanyxh/fit-ui",
  "version": "1.1.1",
  "type": "module",
  "sideEffects": [
    "dist/*",
    "dist/**/*.css",
    "dist/**/*.scss",
    "**/*.css",
    "**/*.scss"
  ],
  "main": "dist/lib/entry.js",
  "module": "dist/es/entry.js",
  "types": "dist/entry.d.ts",
  "exports": {
    ".": {
      "types": "./dist/entry.d.ts",
      "import": "./dist/es/entry.js",
      "require": "./dist/lib/entry.js"
    },
    "./style.css": "./dist/es/fitui.css",
    "./resolver": {
      "types": "./resolver.d.ts",
      "import": "./resolver.js"
    }
  },
  "peerDependencies": {
    "vue": "^3.0.0"
  },
  "devDependencies": {
    "vue": "^3.5.27",
    "vite": "7.3.1",
    "typescript": "^5.9.3"
  }
}
```

**强制规则**：
- ✅ 必须声明 `sideEffects` 供 Tree Shaking
- ✅ 必须提供 `main`, `module`, `types` 入口
- ✅ 必须使用 `exports` 字段定义导出映射
- ✅ Vue 必须作为 `peerDependencies`
- ✅ 构建前必须运行测试和 lint

### 2.2 Workspace 管理

```json
{
  "name": "fitui",
  "private": true,
  "scripts": {
    "ui:build": "pnpm recursive run build --filter fit-ui",
    "ui:dev": "pnpm recursive run dev --filter fit-ui",
    "ui:test": "pnpm recursive run test:run --filter fit-ui",
    "docs:dev": "pnpm recursive run d:dev --filter fit-docs"
  }
}
```

**强制规则**：
- ✅ 使用 `--filter` 指定操作的包
- ✅ 根目录不存放源码，仅管理 workspace

---

## 三、导入规范

### 3.1 导入顺序

```typescript
// 1. Vue 和第三方库
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

// 2. 组件
import FButton from '@/FButton'

// 3. 工具函数
import { withInstall } from '@utils/install'
import { btnClass } from '@utils/fbutton'

// 4. 类型和枚举
import { type ButtonType } from './Button'
import { SizeEnum } from '@enums/size'

// 5. 样式（通常不在 TS 中导入）
// import './style.scss'  // 通常在 Vue 中导入
```

**强制规则**：
- ✅ 导入顺序：Vue/第三方 → 组件 → 工具 → 类型 → 样式
- ✅ 必须使用路径别名
- ✅ 相对路径仅用于同级或父子目录导入

### 3.2 类型导入

```typescript
// ✅ 正确：使用 type 导入类型
import type { ButtonProps } from './Button'
import type { SizeType } from '@utils/fsize'

// ✅ 正确：混合导入（值 + 类型）
import { Button, type ButtonProps } from './Button'

// ❌ 错误：类型导入不使用 type
import { ButtonProps } from './Button'  // ButtonProps 是类型
```

---

## 四、工具函数规范

### 4.1 withInstall 工具

```typescript
// utils/install.ts
import type { App, Plugin } from 'vue'

export function withInstall<T>(comp: T) {
  const c = comp as any
  c.install = (app: App) => {
    app.component(c.name || c.displayName, comp)
  }
  return comp as T & Plugin
}
```

**使用示例**：
```typescript
import comp from './index.vue'
import { withInstall } from '@utils/install'

const FButton = withInstall(comp)
export default FButton
```

### 4.2 组合式函数

```typescript
// utils/tsHooks/useMessage.ts
import { ref } from 'vue'

export function useMessage() {
  const message = ref('')
  const visible = ref(false)
  
  const show = (msg: string) => {
    message.value = msg
    visible.value = true
  }
  
  const hide = () => {
    visible.value = false
  }
  
  return {
    message,
    visible,
    show,
    hide,
  }
}
```

**强制规则**：
- ✅ 可复用逻辑应抽取为组合式函数
- ✅ 组合式函数应返回响应式数据和方法
- ✅ 避免在组合式函数中产生副作用

---

## 五、构建输出

### 5.1 构建产物

```
dist/
├── es/                  # ES Module
│   ├── entry.js
│   ├── full.js
│   ├── src/
│   │   └── FComponentName/
│   │       └── style/
│   └── fitui.css
├── lib/                 # CommonJS
│   ├── entry.js
│   └── full.js
├── entry.d.ts           # 类型声明
└── full.d.ts
```

### 5.2 导出映射

```json
{
  "exports": {
    ".": {
      "types": "./dist/entry.d.ts",
      "import": "./dist/es/entry.js",
      "require": "./dist/lib/entry.js"
    },
    "./style.css": "./dist/es/fitui.css",
    "./es/*/style": "./dist/es/src/*/style/index.js",
    "./es/*/style/css": "./dist/es/src/*/style/css.js"
  }
}
```

**强制规则**：
- ✅ 必须提供 ESM 和 CJS 两种格式
- ✅ 必须提供类型声明文件
- ✅ 样式文件必须单独导出

---

## 六、依赖版本管理

### 6.1 版本规范

遵循 [SemVer](https://semver.org/lang/zh-CN/):

```
主版本号。次版本号。修订号
MAJOR.MINOR.PATCH

- MAJOR: 不兼容的 API 更改
- MINOR: 向后兼容的功能新增
- PATCH: 向后兼容的问题修复
```

### 6.2 版本锁定

```bash
# 使用 pnpm-lock.yaml 锁定依赖
pnpm install

# 更新依赖
pnpm update <package-name>

# 更新所有依赖（谨慎使用）
pnpm update
```

**强制规则**：
- ✅ 必须提交 `pnpm-lock.yaml`
- ✅ 更新依赖前必须测试
- ✅ 主要版本更新需评估兼容性

---

## 七、模块解耦

### 7.1 组件独立性

```typescript
// ✅ 正确：组件自包含
FButton/
├── index.vue      # 组件逻辑
├── index.ts       # 导出
├── style/         # 样式
└── __tests__/     # 测试

// ❌ 错误：组件间循环依赖
FButton imports FIcon
FIcon imports FButton  // 循环依赖！
```

### 7.2 工具函数纯度

```typescript
// ✅ 正确：纯函数
export function getClassNames(type: string): string {
  return `f-button--${type}`
}

// ❌ 错误：依赖外部状态
let counter = 0
export function getId(): number {
  return counter++  // 有状态
}
```

**强制规则**：
- ✅ 组件应尽可能自包含
- ✅ 工具函数应是纯函数
- ✅ 避免全局状态

---

**下一步**：
- 错误处理请阅读 `05-error-handling.md`
- 测试编写请阅读 `06-testing.md`
