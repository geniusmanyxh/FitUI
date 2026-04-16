---
alwaysApply: false
description: 提交规范
---
# 提交规范

> **适用场景**：提交代码、Git 操作  
> **相关文件**：`10-dev-tools.md`（开发工具）、`12-checklists.md`（检查清单）  
> **预计阅读时间**：6 分钟

---

## 一、Commit 格式

### 1.1 基本格式

```
<type>(<scope>): <subject>
```

**示例**：
```
feat(button): 添加图标插槽
fix(input): 修复输入框聚焦问题
docs: 更新安装说明
style: 格式化代码
refactor(utils): 重构工具函数
test(message): 增加消息组件测试
chore: 更新依赖版本
```

### 1.2 完整格式（可选）

```
<type>(<scope>): <subject>

<body>

<footer>
```

**示例**：
```
feat(button): 添加图标插槽

新增图标插槽功能，支持自定义按钮图标
支持通过 icon 属性指定图标名称
支持通过插槽自定义图标内容

Closes #123
```

---

## 二、Type 类型

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(button): 添加圆形按钮` |
| `fix` | Bug 修复 | `fix(input): 修复输入框样式` |
| `docs` | 文档更新 | `docs: 更新 README` |
| `style` | 格式调整 | `style: 代码格式化` |
| `refactor` | 重构 | `refactor(utils): 重构尺寸工具` |
| `perf` | 性能优化 | `perf: 优化渲染性能` |
| `test` | 测试相关 | `test(button): 增加测试用例` |
| `chore` | 构建/工具 | `chore: 更新 Vite 版本` |
| `ci` | CI 配置 | `ci: 更新 GitHub Actions` |
| `revert` | 回滚 | `revert: 回滚某提交` |

### 2.1 使用场景

#### feat - 新功能

```bash
# 新增组件
git commit -m "feat: 新增 FButton 按钮组件"

# 新增功能
git commit -m "feat(button): 添加图标插槽"
git commit -m "feat(button): 支持 loading 状态"

# 新增 API
git commit -m "feat(button): 添加 color 属性支持自定义颜色"
```

#### fix - Bug 修复

```bash
# 修复样式
git commit -m "fix(button): 修复禁用状态样式错误"

# 修复功能
git commit -m "fix(input): 修复输入框无法聚焦问题"

# 修复类型
git commit -m "fix(types): 修复 ButtonProps 类型定义"
```

#### docs - 文档

```bash
# 更新 README
git commit -m "docs: 更新安装说明"

# 更新注释
git commit -m "docs(button): 完善按钮组件 JSDoc"

# 更新示例
git commit -m "docs: 更新按钮组件使用示例"
```

#### refactor - 重构

```bash
# 重构代码
git commit -m "refactor(button): 提取公共逻辑到 utils"

# 重命名
git commit -m "refactor: 重命名组件目录"

# 优化结构
git commit -m "refactor(utils): 重构工具函数结构"
```

#### chore - 杂项

```bash
# 更新依赖
git commit -m "chore: 更新 Vite 版本"

# 配置修改
git commit -m "chore: 更新 Vite 配置"

# 脚本修改
git commit -m "chore: 更新构建脚本"
```

---

## 三、Commit 规则

### 3.1 强制规则

基于 `commitlint.config.js`：

- ✅ `type-enum`: 必须是定义的 11 种类型之一
- ✅ `header-max-length`: 标题不超过 100 字符
- ✅ `subject-empty`: 主题不能为空
- ✅ `type-empty`: 类型不能为空

### 3.2 标题规范

```bash
# ✅ 正确
git commit -m "feat(button): 添加图标插槽"
git commit -m "fix: 修复按钮点击失效问题"

# ❌ 错误
git commit -m "fix bug"  # 缺少 type
git commit -m "feat:"  # 缺少 subject
git commit -m "feat(button): "  # subject 为空
```

### 3.3 时态和语态

```bash
# ✅ 正确：使用祈使句（现在时）
git commit -m "feat: 添加图标插槽"
git commit -m "fix: 修复样式错误"

