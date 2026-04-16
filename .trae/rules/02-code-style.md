---
alwaysApply: false
description: 代码风格规范
---
# 代码风格规范

> **适用场景**：编写代码、Code Review  
> **相关文件**：`01-techstack.md`（技术栈）、`03-file-structure.md`（文件结构）  
> **预计阅读时间**：10 分钟

---

## 一、TypeScript 规范

### 1.1 类型定义

```typescript
// ✅ 正确：显式类型定义
interface ButtonProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

// ✅ 正确：使用枚举
enum ButtonType {
  Default = 'default',
  Primary = 'primary',
  Success = 'success'
}

// ❌ 错误：使用 any
const props: any = {}

// ❌ 错误：未处理的 undefined
const className = props.type // 可能为 undefined
```

**强制规则**：
- ✅ 禁止使用 `any` 类型
- ✅ Props 必须有明确的类型定义
- ✅ 可选属性必须有默认值或空值处理
- ✅ 使用 TypeScript 严格模式

### 1.2 接口命名

```typescript
// ✅ 正确
interface ButtonProps { }
interface ButtonEmits { }
type ButtonType = 'default' | 'primary'

// ❌ 错误
interface buttonProps { }  // 接口名应使用 PascalCase
```

---

## 二、Vue 组件规范

### 2.1 Script Setup 语法

```vue
<script lang="ts" setup>
/**
 * 组件 JSDoc 说明
 * @description 组件功能描述
 * @example 使用示例
 */

// defineOptions 必须写在首行（import/defineProps 之后）
defineOptions({ 
  name: 'FComponentName', 
  inheritAttrs: false 
})

// Props 定义
interface Props {
  /** 属性说明，@default 默认值 */
  type?: 'primary' | 'default'
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
})

// Emits 定义
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: boolean): void
}>()

// 计算属性
const className = computed(() => {
  return `f-component-${props.type}`
})

// 响应式数据
const isActive = ref(false)

// 事件处理
const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}
</script>
```

**强制规则**：
- ✅ 必须使用 `<script lang="ts" setup>` 语法
- ✅ 必须写 `defineOptions({ name: 'FComponentName', inheritAttrs: false })`
- ✅ Props 必须有 JSDoc 注释和默认值
- ✅ Emits 必须使用泛型语法定义类型
- ✅ 禁止在 template 中出现未处理的 `undefined`

### 2.2 组件示例

```vue
<template>
  <button
    :class="btnClassArr"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="f-button__loading">
      <slot name="loading">
        <span class="f-button__loading-icon"></span>
      </slot>
    </span>
    <span v-if="$slots.default" class="f-button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
/**
 * FButton 按钮组件
 *
 * @description 支持多种类型、尺寸和状态的按钮组件
 * @example
 * ```vue
 * <FButton type="primary" size="large">主要按钮</FButton>
 * ```
 */

defineOptions({ name: 'FButton', inheritAttrs: false })

interface ButtonProps {
  /** 
   * 按钮类型 
   * @default 'default'
   */
  type?: ButtonType
  
  /** 是否禁用 */
  disabled?: boolean
  
  /** 是否加载中 */
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

const btnClassArr = computed(() => {
  const type = props.type ?? 'default'
  return [`f-button`, `f-button--${type}`]
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
```

---

## 三、样式规范

### 3.1 Vue 组件样式

```vue
<style scoped lang="scss">
@use './style/index' as *;
// 或
@use './style/component' as *;
</style>
```

**强制规则**：
- ✅ 必须使用 `@use`，禁止使用 `@import`
- ✅ 必须添加 `scoped` 属性
- ✅ 必须使用 `lang="scss"`
- ✅ 组件样式必须写在 `style/_component.scss` 中
- ✅ `style/index.scss` 仅作为入口，使用 `@use './_component' as *'`
- ✅ 禁止在 Vue 组件中写大段内联样式

### 3.2 SCSS 文件组织

```
style/
├── _component.scss      # 组件具体样式
├── index.scss           # 样式入口（仅 @use）
├── index.ts             # TS 引入样式
└── css.ts               # CSS 变量等
```

### 3.3 SCSS 命名规范

