# FitUI 组件库全面改造计划

> 目标版本：v3.0.0  
> 对标标准：Element Plus 2.11+ / Naive UI / Ant Design Vue  
> 计划周期：分 4 个阶段，约 16-20 周  
> 评审基准：基于 [FitUI 项目全面评审报告](./FitUI%20项目全面评审报告.md)（综合评分 73.6/100）

---

## 一、改造目标与对标基准

### 1.1 核心目标

| 指标 | 当前状态 | 目标状态 | 对标对象 |
|------|----------|----------|----------|
| 组件数量 | 33 个 | 75+ 个 | Element Plus 80+ |
| 测试覆盖率 | ~100%（简单用例） | >85% 行覆盖率 | Element Plus >90% |
| 文档覆盖 | 18% | 100% | Element Plus 100% |
| ARIA 覆盖 | 22 个组件 | 所有交互组件 | WCAG 2.1 AA |
| any 类型残留 | 多处 | 0 | TypeScript 严格模式 |
| 构建体积（ESM） | 未优化 | Tree Shaking < 50KB（Button） | Element Plus ~30KB |
| API 一致性 | 不统一 | 100% 遵循设计规范 | Element Plus Design Token |

### 1.2 对标竞品分析

**Element Plus 2.11 组件体系（约 80 个组件）**：

| 分类 | 数量 | 代表组件 | FitUI 差距 |
|------|------|----------|------------|
| 基础 | 12 | Button、Icon、Layout、Text、Scrollbar、Space、Splitter | 缺 6 个 |
| 表单 | 24 | Input、Select、Cascader、DatePicker、ColorPicker、TreeSelect、Upload | 缺 10 个 |
| 数据 | 14 | Table、TableV2、Pagination、Tag、Progress、Tree、Descriptions | 缺 6 个 |
| 导航 | 13 | Menu、Tabs、Breadcrumb、Dropdown、Steps、PageHeader | 缺 5 个 |
| 反馈 | 10 | Alert、Dialog、Drawer、Loading、Message、MessageBox | 缺 3 个 |
| 其他 | 7 | Divider、Watermark、Backtop、Result、Empty、Skeleton、Timeline | 缺 3 个 |

---

## 二、组件功能完善清单

### 2.1 P0 - 核心组件补全（必须，对标 Element Plus 基础功能）

| 优先级 | 组件名 | 分类 | 核心功能要求 | 预计工时 |
|--------|--------|------|-------------|----------|
| P0 | FDatePicker | 表单 | 日期/日期范围/日期时间/月份/年份选择 | 5 天 |
| FDateTimePicker | 表单 | 日期时间组合选择器 | 3 天 |
| FCascader | 表单 | 级联选择、动态加载、多选、可搜索 | 4 天 |
| FTree | 数据 | 树形控件、拖拽、懒加载、勾选、筛选 | 5 天 |
| FTreeSelect | 表单 | 树形下拉选择 | 3 天 |
| FUpload | 表单 | 文件上传、拖拽上传、图片预览、裁剪 | 4 天 |
| FColorPicker | 表单 | 颜色选择、HEX/RGB/HSL 格式、预定义颜色 | 3 天 |
| FTransfer | 表单 | 穿梭框、搜索、自定义渲染 | 3 天 |
| FSlider | 表单 | 滑块、范围选择、垂直模式、标记 | 2 天 |
| FTimePicker | 表单 | 时间/时间范围选择 | 2 天 |
| FAutoComplete | 表单 | 自动完成、远程搜索 | 2 天 |
| FRate | 表单 | 评分、半星、自定义图标 | 1 天 |
| FScrollbar | 基础 | 自定义滚动条、滚动控制 | 2 天 |
| FSpace | 基础 | 间距容器、响应式 | 1 天 |
| FBacktop | 其他 | 回到顶部、自定义触发 | 1 天 |
| FWatermark | 其他 | 水印、文字/图片水印、全屏 | 2 天 |
| FTimeline | 数据 | 时间线、自定义节点、垂直/水平 | 2 天 |
| FSteps | 导航 | 步骤条、垂直/水平、点状 | 2 天 |
| FDescriptions | 数据 | 描述列表、响应式布局 | 2 天 |
| FPageHeader | 导航 | 页头、返回按钮、自定义内容 | 1 天 |
| FAffix | 基础 | 固钉、偏移量控制 | 2 天 |
| FImage | 数据 | 图片预览、懒加载、错误占位 | 2 天 |
| FCarousel | 数据 | 轮播、指示器、箭头控制 | 3 天 |
| FPopconfirm | 反馈 | 气泡确认框 | 1 天 |
| FMessageBox | 反馈 | 弹窗确认、prompt、alert | 2 天 |
| FSkeleton | 数据 | 骨架屏（已有，需增强动画和预设模板） | 2 天 |

