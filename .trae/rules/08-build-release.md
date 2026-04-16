---
alwaysApply: false
description: 构建与发布规范
---
# 构建与发布

> **适用场景**：构建项目、发布版本  
> **相关文件**：`08-build-release.md`（构建发布）、`12-checklists.md`（检查清单）  
> **预计阅读时间**：6 分钟

---

## 一、构建流程

### 1.1 开发模式

```bash
# 启动组件库开发服务器
pnpm ui:dev

# 在浏览器中打开 http://localhost:8444
# 可以实时预览组件效果
```

**特点**：
- ✅ 热更新（HMR）
- ✅ 源码调试
- ✅ 快速反馈

### 1.2 生产构建

```bash
# 生产构建
pnpm ui:build

# 构建带 sourcemap
pnpm ui:build:sourcemap
```

**构建输出**：
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

### 1.3 Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    dts({
      outDir: 'dist',
      entryRoot: 'src',
    }),
  ],
  build: {
    lib: {
      entry: {
        entry: 'src/entry.ts',
        full: 'src/full.ts',
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        return `${entryName}.js`
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

---

## 二、发布流程

### 2.1 发布前检查

```bash
# 1. 发布前检查（自动运行 test 和 lint）
pnpm release:check

# 2. 本地预发布（dry-run）
pnpm release:dry

# 3. 正式发布
pnpm release
```

**release:check 执行**：
```bash
# 运行测试
pnpm test:run

# 运行 lint
pnpm lint

# 构建
pnpm build
```

**强制规则**：
- ✅ 发布前必须运行 `release:check`
- ✅ 必须更新 CHANGELOG.md
- ✅ 必须遵循 SemVer 版本规范
- ✅ 发布后必须创建 Git tag

### 2.2 版本管理

遵循 [SemVer](https://semver.org/lang/zh-CN/):

```
主版本号。次版本号。修订号
MAJOR.MINOR.PATCH

- MAJOR: 不兼容的 API 更改
- MINOR: 向后兼容的功能新增
- PATCH: 向后兼容的问题修复
```

**示例**：
```bash
# 补丁版本（Bug 修复）
1.0.0 → 1.0.1

# 次版本（新功能）
1.0.1 → 1.1.0

# 主版本（不兼容更改）
1.1.0 → 2.0.0
```

### 2.3 发布脚本

```bash
#!/bin/bash
# publish.sh

# 1. 检查
pnpm release:check

# 2. 构建
pnpm build

# 3. 发布
npm publish --access public

# 4. 打 tag
git tag -a v$npm_package_version -m "Release v$npm_package_version"
git push origin v$npm_package_version

# 5. 更新 CHANGELOG
pnpm changelog
git add CHANGELOG.md
git commit -m "docs: update CHANGELOG"
git push
```

---

## 三、CHANGELOG

### 3.1 生成 CHANGELOG

```bash
# 生成所有历史
pnpm changelog:init

# 更新 CHANGELOG
pnpm changelog
```

### 3.2 CHANGELOG 格式

```markdown
# [1.1.0](compare-url) (2026-04-16)

### Features

* **button:** 添加图标插槽 ([commit](commit-url))
* **input:** 支持自定义验证 ([commit](commit-url))

### Bug Fixes

* **button:** 修复禁用状态样式 ([commit](commit-url))
* **input:** 修复聚焦问题 ([commit](commit-url))
```

**强制规则**：
- ✅ 每次发布必须更新 CHANGELOG
- ✅ CHANGELOG 必须包含 Features 和 Bug Fixes
- ✅ 必须包含 commit 链接

---

## 四、发布检查清单

### 4.1 发布前

- [ ] 所有测试通过
- [ ] Lint 检查通过
- [ ] 构建成功
- [ ] 类型声明文件生成正确
- [ ] CHANGELOG 已更新
- [ ] 版本号符合 SemVer
- [ ] 文档已更新
- [ ] 示例项目测试通过

### 4.2 发布后

- [ ] npm 包发布成功
- [ ] Git tag 创建并推送
- [ ] GitHub Release 创建
- [ ] 文档站点更新
- [ ] 通知团队成员

---

## 五、Workspace 发布

### 5.1 多包管理

```bash
# 根目录 package.json
{
  "scripts": {
    "ui:build": "pnpm recursive run build --filter fit-ui",
    "docs:build": "pnpm recursive run build --filter fit-docs",
    "test:all": "pnpm recursive run test --filter fit-ui --filter fit-docs"
  }
}
```

### 5.2 发布顺序

```bash
# 1. 发布组件库
cd packages/fit-ui
pnpm publish

# 2. 更新文档依赖
cd packages/fit-docs
pnpm update @geniusmanyxh/fit-ui

# 3. 发布文档
pnpm docs:build
```

---

## 六、CDN 和分发

### 6.1 CDN 链接

```html
<!-- unpkg -->
<script src="https://unpkg.com/@geniusmanyxh/fit-ui/dist/lib/full.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@geniusmanyxh/fit-ui/dist/es/fitui.css">

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@geniusmanyxh/fit-ui/dist/lib/full.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@geniusmanyxh/fit-ui/dist/es/fitui.css">
```

### 6.2 按需引入

```typescript
// main.ts
import { createApp } from 'vue'
import FitUI from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/style.css'

const app = createApp(App)
app.use(FitUI)
```

### 6.3 自动导入

```typescript
// vite.config.ts
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

---

## 七、故障处理

### 7.1 构建失败

```bash
# 1. 清理缓存
rm -rf node_modules dist
pnpm install

# 2. 重新构建
pnpm ui:build

# 3. 查看详细错误
pnpm ui:build --debug
```

### 7.2 发布失败

```bash
# 1. 检查 npm 登录
npm whoami

# 2. 重新登录
npm login

# 3. 重新发布
pnpm publish --access public
```

### 7.3 版本冲突

```bash
# 1. 查看已发布版本
npm view @geniusmanyxh/fit-ui versions

# 2. 更新版本号
# 修改 package.json 中的 version

# 3. 重新发布
pnpm publish
```

---

**下一步**：
- 文档规范请阅读 `09-documentation.md`
- 检查清单请阅读 `12-checklists.md`
