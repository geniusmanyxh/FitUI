# FitUI 组件开发规范

本文档为 FitUI 组件库的**强制开发规范**，适用于人工与 AI 协作开发。新增或修改组件时必须严格遵循，避免出现「未用 withInstall、未写 defineOptions、样式用 @import 或内联、未在 entry/full 注册」等问题。

---

## 一、目录与文件结构

每个组件必须使用统一结构，不得省略或改名：

```
packages/fit-ui/src/
└── FComponentName/           # 组件名：大驼峰，F 前缀
    ├── __tests__/
    │   └── componentname.test.ts   # 单元测试，小写短横线
    ├── style/
    │   ├── _componentname.scss     # 组件样式（SCSS 部分文件，下划线前缀）
    │   ├── index.scss              # 样式入口，仅负责 @use 引入
    │   ├── index.ts                # 供 entry/full 引入样式用
    │   └── css.ts                  # 若有 CSS 变量等可放此处
    ├── index.ts                    # 组件导出入口
    └── index.vue                   # 组件主文件
```

- 组件目录名：**F + 大驼峰**（如 FButton、FSelect）。
- 样式部分文件：**_组件名.scss**（如 _button.scss、_select.scss），**禁止**在 style 内使用 `@import`，必须使用 `@use`。
- 若有类型/常量可单独 **ComponentName.ts**（如 FButton 的 Button.ts），与 index.vue 同目录。

---

## 二、index.ts 规范（组件导出）

**必须**使用 `withInstall` 包装，**仅** `export default`，不得再写 `export { FComponentName }`。

```typescript
// 正确
import comp from './index.vue'
import { withInstall } from '@utils/install'

const FComponentName = withInstall(comp)

export default FComponentName
```

```typescript
// 错误：未使用 withInstall，app.use() 无法正确注册
import FComponentName from './index.vue'
export default FComponentName
```

```typescript
// 错误：不要多写命名导出，components.ts 已通过 default as 导出
export default FComponentName
export { FComponentName }
```

命名导出由 **components.ts** 统一完成：`export { default as FComponentName } from './FComponentName'`。

---

## 三、index.vue 规范

### 3.1 defineOptions（必写）

在 `<script setup>` 中**必须**在 JSDoc 之后、首行 import/defineProps 之前写：

```typescript
defineOptions({ name: 'FComponentName', inheritAttrs: false })
```

- **name**：与组件名一致，用于 `withInstall` 注册和 DevTools。
- **inheritAttrs: false**：避免根节点自动继承未在 props 中声明的属性，由组件自行用 `v-bind="$attrs"` 控制。

### 3.2 JSDoc 与 API 注释

组件顶部需有 JSDoc，并推荐为 props/emits 写注释：

```vue
<script lang="ts" setup>
/**
 * FComponentName 组件简述
 *
 * @description 详细说明与使用场景
 * @example
 * ```vue
 * <FComponentName prop="value">内容</FComponentName>
 * ```
 */
defineOptions({ name: 'FComponentName', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** 说明，@default 默认值 */
    modelValue?: boolean
  }>(),
  { modelValue: false }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()
</script>
```

### 3.3 Props 与默认值

- 可选 props 需有合理**默认值**，避免 template 中出现 `undefined` 导致 class/样式异常（如 `loading_spinner_undefined`）。
- 使用 **withDefaults(defineProps<...>(), { ... })** 或 **computed** 提供默认值。

### 3.4 样式引用（禁止内联组件样式）

**禁止**在 index.vue 中写大段组件样式；**必须**通过 `@use` 引用 style 目录：

```vue
<style scoped lang="scss">
@use './style/index' as *;
</style>
```

如需与 FButton 一致地引用单文件（如 `_button.scss`），可使用：

```vue
<style scoped lang="scss">
@use './style/button' as *;
</style>
```

两种方式二选一，与现有同目录组件保持一致即可。**禁止**在 Vue 中写与 style 目录重复的长段 SCSS。