### 2.2 P1 - 现有组件功能增强

| 组件 | 当前能力 | 增强目标 | 对标 |
|------|----------|----------|------|
| FTable | 基础表格 | 虚拟滚动（TableV2）、固定列/表头、列拖拽排序、单元格编辑 | ElTable + ElTableV2 |
| FSelect | 单选/多选/远程 | 虚拟列表、TreeSelect 模式、Cascader 模式 | ElSelect |
| FInput | 基础输入 | 搜索输入（组合 AutoComplete）、密码强度指示器 | ElInput + ElAutocomplete |
| FModal | 弹窗 | MessageBox 函数式调用、拖拽调整大小、多标签页 | ElDialog |
| FDrawer | 抽屉 | 可调整大小（resizable）、嵌套抽屉 | ElDrawer 2.11 |
| FForm | 表单验证 | 嵌套验证、异步验证、动态表单、规则链 | ElForm |
| FLoading | 加载 | 服务式调用（全局 Loading）、指令式、全屏锁定 | ElLoading |
| FMessage | 消息 | 函数式调用、分组、堆叠、自定义 Duration | ElMessage |
| FNotification | 通知 | 函数式调用、分组、位置控制 | ElNotification |
| FMenu | 菜单 | 水平/垂直、路由集成、折叠动画、SubMenu | ElMenu |
| FBreadcrumb | 面包屑 | Separator 自定义、路由自动识别、Slot 支持 | ElBreadcrumb |
| FCodeBlock | 代码块 | 行号、复制、全屏、多标签页、自定义主题 | 增强现有 |

### 2.3 P2 - 高级组件

| 组件 | 分类 | 核心功能 | 预计工时 |
|------|------|----------|----------|
| FSplitter | 基础 | 分割面板、可调整大小、方向切换 | 3 天 |
| FTypography | 基础 | 排版组件（Title、Paragraph、Text、Link） | 2 天 |
| FAnchor | 导航 | 锚点导航、滚动监听、偏移量 | 2 天 |
| FMention | 表单 | @提及、远程搜索 | 2 天 |
| FSegmented | 基础 | 分段控制器 | 1 天 |
| FQRCode | 数据 | 二维码生成 | 2 天 |
| FStatistic | 数据 | 统计数值、倒计时 | 1 天 |

---

## 三、API 设计规范对齐方案

### 3.1 Props 命名规范

**对标 Element Plus Design Guide**，统一以下规则：

| 规范项 | 当前状态 | 目标标准 | 影响范围 |
|--------|----------|----------|----------|
| 布尔值命名 | 混用 disabled/closable | 统一 `isXxx` 或 `xxxable` 风格 | 所有组件 |
| 尺寸命名 | small/medium/large | 统一 small/default/large | 所有组件 |
| 类型枚举 | 字符串字面量 | 统一导出枚举类型 | 所有组件 |
| modelValue | 部分使用 | 所有表单组件统一 v-model | 表单组件 |
| 事件命名 | click/change | 统一 `update:xxx` + 语义化事件 | 所有组件 |

### 3.2 统一 Props 接口

