---
alwaysApply: false
description: 最佳实践规范
---
# 最佳实践

> **适用场景**：性能优化、无障碍访问  
> **相关文件**：`02-code-style.md`（代码风格）、`05-error-handling.md`（错误处理）  
> **预计阅读时间**：8 分钟

---

## 一、性能优化

### 1.1 计算属性缓存

```typescript
// ✅ 正确：使用计算属性
const className = computed(() => {
  return `f-button--${props.type}`
})

const disabledClass = computed(() => {
  return props.disabled ? 'is-disabled' : ''
})

// ❌ 错误：在 template 中直接调用函数
// <div :class="getClassName()">  // 每次渲染都重新计算

// ❌ 错误：使用 ref 存储计算值
// const className = ref(`f-button--${props.type}`)  // 不会随 props 更新
```

**强制规则**：
- ✅ 使用计算属性处理依赖响应式数据的计算
- ✅ 避免在 template 中调用函数
- ✅ 计算属性应返回新值，不要修改外部状态

### 1.2 事件处理函数缓存

```typescript
// ✅ 正确：函数在 setup 中定义一次
const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}

// ✅ 正确：使用 useCallback（如有）
const handleClick = useCallback((event: MouseEvent) => {
  emit('click', event)
})

// ❌ 错误：在 template 中创建新函数
// <button @click="(e) => handleClick(e)">  // 每次渲染创建新函数
```

### 1.3 唯一 ID 生成

```typescript
// ✅ 正确：在 setup 外生成一次
let globalId = 0
const generateId = () => `f-${globalId++}`

// 在组件中使用
const instanceId = generateId()  // 每个实例唯一

// ❌ 错误：在 setup 内使用 ref 生成
const instanceId = ref(generateId())  // 每次渲染都重新生成

// ❌ 错误：在计算属性中生成
const instanceId = computed(() => generateId())  // 每次访问都生成新 ID
```

**强制规则**：
- ✅ 唯一 ID 应在 setup 外生成一次
- ✅ 使用普通变量，不要用 ref 在每次更新时重新生成
- ✅ ID 应包含组件前缀便于调试

### 1.4 虚拟列表（大数据）

```vue
<template>
  <!-- ✅ 正确：使用虚拟列表 -->
  <div class="virtual-list">
    <div
      v-for="item in visibleItems"
      :key="item.id"
      :style="{ top: item.top }"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
// 只渲染可见区域的项目
const visibleItems = computed(() => {
  return items.value.slice(startIndex.value, endIndex.value)
})
</script>
```

---

## 二、无障碍访问

### 2.1 键盘支持

```vue
<template>
  <button
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    role="button"
    tabindex="0"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean
  ariaLabel?: string
}>(), {
  disabled: false,
})

const handleClick = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled) return
  emit('click', event)
}
</script>
```

**强制规则**：
- ✅ 表单组件必须支持键盘操作（Enter、Space、Esc、方向键）
- ✅ 必须使用适当的 `role` 属性
- ✅ 必须提供 `aria-*` 属性
- ✅ 可聚焦组件必须设置 `tabindex`

### 2.2 ARIA 属性

```vue
<template>
  <!-- 按钮 -->
  <button
    :aria-pressed="isActive"
    :aria-expanded="isExpanded"
    :aria-controls="controlledId"
  >
    {{ label }}
  </button>
  
  <!-- 输入框 -->
  <input
    :aria-invalid="hasError"
    :aria-describedby="errorId"
    :aria-required="required"
  />
  
  <!-- 菜单 -->
  <div
    role="menu"
    :aria-label="menuLabel"
  >
    <div role="menuitem" v-for="item in items">
      {{ item.label }}
    </div>
  </div>
</template>
```

### 2.3 焦点管理

```typescript
// ✅ 正确：管理焦点
const focusFirst = () => {
  const firstItem = wrapper.value?.querySelector('[tabindex="0"]')
  firstItem?.focus()
}

const trapFocus = () => {
  // 将焦点限制在模态框内
  const focusableElements = wrapper.value?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements?.[0]
  const lastElement = focusableElements?.[focusableElements.length - 1]
  
  // 监听 Tab 键
  wrapper.value?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  })
}
```

---

## 三、组合式函数

### 3.1 基础示例

```typescript
// utils/tsHooks/useMessage.ts
import { ref } from 'vue'

export function useMessage() {
  const message = ref('')
  const visible = ref(false)
  
  const show = (msg: string) => {
    message.value = msg
    visible.value = true
  }
  
  const hide = () => {
    visible.value = false
  }
  
  return {
    message,
    visible,
    show,
    hide,
  }
}
```

**使用示例**：
```vue
<script setup lang="ts">
import { useMessage } from '@utils/tsHooks/useMessage'

const { message, visible, show, hide } = useMessage()
</script>
```

### 3.2 高级示例

