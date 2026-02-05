---
name: verify-component-ui
description: 使用浏览器验证 Vue3 组件的视觉效果、样式渲染、交互反馈、响应式布局和用户体验。当需要测试组件 UI、检查样式、验证交互效果或用户提到"视觉验证"、"UI 测试"、"样式检查"、"交互测试"时使用。
---

# 组件视觉验证

使用浏览器自动化工具验证 Vue3 组件的视觉呈现和交互体验，确保组件的设计和实现符合预期。

## 快速开始

视觉验证的标准流程：

```
1. 启动开发服务器
2. 在浏览器中打开组件示例页面
3. 验证视觉效果（样式、布局、颜色）
4. 验证交互行为（hover、click、focus）
5. 验证响应式表现
6. 生成验证报告
```

## 验证工具

使用 Cursor 内置的浏览器工具：

- `browser_navigate`：导航到页面
- `browser_snapshot`：获取页面快照
- `browser_click`：点击元素
- `browser_hover`：悬停元素
- `browser_fill`：填写表单
- `browser_take_screenshot`：截图

## 验证清单

### 1. 基础渲染验证

检查组件是否正确渲染：

```markdown
- [ ] 组件在页面中可见
- [ ] 组件结构完整
- [ ] 必需的 DOM 元素存在
- [ ] 文本内容正确显示
```

**验证方法：**
1. 使用 `browser_snapshot` 获取页面结构
2. 检查组件的根元素是否存在
3. 验证关键子元素是否渲染

### 2. 样式验证

检查组件样式是否正确应用：

```markdown
- [ ] 基础样式正确（字体、颜色、间距）
- [ ] 布局正确（宽度、高度、对齐）
- [ ] class 名称正确应用
- [ ] CSS 变量生效
- [ ] 无样式冲突或覆盖问题
```

**验证方法：**
1. 使用 `browser_take_screenshot` 截图
2. 使用 `browser_snapshot` 检查元素的 class
3. 检查计算后的样式（如需要可用 `browser_evaluate_script`）

### 3. 不同状态验证

测试组件在不同 props 下的表现：

```markdown
- [ ] 不同类型（type: primary/success/warning/danger）
- [ ] 不同尺寸（size: small/medium/large）
- [ ] 不同状态（disabled/loading/active）
- [ ] 不同主题（light/dark）
```

**验证方法：**
示例页面应展示所有状态，逐一检查每个状态的视觉效果。

### 4. 交互验证

测试用户交互的视觉反馈：

```markdown
- [ ] Hover 效果（背景色、边框、光标）
- [ ] Click 效果（按下状态、涟漪效果）
- [ ] Focus 效果（轮廓线、高亮）
- [ ] Active 效果（选中状态）
- [ ] Disabled 状态无交互反馈
```

**验证方法：**

```typescript
// Hover 验证
1. 使用 browser_hover 悬停元素
2. 截图或检查样式变化
3. 验证 cursor 类型是否改变

// Click 验证
1. 使用 browser_click 点击元素
2. 检查视觉反馈（如 ripple 效果）
3. 验证状态变化

// Focus 验证
1. 使用 browser_click 或 Tab 键聚焦
2. 检查焦点样式（outline、ring）
```

### 5. 响应式验证

测试组件在不同屏幕尺寸的表现：

```markdown
- [ ] 桌面端（≥1024px）
- [ ] 平板端（768px - 1023px）
- [ ] 移动端（<768px）
- [ ] 文字自适应
- [ ] 图标尺寸适配
```

**验证方法：**

```typescript
// 使用 browser_resize_page 或 browser_emulate
1. 设置不同的视口尺寸
2. 截图对比
3. 检查布局是否破损
```

### 6. 动画验证

检查过渡和动画效果：

```markdown
- [ ] 过渡效果流畅（fade/slide/scale）
- [ ] 动画时长合适（不过快或过慢）
- [ ] 无抖动或闪烁
- [ ] 动画完成后状态正确
```

**验证方法：**
1. 触发包含动画的交互（如打开下拉菜单）
2. 使用 `browser_wait_for` 等待动画完成
3. 检查最终状态

### 7. 无障碍性验证

