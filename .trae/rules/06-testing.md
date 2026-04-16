---
alwaysApply: false
description: 测试标准
---
# 测试标准

> **适用场景**：编写测试、验证功能  
> **相关文件**：`03-file-structure.md`（文件结构）、`12-checklists.md`（检查清单）  
> **预计阅读时间**：8 分钟

---

## 一、测试文件结构

### 1.1 目录位置

```
packages/fit-ui/src/FComponentName/__tests__/
└── componentname.test.ts
```

**强制规则**：
- ✅ 每个组件必须有独立的测试文件
- ✅ 测试文件命名：`组件名小写.test.ts`
- ✅ 测试文件位于 `__tests__/` 目录下

### 1.2 基本结构

```typescript
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FComponentName from '..'

describe('FComponentName', () => {
  test('mount with default props', () => {
    // 测试内容
  })
  
  test('renders props correctly', () => {
    // 测试内容
  })
})
```

---

## 二、测试用例要求

### 2.1 必测项目

每个组件**必须**包含以下测试：

1. **默认渲染测试** - 组件可以正常挂载
2. **Props 测试** - 关键属性生效
3. **事件测试** - 关键事件触发
4. **状态测试** - disabled/loading 等状态
5. **插槽测试** - 默认插槽和具名插槽

### 2.2 测试示例

```typescript
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FButton from '..'

describe('FButton', () => {
  // 1. 默认渲染测试
  test('mount with default props', () => {
    const wrapper = mount(FButton)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-button')
  })

  // 2. Props 测试（关键属性）
  test('renders props correctly', () => {
    const wrapper = mount(FButton, {
      props: {
        type: 'primary',
        size: 'large',
      },
    })
    expect(wrapper.classes()).toContain('f-button--primary')
    expect(wrapper.classes()).toContain('f-button__large')
  })

  // 3. 事件测试
  test('emits events correctly', async () => {
    const wrapper = mount(FButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  // 4. 状态测试（disabled/loading 等）
  test('disabled state', async () => {
    const wrapper = mount(FButton, {
      props: { disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 5. 插槽测试（如有）
  test('renders default slot content', () => {
    const wrapper = mount(FButton, {
      slots: {
        default: '按钮文本',
      },
    })
    expect(wrapper.text()).toContain('按钮文本')
  })
})
```

**强制规则**：
- ✅ 必须测试默认渲染
- ✅ 必须测试关键 Props
- ✅ 必须测试关键事件
- ✅ 必须测试禁用/加载等状态
- ✅ 测试文件命名：`组件名小写.test.ts`

---

## 三、测试最佳实践

### 3.1 测试导入

```typescript
// ✅ 正确：从 '..' 导入（使用 index.ts）
import FButton from '..'

// ✅ 正确：明确导入
import FButton from '../index'

// ❌ 错误：直接导入未包装的 SFC
import FButton from '../index.vue'  // 可能绕过 withInstall
```

### 3.2 Props 测试

```typescript
// ✅ 正确：测试多个 props 组合
test('renders multiple props', () => {
  const wrapper = mount(FButton, {
    props: {
      type: 'success',
      size: 'small',
      disabled: true,
      round: true,
    },
  })
  
  expect(wrapper.classes()).toContain('f-button--success')
  expect(wrapper.classes()).toContain('f-button__small')
  expect(wrapper.classes()).toContain('is-disabled')
  expect(wrapper.classes()).toContain('button_round')
})

// ❌ 错误：只测试一个 prop
test('renders type prop', () => {
  const wrapper = mount(FButton, {
    props: { type: 'primary' },
  })
  expect(wrapper.classes()).toContain('f-button--primary')
})
```

### 3.3 事件测试

```typescript
// ✅ 正确：测试事件参数
test('emits click with event', async () => {
  const wrapper = mount(FButton)
  await wrapper.trigger('click')
  
  const emitted = wrapper.emitted('click')
  expect(emitted).toBeTruthy()
  expect(emitted?.[0]).toHaveLength(1)  // 有一个参数
})

// ✅ 正确：测试 disabled 时不触发事件
test('does not emit when disabled', async () => {
  const wrapper = mount(FButton, {
    props: { disabled: true },
  })
  await wrapper.trigger('click')
  
  expect(wrapper.emitted('click')).toBeFalsy()
})
```

### 3.4 插槽测试

```typescript
// ✅ 正确：测试默认插槽
test('renders default slot', () => {
  const wrapper = mount(FButton, {
    slots: {
      default: '插槽内容',
    },
  })
  expect(wrapper.text()).toContain('插槽内容')
})

// ✅ 正确：测试具名插槽
test('renders named slots', () => {
  const wrapper = mount(FButton, {
    slots: {
      icon: '<span class="custom-icon">图标</span>',
      loading: '<span class="custom-loading">加载中</span>',
    },
  })
  expect(wrapper.find('.custom-icon').exists()).toBe(true)
  expect(wrapper.find('.custom-loading').exists()).toBe(true)
})

// ✅ 正确：测试插槽不存在的情况
test('renders without slots', () => {
  const wrapper = mount(FButton)
  expect(wrapper.text()).toBe('')  // 没有插槽内容
})
```

---

## 四、测试覆盖场景

### 4.1 完整测试示例

