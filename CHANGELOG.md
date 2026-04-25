# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- FMessage 函数式 API 支持（`useMessage()`）
- FNotification 函数式 API 支持（`useNotification()`）
- FLoading 服务式调用（`useLoading()`）
- **components:** 新增 FDatePicker 日期选择器
- **components:** 新增 FTimePicker 时间选择器
- **components:** 新增 FSlider 滑块组件
- **components:** 新增 FRate 评分组件
- **components:** 新增 FSpace 间距组件
- **components:** 新增 FScrollbar 滚动条组件
- **components:** 新增 FBacktop 回到顶部组件
- **components:** 新增 FWatermark 水印组件
- **components:** 新增 FTimeline 时间线组件
- **components:** 新增 FSteps 步骤条组件
- **components:** 新增 FDescriptions 描述列表组件
- **components:** 新增 FImage 图片组件
- **components:** 新增 FMessageBox 弹窗确认组件
- **components:** 新增 FPopconfirm 气泡确认框组件
- **styles:** 完善 CSS 变量体系（Design Tokens）
- **styles:** 扩展暗色主题至所有组件

### Changed

- 消除所有 `any` 类型断言
- 优化 `withInstall` 工具函数类型定义
- 优化 vite.config.ts 类型安全性
- 修复 `<script setup>` 中 ES 模块导出问题
- 构建体积优化

### Fixed

- 修复 FMessage 中 `defaultIcon` 和 `durationTimer` 类型定义
- 修复 FDescriptions 和 FSteps 中的 provide key 导出问题

---

## [2.0.1](https://github.com/geniusmanyxh/FitUI/compare/v2.0.0...v2.0.1) (2025-04-26)

### Fixed

- 修复 FModal 组件拖拽功能中 ref 类型错误

---

## [2.0.0](https://github.com/geniusmanyxh/FitUI/compare/v1.0.2...v2.0.0) (2023-11-13)

### Breaking Changes

- 全面升级至 Vue 3 Composition API
- 全面采用 TypeScript
- 引入 UnoCSS 原子化 CSS 方案

### Features

- **icon:** 新增 mono-icon
- **select:** 新增 FSelect 下拉选择器（支持多选、远程搜索、分组）
- **input:** 新增 FInput 输入框（支持 textarea、password、前后缀）
- **modal:** 新增 FModal 对话框（支持拖拽、焦点陷阱）
- **tabs:** 新增 FTabs 标签页

### Bug Fixes

- **icon:** 修复未知图标

---

## [1.0.2](https://github.com/geniusmanyxh/FitUI/compare/v1.0.1...v1.0.2) (2023-11-10)

### Features

- 新增 FTable 表格组件
- 新增 FForm 表单组件
- 新增 FMessage 消息提示组件
- 新增 FNotification 通知组件
- 新增 FLoading 加载组件

---

## [1.0.1](https://github.com/geniusmanyxh/FitUI/compare/v0.0.1-alpha...v1.0.1) (2023-11-07)

### Features

- 发布 fit-ui 0.0.2 版本
- 完善按钮组件基本样式
- 完善 FButton 和 FIcon 组件内容
- 首次发布

### Bug Fixes

- 修复 fit-ui 类型声明的路径问题

---

## [0.0.1-alpha](https://github.com/geniusmanyxh/FitUI/compare/93ae1f1...0.0.1-alpha) (2023-08-10)

### Features

- 项目初始化

### Bug Fixes

- 修复 GitHub 工作流代码注释错误
