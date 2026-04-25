# FitUI 组件库 fit-test Demo 项目同步完善计划

## 📋 问题分析

经过对比 `fit-ui` 组件库和 `fit-test` demo 项目，发现以下问题：

### 1. 新增组件缺失 Demo（14 个）

以下组件已在 `fit-ui` 中实现，但 `fit-test` 中没有对应的演示示例：

| 组件名称 | 组件路径 | 状态 |
|---------|---------|------|
| FSpace | `src/FSpace` | ❌ 缺失 |
| FScrollbar | `src/FScrollbar` | ❌ 缺失 |
| FBacktop | `src/FBacktop` | ❌ 缺失 |
| FRate | `src/FRate` | ❌ 缺失 |
| FSlider | `src/FSlider` | ❌ 缺失 |
| FTimePicker | `src/FTimePicker` | ❌ 缺失 |
| FDatePicker | `src/FDatePicker` | ❌ 缺失 |
| FDescriptions | `src/FDescriptions` | ❌ 缺失 |
| FTimeline | `src/FTimeline` | ❌ 缺失 |
| FSteps | `src/FSteps` | ❌ 缺失 |
| FWatermark | `src/FWatermark` | ❌ 缺失 |
| FImage | `src/FImage` | ❌ 缺失 |
| FMessageBox | `src/FMessageBox` | ❌ 缺失 |
| FPopconfirm | `src/FPopconfirm` | ❌ 缺失 |

### 2. 已有组件可能未包含最新修复

以下组件经过了 `any` 类型修复，需要确认 demo 是否使用了最新 API：

- FTable (TableRow 类型变更)
- FBadge (样式类名类型变更)
- FRadio/FCheckbox (移除 as any 断言)
- FDropdown/FBreadcrumb/FInput (icon 类型变更)

### 3. 路由配置缺失

`fit-test` 的路由文件需要更新以包含所有新增组件的路由。

---

## 🎯 实施计划

### Phase 1: 创建新增组件 Demo 示例（14 个组件）

为每个缺失的组件创建 `src/examples/{ComponentName}/index.vue` 文件，包含：

1. **基础用法示例**
2. **常用属性演示**
3. **事件处理示例**
4. **组合使用示例**（如适用）

#### 各组件 Demo 内容规划：

**FSpace**
- 基础间距
- 垂直/水平方向
- 自定义间距
- 自动换行
- 对齐方式

**FScrollbar**
- 基础滚动条
- 固定高度
- 最大高度
- 自定义滚动条样式

**FBacktop**
- 基础回到顶部
- 自定义位置
- 自定义图标/内容
- 可见高度阈值

**FRate**
- 基础评分
- 半星评分
- 自定义图标
- 只读模式
- 尺寸大小

**FSlider**
- 基础滑块
- 范围选择
- 带输入框
- 垂直滑块
- 步长设置
- 自定义标记

**FTimePicker**
- 基础时间选择
- 时间范围
- 格式设置
- 固定选项

**FDatePicker**
- 基础日期选择
- 日期范围
- 月份选择
- 年份选择
- 日期时间选择

**FDescriptions**
- 基础描述列表
- 带边框
- 自定义列数
- 尺寸大小
- 自定义标签样式

**FTimeline**
- 基础时间线
- 自定义节点颜色
- 自定义节点大小
- 自定义节点图标
- 反向时间线

**FSteps**
- 基础步骤条
- 带状态
- 简洁风格
- 垂直方向
- 带描述

**FWatermark**
- 基础水印
- 自定义内容
- 自定义样式
- 图片水印

**FImage**
- 基础图片
- 填充模式
- 懒加载
- 预览功能
- 加载状态

**FMessageBox**
- 基础弹窗
- 确认弹窗
- 输入弹窗
- 自定义样式

**FPopconfirm**
- 基础气泡确认
- 自定义文本
- 位置控制

### Phase 2: 更新路由配置

在 `fit-test/src/router/router.ts` 中添加所有新增组件的路由配置。

### Phase 3: 验证已有组件 Demo

检查以下经过修复的组件 demo 是否与最新 API 保持一致：

- FTable: 确认数据传递方式正确
- FInput: 确认 prefixIcon/suffixIcon 使用正确类型
- FDropdown: 确认 icon 属性使用正确
- FRadio/FCheckbox: 确认 value 属性使用正确

### Phase 4: 测试验证

1. 启动 `fit-test` 开发服务器
2. 访问每个新增组件的 demo 页面
3. 验证功能正常工作
4. 确认样式显示正确

---

## 📁 文件结构

完成后的目录结构：

```
packages/fit-test/src/examples/
├── FSpace/
│   └── index.vue
├── FScrollbar/
│   └── index.vue
├── FBacktop/
│   └── index.vue
├── FRate/
│   └── index.vue
├── FSlider/
│   └── index.vue
├── FTimePicker/
│   └── index.vue
├── FDatePicker/
│   └── index.vue
├── FDescriptions/
│   └── index.vue
├── FTimeline/
│   └── index.vue
├── FSteps/
│   └── index.vue
├── FWatermark/
│   └── index.vue
├── FImage/
│   └── index.vue
├── FMessageBox/
│   └── index.vue
├── FPopconfirm/
│   └── index.vue
└── ... (existing components)
```

---

## ⏱️ 预估工作量

- **Phase 1**: 创建 14 个组件 demo 示例
- **Phase 2**: 更新路由配置
- **Phase 3**: 验证已有组件
- **Phase 4**: 测试验证

---

## ✅ 验收标准

1. [ ] 所有 14 个新增组件均有对应的 demo 示例
2. [ ] 每个 demo 至少包含 3 个使用场景
3. [ ] 路由配置完整，所有组件均可正常访问
4. [ ] 已有组件 demo 与最新 API 保持一致
5. [ ] 所有 demo 页面功能正常，无控制台错误
6. [ ] 样式显示正确