---

## 四、style 目录规范

### 4.1 使用 @use，禁止 @import

在 **style/index.scss** 中**只允许**使用 `@use` 引入部分文件：

```scss
@use './_componentname' as *;
```

**禁止**使用已废弃的 `@import`：

```scss
@import './_componentname.scss';  /* 禁止 */
```

### 4.2 样式内容位置

- 组件样式写在 **_componentname.scss** 中（class 命名建议 BEM 或 `componentname_block`、`componentname_block_element`）。
- **index.scss** 仅做入口，不写具体样式；若需全局/主题，可在此处增加 `@use`（参考 FButton 的 global、mixin）。

### 4.3 style/index.ts

保持与现有组件一致，用于 entry.ts / full.ts 引入样式：

```typescript
import './index.scss'
```

---

## 五、全局注册与导出

新增组件后**必须**同步修改以下三处：

1. **components.ts**  
   增加一行：  
   `export { default as FComponentName } from './FComponentName'`

2. **entry.ts**  
   - 在首行 import 中增加 `FComponentName`
   - 在「引入所有组件样式」中增加：`import './FComponentName/style'`
   - 在 export 与 `components` 数组中增加 `FComponentName`

3. **full.ts**  
   与 entry.ts 相同：import、样式 import、export、components 数组。

顺序建议与 components.ts 中顺序一致，便于维护。

---

## 六、单元测试

- 每个组件在 **__tests__/componentname.test.ts** 中至少包含：
  - 默认渲染（mount、存在性、根 class）
  - 关键 props 生效（如 disabled、size、type）
  - 关键事件触发（如 click、update:modelValue）
- 测试中引用组件时使用 **index.vue** 或 **index.ts**（与现有 FSwitch 等一致），避免只测未包装的 SFC。

---

## 七、其他约定

### 7.1 无障碍与键盘

- 表单类、可聚焦组件需支持键盘（如 Enter、Space、Esc、方向键）。
- 合理设置 **role**、**aria-***、**tabindex**。

### 7.2 稳定性

- 组件内部需要唯一 id 时（如 FDropdown 的 dropdown-menu-id），应在 setup 中**只生成一次**（如普通变量 `const id = ...`），避免用 `ref(...)` 在每次更新时重新生成。

### 7.3 定位与布局

- 使用 **position: absolute** 的子元素，其定位父级**必须**有 **position: relative**（或其它定位上下文），避免相对错误祖先定位。

---

## 八、新增组件检查清单（提交前自检）

- [ ] 目录与文件结构符合第一节，且含 `__tests__`、`style`、`index.ts`、`index.vue`
- [ ] **index.ts** 使用 `withInstall(comp)`，仅 `export default`，无多余命名导出
- [ ] **index.vue** 已写 `defineOptions({ name: 'Fxxx', inheritAttrs: false })`
- [ ] **index.vue** 中无大段内联样式，样式通过 `@use './style/index' as *'`（或 `./style/xxx`）引用
- [ ] **style/index.scss** 使用 `@use './_xxx' as *'`，未使用 `@import`
- [ ] **components.ts**、**entry.ts**、**full.ts** 已添加该组件的导出与样式引入
- [ ] 可选 props 有默认值，template 中不会出现 `undefined` class
- [ ] 已补充或更新 **__tests__** 中至少一项基础测试
- [ ] 需要唯一 id 的组件，id 在实例内只生成一次
- [ ] 含绝对定位子元素时，父级已设 `position: relative`

---

## 九、参考组件

- **index.ts + defineOptions + 样式引用**：FButton、FInput、FSwitch  
- **style 使用 @use**：FInput/style/index.scss、FSwitch/style/index.scss  
- **entry/full 注册方式**：entry.ts、full.ts 中任一组件的三处修改

遵循本规范可保证新组件与现有 15 个组件在注册、样式、测试上行为一致，便于维护与 AI 协作。
