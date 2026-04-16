---
alwaysApply: false
description: 规则索引和总览
---
# FitUI 规则索引

> **适用场景**：首次接触项目或需要了解规则体系时阅读  
> **相关文件**：所有规则文件（01-12）  
> **预计阅读时间**：5 分钟

---

## 快速导航

### 📚 规则文件列表

| 编号 | 文件名 | 说明 | 适用场景 |
|------|--------|------|----------|
| 00 | `00-index.md` | 规则索引和总览 | 首次了解规则体系 |
| 01 | `01-techstack.md` | 技术栈和项目结构 | 配置开发环境、了解项目架构 |
| 02 | `02-code-style.md` | 代码风格规范 | 编写代码、Code Review |
| 03 | `03-file-structure.md` | 文件组织和目录结构 | 新增组件、重构目录 |
| 04 | `04-modules-deps.md` | 模块划分和依赖管理 | 设计模块、管理依赖 |
| 05 | `05-error-handling.md` | 错误处理规范 | 处理异常、提升健壮性 |
| 06 | `06-testing.md` | 测试标准 | 编写测试、验证功能 |
| 07 | `07-commit-guidelines.md` | 提交规范 | 提交代码、Git 操作 |
| 08 | `08-build-release.md` | 构建与发布 | 构建项目、发布版本 |
| 09 | `09-documentation.md` | 文档规范 | 编写注释、更新文档 |
| 10 | `10-dev-tools.md` | 开发工具与检查 | 代码检查、格式化 |
| 11 | `11-best-practices.md` | 最佳实践 | 性能优化、无障碍访问 |
| 12 | `12-checklists.md` | 检查清单 | 提交前、发布前自检 |

---

## 🎯 使用场景指引

### 开发新组件

**阅读顺序**：
1. `03-file-structure.md` - 了解组件目录结构
2. `02-code-style.md` - 遵循代码风格规范
3. `06-testing.md` - 编写测试用例
4. `12-checklists.md` - 使用「新增组件检查清单」自检

### 提交代码

**阅读顺序**：
1. `07-commit-guidelines.md` - 遵循提交规范
2. `10-dev-tools.md` - 运行代码检查
3. `12-checklists.md` - 使用「提交前检查清单」自检

### 构建发布

**阅读顺序**：
1. `08-build-release.md` - 执行构建和发布流程
2. `12-checklists.md` - 使用「发布前检查清单」自检

### Code Review

**阅读顺序**：
1. `02-code-style.md` - 检查代码风格
2. `03-file-structure.md` - 检查文件组织
3. `06-testing.md` - 检查测试覆盖
4. `11-best-practices.md` - 检查最佳实践

### 配置开发环境

**阅读顺序**：
1. `01-techstack.md` - 了解技术栈
2. `10-dev-tools.md` - 安装开发工具

---

## 📖 规则体系说明

### 规则分类

- **基础规则**（01-04）：技术栈、代码风格、文件结构、模块依赖
- **开发流程**（05-07）：错误处理、测试、提交规范
- **发布维护**（08-10）：构建发布、文档、开发工具
- **优化提升**（11-12）：最佳实践、检查清单

### 规则级别

- ✅ **强制规则**：必须遵守，使用「✅」标记
- 💡 **推荐实践**：建议遵守，使用「💡」标记
- ⚠️ **注意事项**：需要留意，使用「⚠️」标记

### 规则更新

规则文件应随项目发展定期更新，更新流程：
1. 提出更新建议（Issue 或 PR）
2. 团队讨论并达成一致
3. 更新对应规则文件
4. 同步更新索引文件
5. 通知团队成员

---

## 🔗 相关链接

- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)
- [Vitest 文档](https://vitest.dev/)
- [UnoCSS 文档](https://unocss.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**版本**: 2.0.0（模块化版本）  
**最后更新**: 2026-04-16  
**维护者**: FitUI Team