```typescript
// 1. 尺寸规范（统一所有组件）
type SizeType = 'small' | 'default' | 'large'

// 2. 状态色规范（统一所有状态组件）
type StatusType = 'success' | 'warning' | 'danger' | 'info' | 'default'

// 3. 表单组件统一接口
interface FormComponentProps {
  modelValue?: unknown
  size?: SizeType
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  clearable?: boolean
  validateEvent?: boolean
}

// 4. 弹出层组件统一接口
interface PopupComponentProps {
  visible?: boolean
  appendTo?: string | HTMLElement
  teleported?: boolean
  zIndex?: number
  lockScroll?: boolean
  closeOnPressEscape?: boolean
  closeOnClickOutside?: boolean
}
```

### 3.3 Emits 规范

```typescript
// 统一事件命名规范
interface StandardEmits<T = unknown> {
  // v-model 更新
  (e: 'update:modelValue', value: T): void
  // 值变更
  (e: 'change', value: T): void
  // 焦点事件
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  // 可见性变更
  (e: 'visible-change', visible: boolean): void
}
```

### 3.4 函数式 API 规范

```typescript
// 对标 Element Plus 函数式调用
// FMessage
const message = useMessage()
message.info('提示')
message.success('成功')
message.error('错误')
message.warning('警告')
message.closeAll()

// FNotification
const notify = useNotification()
notify({ title: '通知', message: '内容', duration: 4500 })

// FLoading
const loading = useLoading()
const { close } = loading({ fullscreen: true, text: '加载中...' })
close()

// FMessageBox
const box = useMessageBox()
box.confirm('确认删除？', '提示', { confirmButtonText: '删除' })
box.alert('操作完成', '提示')
box.prompt('请输入名称', '提示', { inputPattern: /^[a-z]+$/ })
```

### 3.5 Expose 规范

```typescript
// 统一暴露方法命名
interface StandardExpose {
  // 聚焦/失焦
  focus: () => void
  blur: () => void
  // 验证（表单组件）
  validate: () => Promise<boolean>
  // 重置
  reset: () => void
  // 打开/关闭（弹出层）
  open: () => void
  close: () => void
}
```

---

## 四、性能优化策略

### 4.1 构建产物优化

| 优化项 | 当前状态 | 优化方案 | 预期效果 |
|--------|----------|----------|----------|
| Tree Shaking | 基础支持 | 完善 sideEffects 配置、移除无用导出 | 按需引入体积减少 40% |
| 代码分割 | 未配置 | 按组件目录分割 chunk | 首屏加载减少 60% |
| CSS 提取 | 内嵌 | 独立 CSS 文件、按需加载 | CSS 体积减少 50% |
| 类型声明 | 基本完整 | rollupTypes 合并为单个 d.ts | 类型文件大小减少 70% |
| 移除 dev 依赖 | - | 生产构建剥离调试代码 | 构建体积减少 20% |

```typescript
// vite.config.ts 优化
build: {
  lib: {
    entry: { index: './src/full.ts' },
    formats: ['es', 'cjs'],
    fileName: (format) => `fitui.${format === 'es' ? 'mjs' : 'cjs'}`,
  },
  rollupOptions: {
    external: ['vue'],
    output: {
      globals: { vue: 'Vue' },
      chunkFileNames: 'chunks/[name]-[hash].js',
      // Tree Shaking 优化
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  },
  cssCodeSplit: true, // CSS 代码分割
  reportCompressedSize: false, // 生产关闭
}
```

### 4.2 运行时性能优化

| 优化项 | 方案 | 预期效果 |
|--------|------|----------|
| 虚拟滚动 | FSelect、FTable、FTree 引入虚拟列表 | 万级数据渲染性能提升 100 倍 |
| 防抖/节流 | scroll/resize/input 事件统一处理 | CPU 占用减少 30% |
| 懒加载组件 | defineAsyncComponent + Suspense | 首屏 FCP 减少 40% |
| v-memo 优化 | 静态/少变元素使用 v-memo | 重渲染减少 50% |
| shallowRef/shallowReactive | 大对象使用浅响应式 | 内存占用减少 40% |

### 4.3 Table 虚拟滚动专项

```typescript
// TableV2 技术方案
- 基于 @tanstack/vue-virtual 或自研虚拟列表引擎
- 支持千万级数据流畅滚动
- 内存占用降低 60%
- 固定列/固定表头
- 单元格懒渲染
```

### 4.4 性能监控

