---
alwaysApply: false
description: 提交前、发布前自检、检查清单
---
# 检查清单

> **适用场景**：提交前、发布前自检  
> **相关文件**：所有规则文件  
> **预计阅读时间**：5 分钟

---

## 一、新增组件检查清单

提交前必须自检:

### 1.1 文件结构

- [ ] 目录结构符合规范（含 `__tests__`, `style`, `index.ts`, `index.vue`）
- [ ] 组件目录名：**F + 大驼峰**（如 `FButton`）
- [ ] 测试文件：**组件名小写.test.ts**（如 `button.test.ts`）
- [ ] 样式文件：**_组件名.scss**（如 `_button.scss`）

### 1.2 代码规范

- [ ] `index.ts` 使用 `withInstall(comp)`，仅 `export default`
- [ ] `index.vue` 已写 `defineOptions({ name: 'Fxxx', inheritAttrs: false })`
- [ ] `index.vue` 样式通过 `@use` 引用，无内联大段样式
- [ ] `style/index.scss` 使用 `@use`，未使用 `@import`
- [ ] Props 有默认值，template 不会出现 `undefined` class
- [ ] 唯一 ID 只生成一次（如需要）
- [ ] 绝对定位子元素的父级有 `position: relative`

### 1.3 注册和导出

- [ ] 已在 `components.ts` 添加导出
- [ ] 已在 `entry.ts` 添加导入、样式、导出
- [ ] 已在 `full.ts` 添加导入、样式、导出
- [ ] 组件数组顺序保持一致

### 1.4 测试

- [ ] 已补充单元测试（至少 5 个测试用例）
- [ ] 测试包含默认渲染
- [ ] 测试包含关键 Props
- [ ] 测试包含关键事件
- [ ] 测试包含状态（disabled/loading）
- [ ] 测试包含插槽（如有）

### 1.5 文档

- [ ] 已更新组件 JSDoc
- [ ] 已更新 README（如有）
- [ ] 已更新文档站点（如有）
- [ ] 提供至少 3 个使用示例

### 1.6 检查

- [ ] 通过 `pnpm lint`
- [ ] 通过 `pnpm format`
- [ ] 通过 `pnpm test:run`
- [ ] 通过 `pnpm ui:build`

---

## 二、提交前检查清单

### 2.1 代码质量

- [ ] 代码遵循 TypeScript 严格模式
- [ ] 所有测试通过
- [ ] Lint 检查通过
- [ ] 代码已格式化
- [ ] 无 TypeScript 类型错误
- [ ] 无 ESLint 警告

### 2.2 Git 规范

- [ ] Commit 信息符合规范
- [ ] 使用正确的 type（feat/fix/docs/style/refactor/test/chore）
- [ ] Commit 标题不超过 100 字符
- [ ] 已本地测试改动
- [ ] 更新了 CHANGELOG（如适用）

### 2.3 文件检查

- [ ] 无调试代码（console.log/debugger）
- [ ] 无注释掉的代码
- [ ] TODO/FIXME 已记录
- [ ] 新增文件已 git add
- [ ] 删除文件已 git rm

### 2.4 分支检查

- [ ] 基于正确的分支（dev-fit-ui）
- [ ] 分支命名正确（feature/xxx 或 fix/xxx）
- [ ] 无冲突需要解决

---

## 三、发布前检查清单

### 3.1 质量保证

- [ ] 所有测试通过
- [ ] Lint 检查通过
- [ ] 构建成功
- [ ] 类型声明文件生成正确
- [ ] 无控制台错误
- [ ] 无运行时错误

### 3.2 版本管理

- [ ] CHANGELOG 已更新
- [ ] 版本号符合 SemVer
- [ ] 版本号已更新（package.json）
- [ ] 创建 Git tag 计划

### 3.3 文档

- [ ] 文档已更新
- [ ] README 已更新
- [ ] API 文档完整
- [ ] 示例代码可运行
- [ ] 迁移指南（如有 breaking changes）

### 3.4 测试

- [ ] 示例项目测试通过
- [ ] 文档站点构建成功
- [ ] 手动测试关键功能
- [ ] 兼容性测试（浏览器）

### 3.5 发布准备

- [ ] npm 登录（npm whoami）
- [ ] 仓库权限确认
- [ ] 发布脚本准备
- [ ] 回滚计划（如有问题）

---

## 四、Code Review 检查清单

### 4.1 代码风格

- [ ] 遵循命名规范
- [ ] 遵循代码格式
- [ ] 注释充分
- [ ] 无冗余代码
- [ ] 遵循单一职责

### 4.2 功能正确性

- [ ] 功能符合需求
- [ ] 边界情况处理
- [ ] 错误处理完善
- [ ] 无逻辑错误
- [ ] 性能合理

### 4.3 测试

- [ ] 测试覆盖充分
- [ ] 测试用例清晰
- [ ] 测试数据合理
- [ ] 无硬编码测试数据

### 4.4 安全性

- [ ] 无 XSS 风险
- [ ] 无 CSRF 风险
- [ ] 敏感数据加密
- [ ] 输入验证完善

### 4.5 可维护性

- [ ] 代码可读性强
- [ ] 函数大小合理
- [ ] 组件大小合理
- [ ] 无重复代码
- [ ] 依赖合理

---

## 五、PR 检查清单

### 5.1 PR 描述

- [ ] 标题清晰
- [ ] 描述完整
- [ ] 关联 Issue
- [ ] 截图/录屏（UI 改动）
- [ ] 测试步骤

### 5.2 改动范围

- [ ] 改动最小化
- [ ] 无无关改动
- [ ] 重构单独提交
- [ ] 功能单独提交

### 5.3 审查准备

- [ ] 自查完成
- [ ] CI 通过
- [ ] 无冲突
- [ ] Reviewer 指定

---

## 六、日常开发检查清单

### 6.1 开始开发

- [ ] 拉取最新代码
- [ ] 安装依赖
- [ ] 创建分支
- [ ] 了解需求

### 6.2 开发中

- [ ] 遵循代码规范
- [ ] 编写测试
- [ ] 及时提交
- [ ] 更新文档

### 6.3 完成开发

- [ ] 自测通过
- [ ] 运行检查
- [ ] 准备 PR
- [ ] 清理本地

---

## 七、检查命令汇总

```bash
# 开发流程
pnpm lint          # Lint 检查
pnpm format        # 格式化
pnpm test:run      # 运行测试
pnpm ui:build      # 构建

# 提交前
git status         # 检查状态
git diff           # 查看改动
git log            # 查看历史

# 发布前
pnpm release:check # 发布前检查
pnpm release:dry   # 预发布
```

---

## 八、快速参考

### 8.1 新增组件

阅读顺序：
1. `03-file-structure.md` - 组件结构
2. `02-code-style.md` - 代码风格
3. `06-testing.md` - 测试标准
4. 使用本清单自检

### 8.2 提交代码

阅读顺序：
1. `07-commit-guidelines.md` - 提交规范
2. `10-dev-tools.md` - 开发工具
3. 使用本清单自检

### 8.3 构建发布

阅读顺序：
1. `08-build-release.md` - 构建发布
2. 使用本清单自检

---

**相关文档**：
- [COMPONENT_DEVELOPMENT_SPEC.md](../../docs/COMPONENT_DEVELOPMENT_SPEC.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
- [RELEASE.md](../../docs/RELEASE.md)