检查可访问性特性：

```markdown
- [ ] 键盘导航可用（Tab、Enter、Space、Esc）
- [ ] Focus 顺序合理
- [ ] 焦点可见（focus-visible）
- [ ] ARIA 属性正确
- [ ] 颜色对比度符合 WCAG 标准
```

**验证方法：**

```typescript
// 键盘导航
1. 使用 browser_press_key 模拟键盘操作
2. 检查焦点移动和交互结果

// Focus 可见性
1. Tab 聚焦到元素
2. 检查是否有清晰的焦点指示器
```

## 验证流程

### Step 1: 启动开发服务器

```bash
# 检查服务器是否已运行
browser_tabs list

# 如果未运行，启动服务
pnpm dev
```

等待服务器就绪（通常在 http://localhost:5173 或类似端口）。

### Step 2: 导航到组件示例页面

```typescript
// 打开组件示例页
browser_navigate {
  url: "http://localhost:5173/examples/FButton",
  type: "url"
}

// 获取页面快照
browser_snapshot
```

组件示例页面位置：
- `packages/fit-test/src/examples/FComponentName/index.vue`
- URL 路径通常为：`/examples/FComponentName`

### Step 3: 执行视觉验证

按照验证清单逐项检查：

#### 3.1 基础渲染

```typescript
// 获取页面快照
const snapshot = browser_snapshot

// 检查组件元素存在
// 查找组件的根元素（根据 snapshot 中的 uid）
```

#### 3.2 样式和状态

```typescript
// 截取组件当前状态
browser_take_screenshot {
  filePath: "screenshots/button-default.png"
}

// 如果示例页面展示了多种状态，逐一截图
```

#### 3.3 交互测试

```typescript
// Hover 测试
browser_hover { uid: "button-element-uid" }
browser_take_screenshot {
  filePath: "screenshots/button-hover.png"
}

// Click 测试
browser_click { uid: "button-element-uid" }
// 检查点击后的效果

// Focus 测试
browser_press_key { key: "Tab" }
// 验证焦点样式
```

#### 3.4 响应式测试

```typescript
// 调整视口尺寸
browser_resize_page { width: 375, height: 667 }  // 移动端
browser_take_screenshot {
  filePath: "screenshots/button-mobile.png"
}

browser_resize_page { width: 768, height: 1024 }  // 平板
browser_take_screenshot {
  filePath: "screenshots/button-tablet.png"
}

browser_resize_page { width: 1920, height: 1080 }  // 桌面端
```

### Step 4: 生成验证报告

汇总所有检查结果，生成报告。

## 验证报告格式

```markdown
# FComponentName 视觉验证报告

## 验证时间
2024-XX-XX HH:mm:ss

## 验证环境
- 浏览器：Chrome/Firefox/Safari
- 视口尺寸：1920x1080
- 测试页面：http://localhost:5173/examples/FComponentName

---

## 验证结果：✅ 通过 / ❌ 未通过

---

## 详细检查

### ✅ 基础渲染（5/5）
- [x] 组件正确渲染
- [x] 结构完整
- [x] 文本显示正确
- [x] class 名称正确
- [x] 无控制台错误

### ✅ 样式验证（4/4）
- [x] 基础样式正确
- [x] 布局无问题
- [x] 颜色和字体符合设计
- [x] 间距和尺寸准确

### ⚠️ 交互验证（3/4）
- [x] Hover 效果正常
- [x] Click 效果正常
- [x] Focus 效果正常
- [ ] **问题：Disabled 状态仍可点击**

### ✅ 响应式验证（3/3）
- [x] 桌面端正常
- [x] 平板端正常
- [x] 移动端正常

### ✅ 无障碍性（4/4）
- [x] 键盘导航可用
- [x] 焦点可见
- [x] Tab 顺序正确
- [x] 颜色对比度达标

---

## 发现的问题

### 1. ❌ Disabled 状态可点击
- **严重程度**：高
- **描述**：按钮设置 disabled 后，仍可通过点击触发事件
- **截图**：screenshots/button-disabled-issue.png
- **修复建议**：在事件处理中添加 disabled 检查

### 2. ⚠️ Hover 过渡略快
- **严重程度**：低
- **描述**：Hover 过渡时间为 0.1s，建议调整为 0.2s
- **修复建议**：修改 CSS transition 时长

---

## 截图

### 默认状态
![默认状态](screenshots/button-default.png)

### Hover 状态
![Hover 状态](screenshots/button-hover.png)

### Disabled 状态
![Disabled 状态](screenshots/button-disabled.png)

---

## 总结

- 总计检查项：21 项
- 通过：19 项
- 问题：2 项（1 高优先级，1 低优先级）

**综合评价：良好，需修复高优先级问题**

---

## 建议

1. 修复 disabled 状态的点击问题
2. 优化 hover 过渡动画时长
3. 补充暗色主题的视觉验证
```