```typescript
// 集成性能监控指标
- 首屏渲染时间（FCP）< 500ms
- 组件挂载时间 < 50ms
- 列表滚动帧率 > 55fps
- 内存泄漏检测
```

---

## 五、样式系统重构方案

### 5.1 CSS 变量体系（Design Tokens）

**对标 Element Plus Design Token**，建立完整的 CSS 变量系统：

```scss
// 1. 基础色板（对标 Element Plus）
:root {
  // 品牌色
  --f-color-primary: #409eff;
  --f-color-primary-light-3: #79bbff;
  --f-color-primary-light-5: #a0cfff;
  --f-color-primary-light-7: #c6e2ff;
  --f-color-primary-light-8: #d9ecff;
  --f-color-primary-light-9: #ecf5ff;
  --f-color-primary-dark-2: #337ecc;

  // 功能色
  --f-color-success: #67c23a;
  --f-color-warning: #e6a23c;
  --f-color-danger: #f56c6c;
  --f-color-info: #909399;

  // 文本色
  --f-text-color-primary: #303133;
  --f-text-color-regular: #606266;
  --f-text-color-secondary: #909399;
  --f-text-color-placeholder: #a8abb2;

  // 边框色
  --f-border-color-base: #dcdfe6;
  --f-border-color-light: #e4e7ed;
  --f-border-color-lighter: #ebeef5;
  --f-border-color-extra-light: #f2f6fc;

  // 背景色
  --f-bg-color: #ffffff;
  --f-bg-color-page: #f2f3f5;
  --f-bg-color-overlay: #ffffff;

  // 填充色
  --f-fill-color: #f0f2f5;
  --f-fill-color-light: #f5f7fa;
  --f-fill-color-lighter: #fafafa;

  // 字体
  --f-font-size-extra-large: 20px;
  --f-font-size-large: 18px;
  --f-font-size-medium: 14px;
  --f-font-size-base: 14px;
  --f-font-size-small: 13px;
  --f-font-size-extra-small: 12px;

  // 间距
  --f-spacing-xs: 4px;
  --f-spacing-sm: 8px;
  --f-spacing-md: 12px;
  --f-spacing-base: 16px;
  --f-spacing-lg: 20px;
  --f-spacing-xl: 24px;

  // 圆角
  --f-border-radius-base: 4px;
  --f-border-radius-small: 2px;
  --f-border-radius-round: 20px;
  --f-border-radius-circle: 100%;

  // 阴影
  --f-box-shadow-light: 0 2px 12px rgba(0, 0, 0, 0.1);
  --f-box-shadow-lighter: 0 2px 8px rgba(0, 0, 0, 0.06);
  --f-box-shadow-dark: 0 4px 16px rgba(0, 0, 0, 0.15);

  // 动画
  --f-transition-duration: 0.3s;
  --f-transition-duration-fast: 0.2s;
}
```

### 5.2 SCSS 混入（Mixins）

```scss
// 1. BEM 命名混入
@mixin b($block) {
  .f-#{$block} {
    @content;
  }
}

@mixin e($element) {
  &__#{$element} {
    @content;
  }
}

@mixin m($modifier) {
  &--#{$modifier} {
    @content;
  }
}

@mixin when($state) {
  &.is-#{$state} {
    @content;
  }
}

// 2. 尺寸混入
@mixin size($size-map) {
  @each $size, $props in $size-map {
    &--#{$size} {
      @each $prop, $value in $props {
        #{$prop}: $value;
      }
    }
  }
}

// 3. 文本截断混入
@mixin text-overflow($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

### 5.3 暗色主题完善

```scss
// 当前暗色主题仅覆盖基础色，需扩展至所有组件
[data-theme='dark'] {
  // 扩展暗色 CSS 变量（对标 Element Plus dark mode）
  color-scheme: dark;
  
  // 新增：组件级别暗色变量
  --f-input-bg-color: #141414;
  --f-input-border-color: #434343;
  --f-table-border-color: #434343;
  --f-table-header-bg: #1d1e1f;
  --f-table-row-hover-bg: #262727;
  // ... 覆盖所有组件
}
```

### 5.4 样式输出策略

```
// 1. 全量 CSS（适合小项目）
import '@geniusmanyxh/fit-ui/dist/index.css'