```scss
// BEM 命名或组件前缀命名
.f-button {
  // 基础样式
  
  &__icon {
    // 子元素
  }
  
  &--primary {
    // 修饰符
  }
  
  &.is-disabled {
    // 状态
  }
}
```

**强制规则**：
- ✅ 组件 class 使用 `f-组件名` 前缀
- ✅ 子元素使用 `__` 分隔
- ✅ 修饰符使用 `--` 分隔
- ✅ 状态类使用 `is-状态名` 或 `has-状态名`
- ✅ 禁止使用 `!important`（除非绝对必要）
- ✅ 禁止使用 `@import`，统一使用 `@use`

---

## 四、命名规范

### 4.1 文件与目录

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件目录 | 大驼峰 + F 前缀 | `FButton`, `FInput` |
| 组件文件 | `index.vue`, `index.ts` | - |
| 样式部分文件 | `_组件名.scss`（小写） | `_button.scss`, `_input.scss` |
| 测试文件 | `组件名小写.test.ts` | `button.test.ts`, `input.test.ts` |
| 工具函数 | 小写 + 下划线或驼峰 | `fsize.ts`, `install.ts` |
| 类型定义 | 大驼峰 | `ButtonProps`, `ButtonType` |

### 4.2 代码命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件名 | PascalCase | `FButton`, `FInput` |
| Props/Variables | camelCase | `buttonType`, `isActive` |
| Classes/Constants | PascalCase 或 UPPER_CASE | `ButtonType`, `MAX_SIZE` |
| Functions | camelCase | `handleClick`, `getValue` |
| CSS Classes | kebab-case | `f-button`, `is-disabled` |
| 文件路径别名 | 小写 | `@utils`, `@enums`, `@ftypes` |

---

## 五、代码组织

### 5.1 Script 内顺序

```typescript
// 1. JSDoc
/**
 * 组件说明
 */

// 2. defineOptions
defineOptions({ name: 'FComponentName', inheritAttrs: false })

// 3. Imports
import { computed } from 'vue'
import { type SizeType } from '@utils/fsize'

// 4. Interface/Type
interface Props { }

// 5. Props
const props = withDefaults(defineProps<Props>(), { })

// 6. Emits
const emit = defineEmits<{ }>()

// 7. Computed
const className = computed(() => {})

// 8. Ref
const isActive = ref(false)

// 9. Functions
const handleClick = () => {}
```

### 5.2 Template 内顺序

```vue
<template>
  <!-- 1. 根元素 -->
  <div :class="rootClass" v-bind="$attrs">
    <!-- 2. 插槽内容 -->
    <slot v-if="$slots.default">
      <slot name="fallback">默认内容</slot>
    </slot>
    
    <!-- 3. 条件内容 -->
    <span v-if="loading" class="loading">
      <slot name="loading">加载中</slot>
    </span>
  </div>
</template>
```

---

## 六、最佳实践

### 6.1 计算属性缓存

```typescript
// ✅ 正确：使用计算属性
const className = computed(() => {
  return `f-button--${props.type}`
})

// ❌ 错误：在 template 中直接调用函数
// <div :class="getClassName()">  // 每次渲染都重新计算
```

### 6.2 事件处理

```typescript
// ✅ 正确：检查状态
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

// ❌ 错误：未检查状态
const handleClick = (event: MouseEvent) => {
  emit('click', event)  // disabled 时也会触发
}
```

### 6.3 默认值处理

```typescript
// ✅ 正确：withDefaults 提供默认值
const props = withDefaults(defineProps<{
  type?: 'primary' | 'default'
  size?: 'small' | 'medium' | 'large'
}>(), {
  type: 'default',
  size: 'medium',
})

// ✅ 正确：计算属性中使用 ?? 提供默认值
const className = computed(() => {
  const type = props.type ?? 'default'
  return `f-button--${type}`
})

// ❌ 错误：未处理 undefined
const className = `f-button--${props.type}`  // type 可能为 undefined
```

---

**下一步**：
- 组件结构请阅读 `03-file-structure.md`
- 测试编写请阅读 `06-testing.md`
- 检查清单请阅读 `12-checklists.md`
