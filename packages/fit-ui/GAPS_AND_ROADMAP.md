# FitUI 组件库：缺口与路线图

基于当前代码与 README 的盘点，列出**还缺少什么**及可选的补齐顺序。

---

## 一、组件覆盖（按场景）

### 已有
- **基础**：FButton、FIcon、FTag
- **反馈**：FMessage、FToolTip
- **展示**：FCodeBlock
- **Hooks**：useMessage

### 建议补齐（常见 UI 库标配）

| 优先级 | 类别     | 组件           | 说明 |
|--------|----------|----------------|------|
| 高     | 表单     | **Input**      | 输入框（文本/密码/数字），与 Button 搭配做表单 |
| 高     | 表单     | **Checkbox / Radio / Switch** | 选择类控件 |
| 高     | 反馈     | **Modal/Dialog** | 弹窗确认、表单弹窗 |
| 中     | 反馈     | **Loading**    | 全屏/局部加载态 |
| 中     | 反馈     | **Alert**      | 页面内提示块（与 Message 区分：常驻 vs 轻提示） |
| 中     | 导航     | **Tabs**       | 标签页 |
| 中     | 导航     | **Dropdown**   | 下拉菜单（可复用 ToolTip 定位思路） |
| 中     | 数据展示 | **Table**      | 表格（排序、分页可后续迭代） |
| 低     | 布局     | **Layout**     | 栅格/布局 |
| 低     | 展示     | **Card / Empty / Badge** | 卡片、空状态、角标 |
| 低     | 其他     | **Divider / Avatar / Progress** | 分割线、头像、进度条 |

优先做 **Input + Modal + 一个选择类（如 Switch）**，就能覆盖大部分业务里的「表单 + 确认」场景。

---

## 二、设计与主题

### 现状
- 有 CSS 变量（代码块、Tooltip、暗色 `data-theme`）
- 按钮/标签用 UnoCSS 原子类（如 `blue-500`），未统一走设计 token

### 建议补齐
- **设计 token 体系**：在主题里统一定义 `--f-primary`、`--f-success`、`--f-font-sans` 等，组件尽量用变量而非写死 class，方便换肤和品牌定制。
- **字体**：在 `global/theme` 里定义 `--f-font-sans` 等，README 或设计文档中说明默认字体策略。
- **动效**：为 Button / Tag 的 hover、focus、active 增加 `transition`（颜色/阴影），并考虑 `prefers-reduced-motion` 降级。
- **设计原则文档**：在官网或 docs 里写清「设计原则 + 使用场景」，便于别人判断是否选用 FitUI。

---

## 三、无障碍（a11y）

### 现状
- 未看到 `aria-*`、`role`、键盘导航、焦点管理的系统使用

### 建议补齐
- **焦点**：可点击组件（Button、Tag 关闭、ToolTip trigger）支持键盘聚焦与 Enter/Space 触发。
- **语义与 ARIA**：  
  - Message/Modal：`role="alert"` / `role="dialog"`、`aria-labelledby` / `aria-describedby`。  
  - ToolTip：`aria-describedby` 关联提示内容。  
  - 表单组件：`aria-invalid`、`aria-required`、与 label 的关联。
- **焦点陷阱**：Modal 打开时焦点进入弹窗、Tab 限制在内部、关闭时焦点回退。
- 可选：在文档中写「无障碍使用说明」，并跑一次 axe 或类似工具做基线。

---

## 四、文档与 DX

### 现状
- README 完整，有安装、按需引入、Resolver、示例
- 有在线文档与 GitHub Pages

### 建议补齐
- **组件 API 文档**：每个组件在文档站有 **Props / Events / Slots** 表格，并与 `defineProps`/`defineEmits` 类型一致（可从 JSDoc 或 build 出的类型生成）。
- **TypeScript**：在 README 或「快速开始」里说明：从 `@geniusmanyxh/fit-ui` 导入即可获得类型，无需额外 `@types`。
- **设计 token 文档**：列出 CSS 变量及推荐覆盖方式（含暗色）。
- **贡献指南**：在 CONTRIBUTING 或 docs 中写「新增组件模板」（目录结构、必须的 index/type/style、单测要求）。

---

## 五、质量与工程

### 现状
- FButton、FIcon、FMessage、FTag、FToolTip 有单测；FCodeBlock 无单测
- 有 lint、format、prepublishOnly 跑 test+lint+build

### 建议补齐
- **FCodeBlock 单测**：至少覆盖「能渲染、语言/主题切换不报错」。
- **测试策略**：在 README 或 CONTRIBUTING 中写清「新组件需要单测」。
- 可选：为 1～2 个核心组件（如 FButton、FMessage）加简单 E2E（Playwright/Cypress），防止关键交互回退。
- 可选：发布前用 **bundlesize** 或类似工具监控包体积，避免全量/按需体积暴涨。

---

## 六、全局配置与扩展

### 现状
- 无全局「组件默认配置」

### 建议补齐
- **ConfigProvider（可选）**：提供 `size`（默认 medium）、`theme`（light/dark）等，子组件通过 inject 读取，减少重复传 prop。
- **国际化（i18n）**：若后续做 DatePicker、Pagination 等，可预留 locale 或文案注入（如「确定」「取消」「暂无数据」）。

---

## 七、建议实施顺序（路线图）

| 阶段   | 内容 |
|--------|------|
| **短期** | 1）补 FCodeBlock 单测<br>2）做 **Input** 组件<br>3）主题里增加 **设计 token**（--f-primary 等）并在 1～2 个组件上试点 |
| **中期** | 4）**Modal/Dialog**<br>5）**Checkbox / Switch** 至少一个<br>6）文档站补齐 **Props/Events/Slots**<br>7）核心组件 **a11y**（焦点 + ARIA） |
| **长期** | 8）Tabs、Dropdown、Table 等<br>9）ConfigProvider<br>10）动效与设计原则文档 |

---

## 八、总结一句

- **最缺**：**表单类组件（Input + 选择类）+ Modal**，以及**设计 token 与无障碍**的体系化。
- **已有**：Vue3 + TS + 按需/全量 + 文档 + 单测基础都不错，重构后代码也更符合 Vue 最佳实践，适合在此基础上按上面顺序逐步补齐。