```typescript
import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FButton from '..'

describe('FButton', () => {
  // 1. 基础测试
  describe('Basic', () => {
    test('mounts correctly', () => {
      const wrapper = mount(FButton)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    test('has default classes', () => {
      const wrapper = mount(FButton)
      expect(wrapper.classes()).toContain('f-button')
      expect(wrapper.classes()).toContain('f-button--default')
      expect(wrapper.classes()).toContain('f-button__medium')
    })
  })

  // 2. Props 测试
  describe('Props', () => {
    test('type prop', () => {
      const types = ['primary', 'success', 'warning', 'danger', 'info']
      types.forEach(type => {
        const wrapper = mount(FButton, { props: { type } })
        expect(wrapper.classes()).toContain(`f-button--${type}`)
      })
    })

    test('size prop', () => {
      const sizes = ['small', 'medium', 'large']
      sizes.forEach(size => {
        const wrapper = mount(FButton, { props: { size } })
        expect(wrapper.classes()).toContain(`f-button__${size}`)
      })
    })

    test('plain prop', () => {
      const wrapper = mount(FButton, { props: { plain: true, type: 'primary' } })
      expect(wrapper.classes()).toContain('f-button--primary_plain')
    })

    test('round prop', () => {
      const wrapper = mount(FButton, { props: { round: true } })
      expect(wrapper.classes()).toContain('button_round')
    })

    test('circle prop', () => {
      const wrapper = mount(FButton, { props: { circle: true } })
      expect(wrapper.classes()).toContain('f-button--circle')
    })

    test('disabled prop', () => {
      const wrapper = mount(FButton, { props: { disabled: true } })
      expect(wrapper.classes()).toContain('is-disabled')
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    test('loading prop', () => {
      const wrapper = mount(FButton, { props: { loading: true } })
      expect(wrapper.classes()).toContain('is-loading')
      expect(wrapper.find('.f-button__loading').exists()).toBe(true)
    })
  })

  // 3. 事件测试
  describe('Events', () => {
    test('emits click event', async () => {
      const wrapper = mount(FButton)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    test('does not emit when disabled', async () => {
      const wrapper = mount(FButton, { props: { disabled: true } })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    test('does not emit when loading', async () => {
      const wrapper = mount(FButton, { props: { loading: true } })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  // 4. 插槽测试
  describe('Slots', () => {
    test('renders default slot', () => {
      const wrapper = mount(FButton, {
        slots: { default: '按钮文本' },
      })
      expect(wrapper.text()).toContain('按钮文本')
    })

    test('renders icon slot', () => {
      const wrapper = mount(FButton, {
        slots: { icon: '<span class="test-icon">图标</span>' },
      })
      expect(wrapper.find('.test-icon').exists()).toBe(true)
    })

    test('renders loading slot', () => {
      const wrapper = mount(FButton, {
        props: { loading: true },
        slots: { loading: '<span class="test-loading">加载中</span>' },
      })
      expect(wrapper.find('.test-loading').exists()).toBe(true)
    })
  })

  // 5. 其他测试
  describe('Other', () => {
    test('native type prop', () => {
      const wrapper = mount(FButton, { props: { nativeType: 'submit' } })
      expect(wrapper.attributes('type')).toBe('submit')
    })

    test('autofocus prop', () => {
      const wrapper = mount(FButton, { props: { autofocus: true } })
      expect(wrapper.attributes('autofocus')).toBeDefined()
    })

    test('inherits attributes', () => {
      const wrapper = mount(FButton, {
        attrs: {
          'data-test': 'test-value',
          'aria-label': '测试按钮',
        },
      })
      expect(wrapper.attributes('data-test')).toBe('test-value')
      expect(wrapper.attributes('aria-label')).toBe('测试按钮')
    })
  })
})
```

---

## 五、测试运行

### 5.1 命令

```bash
# 监听模式
pnpm test

# 单次运行
pnpm test:run

# 运行特定测试
pnpm test button

# 覆盖率
pnpm test -- --coverage

# 更新快照
pnpm test -- -u
```

### 5.2 配置

```typescript
// vite.config.ts
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      threshold: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
```

**强制规则**：
- ✅ 提交前必须运行 `pnpm test:run`
- ✅ 发布前必须所有测试通过
- ✅ 核心组件测试覆盖率应 > 80%

---

## 六、测试工具

### 6.1 常用工具

```typescript
import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'

// mount - 完整渲染
const wrapper = mount(Component)

// shallowMount - 浅渲染（不渲染子组件）
const wrapper = shallowMount(Component)

// vi.fn() - Mock 函数
const mockFn = vi.fn()

// vi.spyOn() - Spy 方法
const spy = vi.spyOn(console, 'log')
```

### 6.2 异步测试

```typescript
// ✅ 正确：等待异步操作
test('async test', async () => {
  const wrapper = mount(Component)
  await wrapper.trigger('click')
  await wrapper.vm.$nextTick()
  
  expect(wrapper.emitted('update')).toBeTruthy()
})

// ✅ 正确：等待定时器
test('timer test', async () => {
  vi.useFakeTimers()
  
  const wrapper = mount(Component)
  vi.advanceTimersByTime(1000)
  
  expect(wrapper.vm.isExpired).toBe(true)
  
  vi.useRealTimers()
})
```

---

**下一步**：
- 提交规范请阅读 `07-commit-guidelines.md`
- 检查清单请阅读 `12-checklists.md`
