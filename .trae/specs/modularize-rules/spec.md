# 规则文件模块化拆分 Spec

## Why

当前所有项目规则集中在单一文件 `project_rules.md` 中（约 13 个章节，数百行内容），导致：
- AI 每次读取规则时占用大量上下文 token
- 规则查找效率低，难以快速定位特定规范
- 规则维护困难，修改某类规则需要编辑大文件
- 无法按需加载规则，资源利用率低

通过模块化拆分，实现：
- 减少每次规则读取的 token 消耗
- 提高规则查找和维护效率
- 支持按需加载特定规则类别
- 提升系统运行效率和资源利用率

## What Changes

- **拆分策略**：按功能类别将 `project_rules.md` 拆分为多个独立规则文件
- **文件组织**：创建 `rules/` 子目录分类存放规则文件
- **索引文件**：保留精简版 `project_rules.md` 作为索引和总览
- **按需加载**：AI 根据任务类型动态读取相关规则文件

## Impact

- **受影响文件**：
  - `d:\gitCode\FitUI\.trae\rules\project_rules.md` - 拆分为多个文件
  - 新增多个规则子文件（见下文）
  
- **能力影响**：
  - AI 规则读取效率提升
  - 上下文 token 使用优化
  - 规则维护性提升

## ADDED Requirements

### Requirement: 规则模块化结构
系统 SHALL 将规则按功能类别拆分为独立文件，包括：
1. `00-index.md` - 规则索引和总览（必读）
2. `01-techstack.md` - 技术栈和项目结构
3. `02-code-style.md` - 代码风格规范（TypeScript, Vue, SCSS）
4. `03-file-structure.md` - 文件组织和目录结构
5. `04-modules-deps.md` - 模块划分和依赖管理
6. `05-error-handling.md` - 错误处理规范
7. `06-testing.md` - 测试标准
8. `07-commit-guidelines.md` - 提交规范
9. `08-build-release.md` - 构建与发布
10. `09-documentation.md` - 文档规范
11. `10-dev-tools.md` - 开发工具与检查
12. `11-best-practices.md` - 最佳实践
13. `12-checklists.md` - 检查清单

### Requirement: 索引文件
`00-index.md` SHALL 包含：
- 规则文件列表和说明
- 使用场景指引（何时读取哪个规则）
- 快速链接到各分类规则

### Requirement: 按需加载指引
每个规则文件 SHALL 在顶部包含：
- 适用场景说明
- 相关规则文件链接
- 预计阅读时间

## MODIFIED Requirements

### Requirement: 规则读取策略
**原规则**：AI 读取完整的 `project_rules.md`

**修改为**：
- 首次接触项目时读取 `00-index.md` 了解全局
- 开发组件时读取 `03-file-structure.md` + `02-code-style.md` + `12-checklists.md`
- 提交代码时读取 `07-commit-guidelines.md` + `12-checklists.md`
- 构建发布时读取 `08-build-release.md` + `12-checklists.md`
- 其他场景按需读取对应规则文件

## REMOVED Requirements

### Requirement: 单一规则文件
**原规则**：所有规则集中在 `project_rules.md`

**原因**：
- Token 消耗大
- 查找效率低
- 维护困难

**迁移方案**：
- 内容已拆分到各分类规则文件
- 保留精简版索引文件提供指引
- 原有规则内容完全保留，仅重组结构
