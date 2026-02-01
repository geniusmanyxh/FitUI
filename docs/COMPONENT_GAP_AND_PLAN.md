# FitUI 组件缺口与规划

## 一、当前已有组件（15 个）

| 组件 | 说明 | 分类 |
|------|------|------|
| FButton | 按钮 | 通用 |
| FIcon | 图标 | 通用 |
| FInput | 输入框 | 表单 |
| FMessage | 消息提示（全局） | 反馈 |
| FCodeBlock | 代码块 | 数据展示 |
| FToolTip | 文字提示 | 通用 |
| FTag | 标签 | 数据展示 |
| FSwitch | 开关 | 表单 |
| FCheckbox | 复选框 | 表单 |
| FModal | 弹窗/对话框 | 反馈 |
| FRadio | 单选框 | 表单 |
| FLoading | 加载态 | 反馈 |
| FAlert | 警告提示 | 反馈 |
| FTabs | 标签页 | 导航 |
| FDropdown | 下拉菜单 | 导航 |

**Hooks**：useMessage

---

## 二、常见缺口组件（按优先级建议）

参考 Element Plus、Ant Design Vue、Naive UI 等库，以下组件为常见业务刚需或高频使用，可按优先级补充。

### 高优先级（表单与数据录入）

| 组件 | 说明 | 典型用法 |
|------|------|----------|
| **FSelect** | 选择器（下拉选择） | 单选/多选、可搜索、远程搜索 |
| **FInputNumber** | 数字输入框 | 步进、范围、精度 |
| **FForm / FFormItem** | 表单与表单项 | 校验、布局、label 对齐 |
| **FTextarea** | 多行文本（或并入 FInput 的 type） | 自适应高度、maxlength |

### 中优先级（数据展示与布局）

| 组件 | 说明 | 典型用法 |
|------|------|----------|
| **FTable** | 表格 | 排序、分页、选择、固定列 |
| **FPagination** | 分页 | 与 FTable 配套 |
| **FCard** | 卡片 | 标题、操作区、内容区 |
| **FDivider** | 分割线 | 水平/垂直、文案 |
| **FEmpty** | 空状态 | 无数据、无结果 |
| **FBadge** | 徽标数 | 角标、数字、圆点 |
| **FAvatar** | 头像 | 图片/文字/图标 |
| **FProgress** | 进度条 | 线型/环形、百分比 |

### 中低优先级（导航与反馈）

| 组件 | 说明 | 典型用法 |
|------|------|----------|
| **FMenu** | 菜单 | 侧边栏、顶栏、多级 |
| **FBreadcrumb** | 面包屑 | 路径导航 |
| **FDrawer** | 抽屉 | 侧滑面板 |
| **FPopover** | 气泡卡片 | 触发、内容、定位 |
| **FNotification** | 通知提醒 | 角标通知、列表 |
| **FSkeleton** | 骨架屏 | 加载占位 |
| **FResult** | 结果页 | 成功/失败/403/404 |

### 低优先级（按需补充）

| 组件 | 说明 |
|------|------|
| FDatePicker / FTimePicker | 日期/时间选择 |
| FSlider | 滑块 |
| FUpload | 文件上传 |
| FTree | 树形控件 |
| FCollapse | 折叠面板 |
| FImage | 图片（预览、懒加载） |
| FSpace | 间距 |
| FGrid / FLayout / FContainer | 栅格/布局/容器 |
| FBackTop / FAffix | 回到顶部 / 固钉 |
| FColorPicker / FRate / FTransfer 等 | 按业务需求再定 |

---

## 三、实施计划建议

1. **第一阶段**：补齐高优先级表单与录入（FSelect、FInputNumber、FForm/FFormItem、FTextarea），保证表单场景闭环。
2. **第二阶段**：数据展示与布局（FTable、FPagination、FCard、FEmpty、FDivider、FBadge、FAvatar、FProgress）。
3. **第三阶段**：导航与反馈（FMenu、FBreadcrumb、FDrawer、FPopover、FNotification、FSkeleton、FResult）。
4. **第四阶段**：按业务需求从低优先级列表中挑选实现。

每新增一个组件，必须遵循 [组件开发规范](./COMPONENT_DEVELOPMENT_SPEC.md)，并在 `components.ts`、`entry.ts`、`full.ts` 中完成注册与导出。
