# FitUI 组件库重构计划

基于 **vue-best-practices** 与先前评估结论制定的详细重构计划。

---

## 一、FButton 重构

### 现状问题
- 使用 `reactive` + 多个 `ref` + `watch` 维护 `btnClassArr`、`btnIconClassArr`，逻辑分散且易与响应式最佳实践冲突。
- `handleEvent` + `document.addEventListener('click')` 仅做 `contains` 判断且未改变任何状态，属于无效/死代码。

### 重构方案
| 步骤 | 内容 |
|------|------|
| 1 | 使用 **computed** `btnClassArr`：根据 `props.type`、`props.plain`、`props.round`、`props.size` 推导出按钮根元素 class 数组（含 `btnClass[type]` 或 `btnClass[type]_plain`、`btnSizeClass[size]`、`button_round`）。 |
| 2 | 使用 **computed** `btnIconClassArr`：根据 `props.size`、`props.plain`、`props.type` 推导图标 class 数组（`btn_icon` + 尺寸 + plain 时的颜色类）。 |
| 3 | 使用 **computed** `curBtnIcon`：直接返回 `props.icon ?? 'github'`（或当前默认占位图标）。 |
| 4 | 删除所有 `handleBtn*` 函数、对应 `watch`、以及 `handleEvent` / `onMounted` / `onUnmounted` 中的 document 点击监听。 |
| 5 | 模板中 `:class="btnClassArr"`、`:class="btnIconClassArr"`、`:icon="curBtnIcon"` 保持不变（改为使用上述 computed）。 |

### 验收
- 按钮类型、尺寸、plain、round、icon 变化时，样式与重构前一致。
- 无 `watch`、无 document 级事件监听。

---

## 二、FMessage 重构

### 现状问题
- `defineEmits(['close', 'show'])` 无类型，不符合 TypeScript 与 vue-best-practices 中的 emit 类型声明建议。

### 重构方案
| 步骤 | 内容 |
|------|------|
| 1 | 定义 `MessageEmits` 接口：`(e: 'close'): void` 与 `(e: 'show'): void`。 |
| 2 | 将 `defineEmits(['close', 'show'])` 改为 `defineEmits<MessageEmits>()`。 |

### 验收
- 调用方对 `emit('close')` / `emit('show')` 有类型检查与提示。

---

## 三、FToolTip 重构

### 现状问题
- `handleMouseEnter` / `handleClick` 中存在 `console.log(111)`、`console.log(222)` 调试代码。
- `updateTooltipPosition` 使用 `document.querySelector('.f-tooltip-wrapper')` 与 `.f-tooltip-content`，页面上存在多个 ToolTip 时会选错节点。
- `watch(() => props, ...)` 监听整个 props 对象，依赖不清晰。

### 重构方案
| 步骤 | 内容 |
|------|------|
| 1 | **移除调试代码**：删除 `handleMouseEnter`、`handleClick` 中的 `console.log(111)`、`console.log(222)`。 |
| 2 | **使用 template ref**：在模板根元素上增加 `ref="wrapperRef"`，在 tooltip 内容容器上增加 `ref="contentRef"`；在 script 中定义 `wrapperRef`、`contentRef`，类型为 `Ref<HTMLElement | null>`。 |
| 3 | **updateTooltipPosition 使用 ref**：在 `updateTooltipPosition` 内使用 `wrapperRef.value`、`contentRef.value` 替代 `document.querySelector`，并做 null 判断。 |
| 4 | **精确 watch**：将 `watch(() => props, ...)` 改为对影响位置与样式的 props 做精确监听，例如：`watch([() => props.position, () => props.mode, () => props.offset, () => props.zIndex, () => props.modeBgColor, () => props.modeTextColor], updateTooltipPosition, { immediate: true })`。 |

### 验收
- 无 console 输出。
- 多实例场景下每个 ToolTip 只更新自身位置。
- 仅相关 props 变化时触发 `updateTooltipPosition`。

---

## 四、FIcon 重构

### 现状问题
- 使用 `watch` 同步 `props.icon` / `props.size` 到 `iocnName`、`iconSizeStyle`、`isSize`，逻辑可用 computed 更简洁表达。

### 重构方案
| 步骤 | 内容 |
|------|------|
| 1 | **computed `iocnName`**：`computed(() => props.icon ? allIconObj[props.icon] : '')`（若 allIconObj 无 key 时的行为与现有一致则保持，否则加兜底）。 |
| 2 | **computed `iconSizeStyle`**：`computed(() => ({ fontSize: computeIconSize(props.size) }))`。 |
| 3 | **computed `isSize`**：`computed(() => !!props.size)`。 |
| 4 | 删除 `updateIcon`、`watch` 以及 `reactive` 的 `iconSizeStyle`。 |

### 验收
- 图标与尺寸随 props 变化正确更新，表现与重构前一致。
- 无 watch、无 reactive。

---

## 五、执行顺序与风险

- **顺序**：FMessage（改动最小）→ FIcon → FToolTip → FButton（改动最大）。
- **风险**：FButton 的 class 与图标逻辑较复杂，需对照现有 `btnSizeClass`、`btnClass` 及 plain 时的 Tailwind 颜色类，保证 computed 与原有 handle* 行为一致。
- **测试**：每完成一个组件，在 demo/App 中人工验证对应用法；若有单测则跑一遍。

---

## 六、不纳入本次重构的范围

- FMessage 的 transition CSS（fade-message）补全、按钮/标签的动效增强：归入「前端设计」优化，单独排期。
- 主题变量（字体、语义色）扩展：同上。