```typescript
// utils/tsHooks/useLoading.ts
import { ref, shallowRef } from 'vue'

export function useLoading<T>(
  promiseFn: () => Promise<T>,
  options: {
    initialValue?: T
    errorMessage?: string
  } = {}
) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = shallowRef<T>(options.initialValue)
  
  const execute = async () => {
    loading.value = true
    error.value = null
    
    try {
      data.value = await promiseFn()
      return data.value
    } catch (e) {
      error.value = options.errorMessage || '操作失败'
      throw e
    } finally {
      loading.value = false
    }
  }
  
  return {
    loading,
    error,
    data,
    execute,
  }
}
```

**使用示例**：
```vue
<script setup lang="ts">
import { useLoading } from '@utils/tsHooks/useLoading'
import { api } from '@/api'

const { loading, error, data, execute } = useLoading(
  () => api.fetchData(),
  { errorMessage: '获取数据失败' }
)

// 自动执行
onMounted(() => {
  execute()
})
</script>

<template>
  <div v-if="loading">加载中...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>{{ data }}</div>
</template>
```

**强制规则**：
- ✅ 可复用逻辑应抽取为组合式函数
- ✅ 组合式函数应返回响应式数据和方法
- ✅ 避免在组合式函数中产生副作用

---

## 四、代码组织

### 4.1 组件大小

```typescript
// ✅ 正确：小组件（< 300 行）
// 单一职责，易于维护

// ⚠️ 注意：中等组件（300-500 行）
// 考虑拆分

// ❌ 错误：大组件（> 500 行）
// 必须拆分为多个子组件或组合式函数
```

### 4.2 子组件拆分

```vue
<!-- ✅ 正确：拆分为子组件 -->
<template>
  <div>
    <FButtonHeader :title="title" />
    <FButtonContent :items="items" />
    <FButtonFooter :actions="actions" />
  </div>
</template>

<!-- ❌ 错误：所有内容在一个组件 -->
<template>
  <div>
    <!-- 200 行 header 代码 -->
    <!-- 300 行 content 代码 -->
    <!-- 100 行 footer 代码 -->
  </div>
</template>
```

### 4.3 逻辑拆分

```typescript
// ✅ 正确：拆分为组合式函数
import { useButtonState } from './useButtonState'
import { useButtonStyle } from './useButtonStyle'
import { useButtonEvents } from './useButtonEvents'

const { state } = useButtonState(props)
const { className } = useButtonStyle(state)
const { handleClick } = useButtonEvents(emit, state)

// ❌ 错误：所有逻辑在一个组件
const state = ref({})
const className = computed(() => {})
const handleClick = () => {}
```

---

## 五、安全性

### 5.1 XSS 防护

```vue
<template>
  <!-- ✅ 正确：使用文本插值 -->
  <div>{{ userInput }}</div>
  
  <!-- ⚠️ 注意：必须使用 v-html 时 -->
  <div v-html="sanitize(userInput)"></div>
  
  <!-- ❌ 错误：直接使用 v-html -->
  <div v-html="userInput"></div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

const sanitize = (html: string) => {
  return DOMPurify.sanitize(html)
}
</script>
```

### 5.2 事件验证

```typescript
// ✅ 正确：验证事件来源
const handleClick = (event: MouseEvent) => {
  if (!event.currentTarget) return
  if (props.disabled || props.loading) return
  emit('click', event)
}

// ✅ 正确：限制 emit 参数
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: string): void
}>()

// ❌ 错误：emit 任意数据
// emit('custom', { any: 'data' })
```

---

## 六、测试最佳实践

### 6.1 测试覆盖率

```bash
# 运行覆盖率
pnpm test -- --coverage

# 目标覆盖率
# 语句覆盖率：> 80%
# 分支覆盖率：> 70%
# 函数覆盖率：> 80%
# 行覆盖率：> 80%
```

### 6.2 测试优先级

```typescript
// 1. 优先测试核心功能
test('core functionality', () => {
  // 测试组件主要功能
})

// 2. 测试边界情况
test('edge cases', () => {
  // 测试 null、undefined、空字符串等
})

// 3. 测试错误处理
test('error handling', () => {
  // 测试异常情况
})

// 4. 测试性能（如需要）
test('performance', () => {
  // 测试渲染时间、内存使用等
})
```

---

## 七、持续改进

### 7.1 代码审查

- ✅ 检查代码风格
- ✅ 检查性能问题
- ✅ 检查安全性
- ✅ 检查测试覆盖
- ✅ 检查文档完整性

### 7.2 技术债务

```typescript
// TODO: 优化性能，使用缓存
// FIXME: 处理边界情况
// HACK: 临时解决方案，待重构
// XXX: 需要关注的问题
```

**强制规则**：
- ✅ 定期清理 TODO 注释
- ✅ FIXME 必须优先处理
- ✅ HACK 必须有明确的移除计划

---

**下一步**：检查清单请阅读 `12-checklists.md`