// 2. 按需 CSS（推荐）
import '@geniusmanyxh/fit-ui/es/FButton/style/css'

// 3. CSS 变量模式（主题定制）
import '@geniusmanyxh/fit-ui/dist/css-var.css'
```

---

## 六、无障碍支持改进措施

### 6.1 WCAG 2.1 AA 合规性

| 原则 | 当前状态 | 目标 | 实施项 |
|------|----------|------|--------|
| 可感知 | 部分 | 全部 | 颜色对比度 >= 4.5:1、文本替代 |
| 可操作 | 部分 | 全部 | 键盘导航、焦点可见、超时延长 |
| 可理解 | 缺失 | 全部 | 错误提示、标签关联、一致性 |
| 健壮性 | 部分 | 全部 | 语义化 HTML、ARIA 完整 |

### 6.2 具体改进清单

#### 6.2.1 键盘导航

```typescript
// 1. 所有交互元素必须可通过 Tab 键访问
// 2. Arrow 键导航（Select、Tabs、Menu、Tree）
// 3. Enter/Space 激活（Button、Checkbox、Radio）
// 4. Escape 关闭（Modal、Drawer、Dropdown、Select）
// 5. Home/End 跳转（Select、Tree）
// 6. PageUp/PageDown 翻页（Table、Select）
```

#### 6.2.2 ARIA 属性全覆盖

```html
<!-- 组件 ARIA 对照表 -->
| 组件 | role | aria 属性 |
|------|------|-----------|
| FButton | button | aria-label, aria-disabled |
| FSelect | combobox | aria-expanded, aria-haspopup, aria-activedescendant |
| FModal | dialog | aria-modal, aria-labelledby, aria-describedby |
| FAlert | alert | aria-live, role="status" |
| FTabs | tablist | aria-orientation |
| FTabPane | tab/tabpanel | aria-selected, aria-controls |
| FMenu | menubar/menu | aria-orientation, aria-expanded |
| FTree | tree | aria-multiselectable |
| FForm | form | aria-invalid, aria-describedby |
| FInput | textbox | aria-invalid, aria-required, aria-describedby |
| FCheckbox | checkbox | aria-checked |
| FRadio | radio/radiogroup | aria-checked |
| FSwitch | switch | aria-checked |
| FProgress | progressbar | aria-valuenow, aria-valuemin, aria-valuemax |
| FSlider | slider | aria-valuenow, aria-valuemin, aria-valuemax |
| FPagination | navigation | aria-label, aria-current |
| FBreadcrumb | navigation | aria-label |
| FTable | grid/table | aria-rowcount, aria-colcount |
```

#### 6.2.3 焦点管理

```typescript
// 1. :focus-visible 样式（键盘焦点可见，鼠标焦点不可见）
.f-button:focus-visible {
  outline: 2px solid var(--f-color-primary);
  outline-offset: 2px;
}

// 2. 焦点陷阱（Modal、Drawer、Dialog）
// 已有 FModal 实现，需推广到所有弹出层

// 3. 焦点恢复（弹出层关闭后恢复焦点）
// 已有 FModal 实现，需推广
```

#### 6.2.4 颜色对比度

```
// 确保所有文本/背景组合满足 WCAG 2.1 AA 标准：
// - 正常文本：对比度 >= 4.5:1
// - 大文本：对比度 >= 3:1
// - 非文本元素：对比度 >= 3:1