# ❌ 错误：使用过去时
git commit -m "feat: 添加了图标插槽"
git commit -m "fix: 修复了样式错误"
```

---

## 四、Git 工作流

### 4.1 分支管理

```bash
# 1. 切换到开发分支
git checkout dev-fit-ui

# 2. 创建功能分支
git checkout -b feature/button-icon

# 3. 开发并提交
git add .
git commit -m "feat(button): 添加图标插槽"

# 4. 推送分支
git push origin feature/button-icon

# 5. 创建 Pull Request
# 在 GitHub 上创建 PR 到 dev-fit-ui 分支
```

**分支命名**：
- `feature/xxx` - 新功能
- `fix/xxx` - Bug 修复
- `docs/xxx` - 文档更新
- `refactor/xxx` - 重构
- `test/xxx` - 测试相关

**强制规则**：
- ✅ 功能开发必须基于 `dev-fit-ui` 分支
- ✅ 禁止直接推送到 `main` 或 `master` 分支
- ✅ 使用 Husky 钩子自动检查 commit 规范

### 4.2 提交频率

```bash
# ✅ 正确：小步提交
git add src/FButton/index.vue
git commit -m "feat(button): 实现基础结构"

git add src/FButton/style/_button.scss
git commit -m "feat(button): 添加样式"

git add src/FButton/__tests__/button.test.ts
git commit -m "feat(button): 添加测试"

# ❌ 错误：一次性提交所有
git add .
git commit -m "feat: 完成按钮组件"  # 提交过大，难以 review
```

**强制规则**：
- ✅ 逻辑相关的改动应该分开提交
- ✅ 每个提交应该有明确的目的
- ✅ 提交前确保代码可运行

---

## 五、提交前检查

### 5.1 自检清单

提交前必须确认：

```bash
# 1. 代码检查
pnpm lint

# 2. 代码格式化
pnpm format

# 3. 运行测试
pnpm test:run

# 4. 类型检查
pnpm ui:build

# 5. 本地测试
# 在 fit-test 或 fit-docs 中测试组件
```

### 5.2 Git Hooks

使用 Husky 配置：

```bash
.husky/
├── pre-commit         # 提交前检查（lint, format）
├── pre-push           # 推送前检查（test）
└── commit-msg         # Commit 信息检查（commitlint）
```

**强制规则**：
- ✅ 禁止跳过 Git hooks
- ✅ 禁止使用 `--no-verify` 提交
- ✅ 提交失败必须先修复问题

---

## 六、常用命令

### 6.1 提交

```bash
# 添加所有改动
git add .

# 添加特定文件
git add src/FButton/

# 交互式添加
git add -p

# 提交
git commit -m "feat(button): 添加图标插槽"

# 修改最后一次提交
git commit --amend -m "feat(button): 添加图标插槽"
```

### 6.2 使用 git-cz（可选）

```bash
# 安装
pnpm install -g commitizen

# 使用交互式提交
git cz

# 或使用项目脚本
pnpm commit
```

### 6.3 查看历史

```bash
# 查看提交历史
git log --oneline

# 查看特定文件历史
git log --oneline src/FButton/

# 查看提交详情
git show <commit-hash>
```

---

## 七、提交信息示例

### 7.1 新增组件

```bash
feat: 新增 FButton 按钮组件

实现按钮组件的基础功能
支持多种类型和尺寸
支持 loading 和 disabled 状态
添加完整的单元测试

Closes #100
```

### 7.2 修复 Bug

```bash
fix(button): 修复禁用状态样式错误

修复 disabled 状态下按钮仍可点击的问题
修复 disabled 样式优先级问题

Fixes #123
```

### 7.3 重构

```bash
refactor(utils): 重构尺寸工具函数

提取公共逻辑到单独函数
优化类型定义
增加单元测试覆盖率

BREAKING CHANGE: 尺寸工具函数签名变更
```

---

**下一步**：
- 开发工具请阅读 `10-dev-tools.md`
- 检查清单请阅读 `12-checklists.md`
