---
alwaysApply: false
description: 错误处理规范
---
# 错误处理规范

> **适用场景**：处理异常、提升健壮性  
> **相关文件**：`02-code-style.md`（代码风格）、`11-best-practices.md`（最佳实践）  
> **预计阅读时间**：6 分钟

---

## 一、TypeScript 类型安全

### 1.1 显式类型定义

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

### 1.2 类型守卫

```typescript
// ✅ 正确：使用类型守卫
function isButtonType(type: unknown): type is ButtonType {
  return ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(type as string)
}

// ✅ 正确：在运行时验证
const type = props.type ?? 'default'
if (!isButtonType(type)) {
  console.warn('Invalid button type:', type)
  return 'default'
}
```

---

## 二、运行时错误处理

### 2.1 事件处理

```typescript
// ✅ 正确：事件处理中的错误预防
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

// ✅ 正确：带错误处理的事件
const handleClick = (event: MouseEvent) => {
  try {
    if (props.disabled || props.loading) return
    emit('click', event)
  } catch (error) {
    console.error('Button click error:', error)
  }
}

// ❌ 错误：未检查状态
const handleClick = (event: MouseEvent) => {
  emit('click', event)  // disabled 时也会触发
}
```

**强制规则**：
- ✅ 事件处理必须检查 `disabled` 和 `loading` 状态
- ✅ 异步操作必须有错误处理
- ✅ 禁止静默失败，必须记录错误日志

### 2.2 计算属性中的默认值

```typescript
// ✅ 正确：计算属性中的默认值
const className = computed(() => {
  const type = props.type ?? 'default'
  return `f-button--${type}`
})

// ✅ 正确：使用可选链
const iconClass = computed(() => {
  return props.icon ? `f-icon--${props.icon}` : ''
})

// ❌ 错误：未处理 undefined
const className = `f-button--${props.type}`  // type 可能为 undefined
```

### 2.3 异步错误处理

```typescript
// ✅ 正确：异步错误处理（如 useMessage）
const showMessage = async () => {
  try {
    await message.value
  } catch (error) {
    console.error('Message error:', error)
    // 可以显示用户友好的错误提示
  }
}

// ✅ 正确：带重试的异步操作
const fetchData = async () => {
  let retries = 3
  while (retries > 0) {
    try {
      return await api.getData()
    } catch (error) {
      retries--
      if (retries === 0) {
        console.error('Fetch failed:', error)
        throw error
      }
    }
  }
}
```

---

## 三、组件健壮性

### 3.1 Props 默认值

```vue
<template>
  <div :class="rootClass" v-bind="$attrs">
    <!-- 插槽内容必须检查是否存在 -->
    <slot v-if="$slots.default">
      <slot name="fallback">默认内容</slot>
    </slot>
    
    <!-- 条件渲染 -->
    <span v-if="loading" class="loading">
      <slot name="loading">
        <span class="loading-icon"></span>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

// Props 必须有默认值
const props = withDefaults(defineProps<{
  loading?: boolean
  disabled?: boolean
  type?: 'primary' | 'default'
}>(), {
  loading: false,
  disabled: false,
  type: 'default',
})
</script>
```

**强制规则**：
- ✅ 必须设置 `inheritAttrs: false` 并手动控制 `$attrs`
- ✅ 插槽使用前必须检查 `$slots.xxx`
- ✅ 必须提供合理的默认插槽内容
- ✅ Props 必须有默认值避免运行时错误

### 3.2 条件渲染保护

```vue
<template>
  <div :class="containerClass">
    <!-- ✅ 正确：检查插槽是否存在 -->
    <slot v-if="$slots.default" />
    
    <!-- ✅ 正确：提供默认内容 -->
    <slot name="icon">
      <f-icon :icon="defaultIcon" />
    </slot>
    
    <!-- ✅ 正确：条件渲染带保护 -->
    <span v-if="showLabel && label" class="label">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  showLabel?: boolean
}>(), {
  label: '',
  showLabel: true,
})
</script>
```

---

## 四、唯一 ID 生成

### 4.1 正确的 ID 生成

```typescript
// ✅ 正确：在 setup 外生成一次
let globalId = 0
const generateId = () => `f-${globalId++}`

// 在组件中使用
const instanceId = generateId()  // 每个实例唯一

// ❌ 错误：在 setup 内使用 ref 生成
const instanceId = ref(generateId())  // 每次渲染都重新生成
```

### 4.2 使用场景

```typescript
// FDropdown 示例
let globalId = 0
const generateId = () => `f-dropdown-${globalId++}`

const instanceId = generateId()  // 只生成一次

// 用于 aria 属性
<menu :id="instanceId" :aria-labelledby="instanceId">
```

**强制规则**：
- ✅ 组件内唯一 id 应在 setup 外生成一次
- ✅ 使用普通变量，不要用 ref 在每次更新时重新生成
- ✅ ID 应包含组件前缀便于调试

---

## 五、定位和布局错误预防

### 5.1 绝对定位

```vue
<template>
  <!-- ✅ 正确：父级有 position: relative -->
  <div class="dropdown-container" style="position: relative;">
    <button>点击</button>
    <div class="dropdown-menu" style="position: absolute;">
      <!-- 菜单内容 -->
    </div>
  </div>
  
  <!-- ❌ 错误：父级无定位上下文 -->
  <div class="container">
    <button>点击</button>
    <div class="dropdown-menu" style="position: absolute;">
      <!-- 可能相对错误的祖先定位 -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-container {
  position: relative;  // 为子元素提供定位上下文
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
```

**强制规则**：
- ✅ 使用 `position: absolute` 的子元素，其定位父级必须有 `position: relative`（或其它定位上下文）
- ✅ 避免相对错误祖先定位

---

## 六、错误日志

### 6.1 日志级别

```typescript
// 错误日志
console.error('关键错误:', error)

// 警告日志
console.warn('警告信息:', warning)

// 调试日志
console.log('调试信息:', data)
```

### 6.2 错误上报

```typescript
// ✅ 正确：捕获并记录错误
try {
  await api.saveData(data)
} catch (error) {
  console.error('Save failed:', error)
  // 可以添加错误上报
  // errorTracker.report(error)
  throw error  // 重新抛出让上层处理
}
```

**强制规则**：
- ✅ 禁止静默失败
- ✅ 必须记录错误日志
- ✅ 关键错误应上报

---

## 七、边界情况处理

### 7.1 空值处理

```typescript
// ✅ 正确：空值处理
const displayValue = computed(() => {
  return props.value ?? '默认值'
})

// ✅ 正确：可选链
const userName = user?.profile?.name ?? '匿名用户'

// ❌ 错误：可能抛出错误
const userName = user.profile.name  // user 或 profile 可能为 null
```

### 7.2 数组操作

```typescript
// ✅ 正确：数组保护
const firstItem = items?.[0] ?? null
const length = items?.length ?? 0

// ✅ 正确：数组方法链式调用
const filtered = items
  ?.filter(item => item.active)
  ?.map(item => item.name) ?? []

// ❌ 错误：未检查数组
const firstItem = items[0]  // items 可能为 null
```

---

**下一步**：
- 测试编写请阅读 `06-testing.md`
- 最佳实践请阅读 `11-best-practices.md`