// 工具：使用 axe-core 或 pa11y 自动检测
```

#### 6.2.5 屏幕阅读器支持

```
// 1. 所有图标按钮必须有 aria-label
// 2. 表单输入必须关联 label（aria-labelledby）
// 3. 错误状态必须有 aria-invalid + aria-describedby
// 4. 动态更新区域使用 aria-live
// 5. 加载状态使用 aria-busy
```

### 6.3 无障碍测试

```typescript
// 集成 axe-core 自动化测试
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('FButton has no accessibility violations', async () => {
  const wrapper = mount(FButton)
  const results = await axe(wrapper.element)
  expect(results).toHaveNoViolations()
})
```

---

## 七、文档完善计划

### 7.1 VitePress 文档体系

```
docs/
├── .vitepress/
│   ├── config.ts          # 站点配置
│   └── theme/
│       └── index.ts       # 主题定制
├── zh-CN/                 # 中文文档
│   ├── index.md           # 首页
│   ├── guide/
│   │   ├── getting-started.md   # 快速开始
│   │   ├── theming.md           # 主题定制
│   │   ├── dark-mode.md         # 暗色模式
│   │   ├── i18n.md              # 国际化
│   │   └── migration.md         # 迁移指南
│   ├── components/
│   │   ├── button.md            # 按钮文档
│   │   ├── input.md             # 输入框文档
│   │   └── ...                  # 所有组件文档
│   └── examples/                # 示例代码
└── en-US/                 # 英文文档
    └── ...
```

### 7.2 单个组件文档模板

每个组件文档必须包含：

```markdown
# FButton 按钮

## 基础用法
[代码示例 + 预览]

## 按钮类型
[primary/success/warning/danger/info]

## 按钮尺寸
[small/default/large]

## 禁用状态
[代码示例]

## 加载中状态
[代码示例]

## 图标按钮
[代码示例]

## Props 参数表
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 按钮类型 | string | primary/success/... | default |

## Events 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发 | (event: MouseEvent) |

## Slots 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
| loading | 自定义加载图标 |

## Expose 暴露方法
| 方法名 | 说明 | 类型 |

## 无障碍说明
- 键盘支持：Enter/Space 激活
- 屏幕阅读器：aria-label 支持

## TypeScript 类型
[类型定义代码]
```

### 7.3 文档覆盖目标

| 阶段 | 覆盖组件数 | 覆盖率 | 新增文档 |
|------|-----------|--------|----------|
| 当前 | 6 个 | 18% | - |
| 阶段一 | 33 个 | 100% | 现有组件文档 |
| 阶段二 | 53 个 | 100% | P0 新组件文档 |
| 阶段三 | 75+ 个 | 100% | P1/P2 组件文档 |

### 7.4 辅助文档

- [ ] 快速开始指南（重写）
- [ ] 主题定制指南（新增）
- [ ] 暗色模式指南（新增）
- [ ] 国际化指南（新增）
- [ ] 无障碍指南（新增）
- [ ] 迁移指南（1.x→2.x→3.x）（更新）
- [ ] 贡献者指南（重写）
- [ ] API 索引（新增，所有组件 Props/Events 速查表）
- [ ] 最佳实践（新增）
- [ ] 常见问题 FAQ（新增）

---

## 八、测试覆盖率提升目标

### 8.1 测试目标

| 指标 | 当前状态 | 目标 | 达标标准 |
|------|----------|------|----------|
| 组件测试文件覆盖率 | 100% | 100% | 所有组件 |
| 行覆盖率（Statements） | 未配置 | > 85% | vitest --coverage |
| 分支覆盖率（Branches） | 未配置 | > 80% | vitest --coverage |
| 函数覆盖率（Functions） | 未配置 | > 85% | vitest --coverage |

### 8.2 测试用例标准

每个组件至少包含以下测试类别：

| 测试类别 | 用例数 | 说明 |
|----------|--------|------|
| 基础渲染 | 2-3 | 默认挂载、class 验证 |
| Props | 5-10 | 所有关键属性 |
| Events | 3-5 | 所有关键事件 |
| Slots | 2-4 | 默认插槽、具名插槽 |
| 状态 | 3-5 | disabled、loading、error |
| 无障碍 | 2-3 | ARIA、键盘操作 |
| 边界情况 | 2-3 | 空值、极端值 |
| **总计** | **19-33** | 每个组件 |

### 8.3 测试工具链升级

```typescript
// vite.config.ts
test: {
  globals: true,
  environment: 'happy-dom',
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html', 'lcov'],
    thresholds: {
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85,
    },
    include: ['src/**/*.vue', 'src/**/*.ts'],
    exclude: [
      'src/**/__tests__/**',
      'src/**/*.d.ts',
    ],
  },
},
```

### 8.4 新增测试类型

| 测试类型 | 说明 | 优先级 |
|----------|------|--------|
| 单元测试 | 组件逻辑测试（已有，需增强） | P0 |
| 快照测试 | UI 回归检测 | P1 |
| 无障碍测试 | axe-core 集成 | P1 |
| E2E 测试 | Playwright/Cypress | P2 |
| 性能测试 | 渲染时间、内存 | P2 |

---

## 九、代码质量治理

### 9.1 TypeScript 严格化

| 任务 | 说明 | 优先级 |
|------|------|--------|
| 消除所有 any | 替换为 unknown 或具体类型 | P0 |
| 启用 strictNullChecks | 确保已启用 | P0 |
| 组件泛型支持 | Select<T>、Table<T> 等 | P1 |
| 完整类型导出 | 所有组件导出 TS 类型 | P0 |

### 9.2 代码规范统一

```typescript
// 1. 统一组件模板结构
<script setup lang="ts">
defineOptions({ name: 'FComponent', inheritAttrs: false })