## 常见验证场景

### 按钮组件

```markdown
验证项：
- [ ] 不同 type 颜色正确
- [ ] 不同 size 尺寸正确
- [ ] Hover 有背景色变化
- [ ] Click 有按下效果
- [ ] Disabled 灰色且无交互
- [ ] Loading 状态显示加载图标
- [ ] 图标按钮对齐正确
```

### 输入框组件

```markdown
验证项：
- [ ] 边框样式正确
- [ ] Focus 有明显的聚焦效果
- [ ] Placeholder 颜色合适
- [ ] 错误状态显示红色边框和提示
- [ ] Clear 按钮显示和隐藏正确
- [ ] 禁用状态背景色变灰
```

### 下拉菜单组件

```markdown
验证项：
- [ ] 点击触发器打开菜单
- [ ] 菜单位置正确（不超出视口）
- [ ] 菜单项 Hover 有高亮
- [ ] 选中项有视觉标记
- [ ] 动画流畅（fade + slide）
- [ ] 点击外部关闭菜单
```

### 模态框组件

```markdown
验证项：
- [ ] 遮罩层半透明
- [ ] 模态框居中显示
- [ ] 打开/关闭动画流畅
- [ ] ESC 键关闭模态框
- [ ] 滚动内容时有滚动条
- [ ] 关闭按钮位置正确
```

## 批量验证

如需验证多个组件：

```typescript
// 1. 获取所有组件示例页面
const components = ['FButton', 'FInput', 'FSelect', ...]

// 2. 逐个导航并验证
for (const comp of components) {
  browser_navigate({ 
    url: `http://localhost:5173/examples/${comp}` 
  })
  
  // 执行验证...
  
  browser_take_screenshot({
    filePath: `screenshots/${comp}-overview.png`
  })
}

// 3. 生成汇总报告
```

## 提示与技巧

### 1. 等待渲染完成

```typescript
// 导航后等待内容加载
browser_navigate({ url: "..." })
browser_wait_for({ text: "组件标题", timeout: 5000 })
```

### 2. 处理动画

```typescript
// 触发动画
browser_click({ uid: "trigger-element" })

// 短暂等待观察动画
// 使用增量等待策略
await sleep(0.5s)
browser_snapshot  // 检查是否完成

// 如未完成，继续等待
await sleep(0.5s)
browser_snapshot
```

### 3. 检查控制台错误

```typescript
// 获取控制台消息
browser_list_console_messages { types: ["error", "warn"] }

// 验证无错误
// 应确保组件渲染时无控制台错误
```

### 4. 比对设计稿

如果有设计稿：
1. 截取组件各状态的截图
2. 与设计稿进行对比
3. 检查颜色、尺寸、间距等细节

## 自动化验证脚本

对于频繁验证的场景，可以创建自动化脚本：

```typescript
// verify-ui.ts
async function verifyComponent(name: string) {
  // 1. 导航
  await browser_navigate(`http://localhost:5173/examples/${name}`)
  
  // 2. 基础检查
  const snapshot = await browser_snapshot()
  
  // 3. 截图
  await browser_take_screenshot(`screenshots/${name}.png`)
  
  // 4. 交互测试
  // ...
  
  return report
}
```

## 参考资源

- 组件示例目录：`packages/fit-test/src/examples/`
- Cursor 浏览器工具文档：参考 MCP 指令
- 无障碍性标准：WCAG 2.1
