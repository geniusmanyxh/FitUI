---
alwaysApply: false
description: 技术栈和项目结构
---
# 技术栈和项目结构

> **适用场景**：配置开发环境、了解项目架构  
> **相关文件**：`02-code-style.md`（代码风格）、`10-dev-tools.md`（开发工具）  
> **预计阅读时间**：5 分钟

---

## 一、技术栈

### 1.1 核心技术

| 技术 | 版本 | 用途 |
|------|------|------|
| **核心框架** | Vue 3.5.27+ | Composition API |
| **构建工具** | Vite 7.3.1+ | 快速开发和构建 |
| **语言** | TypeScript 5.9.3+ | 类型安全 |
| **样式** | SCSS + UnoCSS 66.6.0+ | 样式编写和原子化 CSS |
| **测试** | Vitest 4.0.18+ + @vue/test-utils | 单元测试 |
| **包管理** | pnpm | Workspace 管理 |
| **代码质量** | oxlint 1.42.0+, oxfmt 0.27.0+ | Lint 和格式化 |
| **Git 钩子** | Husky 9.1.7+ | Git 钩子管理 |
| **提交规范** | Commitlint 20.3.1+ | Commit 信息检查 |

### 1.2 开发依赖

```json
{
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.3",
    "@vitejs/plugin-vue-jsx": "5.1.3",
    "unocss": "^66.6.0",
    "unplugin-vue-components": "^31.0.0",
    "vite-plugin-dts": "^4.5.4",
    "vitest": "^4.0.18"
  }
}
```

---

## 二、项目结构

### 2.1 整体结构

```
FitUI/
├── packages/
│   ├── fit-ui/          # 核心组件库
│   │   ├── src/         # 组件源码
│   │   ├── style/       # 全局样式
│   │   ├── utils/       # 工具函数
│   │   ├── enums/       # 枚举类型
│   │   ├── ftypes/      # 类型定义
│   │   ├── dist/        # 构建输出
│   │   └── demo/        # 示例
│   ├── fit-docs/        # 文档站点 (VitePress)
│   └── fit-test/        # 测试示例项目
├── docs/                # 项目文档
├── .husky/              # Git 钩子脚本
├── .cursor/             # Cursor IDE 配置
└── .github/             # GitHub CI/CD
```

### 2.2 组件库结构 (fit-ui)

```
packages/fit-ui/
├── src/
│   ├── FComponentName/          # 各组件目录
│   ├── components.ts            # 组件统一导出
│   ├── entry.ts                 # 按需引入入口
│   ├── full.ts                  # 全量引入入口
│   └── index.scss               # 全局样式
├── style/
│   ├── theme/                   # 主题样式
│   ├── mixins/                  # 全局 mixins
│   └── variables/               # SCSS 变量
├── utils/
│   ├── install.ts               # withInstall 工具
│   ├── fsize.ts                 # 尺寸工具
│   ├── ficon.ts                 # 图标工具
│   └── tsHooks/                 # 组合式函数
├── enums/
│   └── styleConstEnum.ts        # 样式常量枚举
├── ftypes/
│   └── index.type.ts            # 全局类型
└── fstyles/
    └── theme/                   # 主题样式
```

### 2.3 组件标准结构

```
packages/fit-ui/src/FComponentName/
├── __tests__/
│   └── componentname.test.ts    # 单元测试（小写）
├── style/
│   ├── _componentname.scss      # 组件样式
│   ├── index.scss               # 样式入口
│   ├── index.ts                 # TS 引入样式
│   └── css.ts                   # CSS 变量（可选）
├── ComponentName.ts             # 类型定义（可选）
├── index.ts                     # 导出入口
└── index.vue                    # 组件主体
```

---

## 三、配置说明

### 3.1 TypeScript 配置

**tsconfig.json 核心规则**：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "declaration": true,
    "paths": {
      "@/*": ["./src/*"],
      "@utils/*": ["./utils/*"],
      "@enums/*": ["./enums/*"],
      "@ftypes/*": ["./ftypes/*"],
      "@fstyles/*": ["./styles/*"]
    }
  }
}
```

**强制要求**：
- ✅ 必须启用 `strict: true`
- ✅ 必须使用 `ESNext` 模块和目标
- ✅ 必须配置路径别名
- ✅ 必须启用 `esModuleInterop`

### 3.2 Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, './utils'),
      '@enums': path.resolve(__dirname, './enums'),
      '@ftypes': path.resolve(__dirname, './ftypes'),
      '@fstyles': path.resolve(__dirname, './fstyles'),
    },
  },
})
```

---

## 四、开发环境配置

### 4.1 安装依赖

```bash
# 安装 pnpm（如未安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 4.2 启动开发服务器

```bash
# 启动组件库开发
pnpm ui:dev

# 启动文档站点
pnpm docs:dev

# 启动测试示例
cd packages/fit-test && pnpm dev
```

### 4.3 构建

```bash
# 构建组件库
pnpm ui:build

# 构建文档
pnpm docs:build
```

---

## 五、路径别名

| 别名 | 路径 | 用途 |
|------|------|------|
| `@/` | `./src/` | 组件源码 |
| `@utils/` | `./utils/` | 工具函数 |
| `@enums/` | `./enums/` | 枚举类型 |
| `@ftypes/` | `./ftypes/` | 类型定义 |
| `@fstyles/` | `./styles/` | 样式文件 |

**强制要求**：
- ✅ 必须使用路径别名，禁止使用相对路径（如 `../../`）
- ✅ 导入顺序：组件 → 工具 → 枚举 → 类型 → 样式

---

**下一步**：编写代码前请阅读 `02-code-style.md` 了解代码风格规范