// Props 定义在前，Emits 在后
const props = withDefaults(defineProps<Props>(), { ... })
const emit = defineEmits<Emits>()

// 计算属性 → ref → 函数
</script>

// 2. 统一 class 命名前缀
.f-component { }           // 根元素
.f-component__element { }  // 子元素
.f-component--modifier { } // 修饰符
.is-state { }              // 状态

// 3. 统一样式导入
<style scoped lang="scss">
@use './style/index' as *;
</style>
```

### 9.3 FSelect 组件拆分

当前 FSelect 组件 970+ 行，拆分为：

```
FSelect/
├── composables/
│   ├── useSelect.ts           # 核心选择逻辑
│   ├── useDropdown.ts         # 下拉面板逻辑
│   ├── useKeyboardNavigation.ts # 键盘导航
│   └── useFilter.ts           # 过滤逻辑
├── components/
│   ├── SelectTrigger.vue      # 触发器
│   ├── SelectDropdown.vue     # 下拉面板
│   └── SelectTags.vue         # 多选标签
├── index.vue                  # 主组件（薄层）
└── index.ts
```

---

## 十、安全加固

### 10.1 XSS 防护

| 任务 | 方案 | 优先级 |
|------|------|--------|
| v-html 审查 | 所有 v-html 使用点标记并文档警告 | P0 |
| DOMPurify 集成 | dangerouslyUseHTMLString 默认使用 DOMPurify | P1 |
| 输入消毒 | 用户输入统一 sanitize | P1 |

### 10.2 依赖安全

```bash
# CI 集成依赖安全扫描
- pnpm audit --audit-level=high
- 移除 tj-jstools（不知名依赖）
- 定期更新依赖版本
```

---

## 十一、工程化与 CI/CD 升级

### 11.1 CI 工作流增强

```yaml
# .github/workflows/ci.yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test:run
      - run: pnpm build
      - uses: codecov/codecov-action@v4  # 覆盖率上报

  accessibility:
    steps:
      - run: pnpm test:axe  # 无障碍测试

  security:
    steps:
      - run: pnpm audit --audit-level=high  # 安全扫描
```

### 11.2 版本管理

| 版本 | 里程碑 | 预计时间 |
|------|--------|----------|
| v2.1.0 | 消除 any、修复 CHANGELOG、统一版本号 | 第 1-2 周 |
| v2.2.0 | P0 组件补全（DatePicker、Tree、Cascader 等） | 第 3-8 周 |
| v2.5.0 | 现有组件功能增强、样式系统重构 | 第 9-12 周 |
| v2.8.0 | 文档 100% 覆盖、测试覆盖率 >85% | 第 13-16 周 |
| v3.0.0 | 破坏性变更（API 统一、废弃旧 API） | 第 17-20 周 |

---

## 十二、版本迭代路线图

### 阶段一：基础治理（第 1-4 周）- v2.1.0

**目标**：解决评审报告中的 P0 问题

| 周 | 任务 | 产出 |
|----|------|------|
| W1 | 消除 any 类型、修复 CHANGELOG、统一版本号 | v2.1.0-alpha |
| W2 | FMessage/Notification 函数式 API、CI 启用 Lint | v2.1.0-beta |
| W3 | CSS 变量体系建立、暗色主题扩展 | v2.1.0-rc |
| W4 | 测试覆盖率配置、:focus-visible 样式 | **v2.1.0** |

### 阶段二：组件补全（第 5-10 周）- v2.2.0 ~ v2.4.0

**目标**：对标 Element Plus 基础组件覆盖

| 周 | 任务 | 产出 |
|----|------|------|
| W5-W6 | FDatePicker、FCascader、FTree | v2.2.0 |
| W7-W8 | FUpload、FColorPicker、FTransfer、FSlider | v2.3.0 |
| W9-W10 | FScrollbar、FSpace、FBacktop、FWatermark、FTimeline、FSteps、FDescriptions、FImage、FAffix | v2.4.0 |

### 阶段三：功能增强（第 11-14 周）- v2.5.0 ~ v2.7.0

**目标**：现有组件功能升级 + 性能优化

| 周 | 任务 | 产出 |
|----|------|------|
| W11-W12 | FTable 虚拟滚动、FSelect 虚拟列表 | v2.5.0 |
| W13 | FModal MessageBox、FDrawer resizable、FForm 增强 | v2.6.0 |
| W14 | 构建优化、CSS 分割、代码分割 | v2.7.0 |

### 阶段四：文档与质量（第 15-18 周）- v2.8.0 ~ v3.0.0

**目标**：文档 100% 覆盖、测试覆盖率达标

| 周 | 任务 | 产出 |
|----|------|------|
| W15-W16 | VitePress 文档全面完善 | v2.8.0 |
| W17 | 无障碍合规、E2E 测试、快照测试 | v2.9.0 |
| W18-W20 | API 统一、破坏性变更、迁移工具 | **v3.0.0** |

---

## 十三、关键里程碑

| 里程碑 | 时间节点 | 验收标准 |
|--------|----------|----------|
| M1: 基础治理完成 | 第 4 周 | any 类型 0 残留、CHANGELOG 修复、测试覆盖率 >70% |
| M2: 核心组件补全 | 第 10 周 | 组件数 ≥ 53、对标 Element Plus 65% |
| M3: 性能达标 | 第 14 周 | Tree Shaking 生效、FCP < 500ms、滚动 >55fps |
| M4: 文档完善 | 第 16 周 | 文档覆盖率 100%、API 完整 |
| M5: v3.0.0 发布 | 第 20 周 | 组件数 ≥ 75、测试覆盖率 >85%、WCAG 2.1 AA 合规 |

---

## 十四、风险控制

| 风险 | 概率 | 影响 | 应对措施 |
|------|------|------|----------|
| 组件开发延期 | 中 | 高 | 优先 P0 组件、分阶段交付 |
| 破坏性变更影响用户 | 高 | 高 | 提供 codemod 迁移工具、完善迁移文档 |
| 性能优化不达预期 | 低 | 中 | 引入 Profiling 工具、基准测试 |
| 无障碍合规复杂度高 | 中 | 中 | 引入 axe-core 自动化测试 |
| 人员不足 | 高 | 高 | 社区贡献激励、完善贡献指南 |

---

## 十五、成功指标（v3.0.0 发布时）

| 指标 | 目标值 |
|------|--------|
| 组件数量 | ≥ 75 个 |
| npm 月下载量 | ≥ 10,000 |
| GitHub Stars | ≥ 5,000 |
| 测试行覆盖率 | ≥ 85% |
| 文档覆盖率 | 100% |
| 无障碍合规 | WCAG 2.1 AA |
| 构建体积（ESM Tree Shaking 后 Button） | < 50KB |
| 首屏渲染时间（FCP） | < 500ms |
| any 类型残留 | 0 |
| CHANGELOG 完整度 | 完整、准确 |
| 主题支持 | 浅色 + 暗色 + 自定义 CSS 变量 |
| 国际化 | 中英文 |

---

*计划制定人：AI Agent | 制定日期：2026-04-26 | 基准版本：v2.0.1*
