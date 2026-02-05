---
name: test-component-logic
description: 为 Vue3 组件编写和执行单元测试，验证 props、事件、插槽、响应式逻辑等功能。当需要测试组件、编写测试用例、验证组件逻辑或用户提到"单元测试"、"测试组件"、"验证功能"时使用。
---

# Vue3 组件功能测试

为 FitUI 组件库的 Vue3 组件编写和执行全面的单元测试，验证组件的功能和逻辑正确性。

## 快速开始

测试组件的标准流程：

```
1. 分析组件 API（props、events、slots）
2. 设计测试用例
3. 编写测试代码
4. 执行测试
5. 修复问题
```

## 测试框架

FitUI 使用以下测试工具：

- **Vitest**：测试运行器
- **@vue/test-utils**：Vue 组件测试工具
- **happy-dom** 或 **jsdom**：DOM 环境

## 测试文件位置

```
packages/fit-ui/src/FComponentName/
└── __tests__/
    └── componentname.test.ts
```

## 基础测试模板

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import FComponentName from '../index.vue'
// 或使用 import FComponentName from '../index' 测试 withInstall 包装

describe('FComponentName', () => {
  // 1. 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(FComponentName)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('expected-class-name')
  })

  // 2. Props 测试
  it('should accept size prop', () => {
    const wrapper = mount(FComponentName, {
      props: { size: 'large' }
    })
    expect(wrapper.find('.component').classes()).toContain('component--large')
  })

  // 3. 事件测试
  it('should emit click event', async () => {
    const wrapper = mount(FComponentName)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([expect.any(Object)])
  })

  // 4. 插槽测试
  it('should render slot content', () => {
    const wrapper = mount(FComponentName, {
      slots: { default: 'Test Content' }
    })
    expect(wrapper.text()).toContain('Test Content')
  })
})
```

## 必测项目清单

### 1. 基础渲染

```typescript
describe('基础渲染', () => {
  it('组件能正常挂载', () => {
    const wrapper = mount(FComponent)
    expect(wrapper.exists()).toBe(true)
  })

  it('根元素包含正确的 class', () => {
    const wrapper = mount(FComponent)
    expect(wrapper.classes()).toContain('f-component')
  })

  it('使用正确的组件名', () => {
    expect(FComponent.name).toBe('FComponentName')
  })
})
```

### 2. Props 验证

对每个 prop 编写测试：

```typescript
describe('Props', () => {
  // 类型 prop
  it('type prop - 应用正确的类型 class', () => {
    const types = ['primary', 'success', 'warning', 'danger']
    types.forEach(type => {
      const wrapper = mount(FButton, { props: { type } })
      expect(wrapper.classes()).toContain(`f-button--${type}`)
    })
  })

  // 尺寸 prop
  it('size prop - 应用正确的尺寸 class', () => {
    const wrapper = mount(FButton, { props: { size: 'large' } })
    expect(wrapper.classes()).toContain('f-button--large')
  })

  // 布尔 prop
  it('disabled prop - 禁用状态', () => {
    const wrapper = mount(FButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 默认值测试
  it('props 应有正确的默认值', () => {
    const wrapper = mount(FButton)
    expect(wrapper.props('type')).toBe('default')
    expect(wrapper.props('size')).toBe('medium')
  })
})
```

### 3. 事件测试

```typescript
describe('Events', () => {
  // 点击事件
  it('应触发 click 事件', async () => {
    const wrapper = mount(FButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  // 自定义事件
  it('应触发 change 事件并传递正确的值', async () => {
    const wrapper = mount(FSwitch, {
      props: { modelValue: false }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  // 禁用状态不触发事件
  it('disabled 状态不应触发事件', async () => {
    const wrapper = mount(FButton, {
      props: { disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 使用 spy 测试回调
  it('应调用 onClick 回调', async () => {
    const onClick = vi.fn()
    const wrapper = mount(FButton, {
      props: { onClick }
    })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

### 4. v-model 测试

```typescript
describe('v-model', () => {
  it('应支持 v-model', async () => {
    const wrapper = mount(FInput, {
      props: {
        modelValue: 'initial',
        'onUpdate:modelValue': (value: string) => 
          wrapper.setProps({ modelValue: value })
      }
    })

    const input = wrapper.find('input')
    await input.setValue('new value')
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })
})
```

### 5. 插槽测试

```typescript
describe('Slots', () => {
  // 默认插槽
  it('应渲染默认插槽内容', () => {
    const wrapper = mount(FButton, {
      slots: { default: 'Click Me' }
    })
    expect(wrapper.text()).toBe('Click Me')
  })

  // 具名插槽
  it('应渲染具名插槽', () => {
    const wrapper = mount(FCard, {
      slots: {
        header: '<div class="custom-header">Header</div>',
        default: 'Content',
        footer: 'Footer'
      }
    })
    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.text()).toContain('Header')
    expect(wrapper.text()).toContain('Footer')
  })

  // 作用域插槽
  it('应正确传递作用域插槽数据', () => {
    const wrapper = mount(FTable, {
      props: {
        data: [{ name: 'John', age: 30 }]
      },
      slots: {
        default: ({ row }: { row: any }) => `Name: ${row.name}`
      }
    })
    expect(wrapper.text()).toContain('Name: John')
  })
})
```

### 6. 响应式数据测试

```typescript
describe('响应式更新', () => {
  it('prop 变化应更新视图', async () => {
    const wrapper = mount(FButton, {
      props: { type: 'primary' }
    })
    expect(wrapper.classes()).toContain('f-button--primary')

    await wrapper.setProps({ type: 'danger' })
    expect(wrapper.classes()).toContain('f-button--danger')
    expect(wrapper.classes()).not.toContain('f-button--primary')
  })

  it('内部状态变化应更新视图', async () => {
    const wrapper = mount(FDropdown)
    expect(wrapper.find('.dropdown-menu').isVisible()).toBe(false)

    await wrapper.find('.dropdown-trigger').trigger('click')
    expect(wrapper.find('.dropdown-menu').isVisible()).toBe(true)
  })
})
```

### 7. 边界情况测试

```typescript
describe('边界情况', () => {
  it('空值 props 应有正确的回退', () => {
    const wrapper = mount(FComponent, {
      props: { value: undefined }
    })
    expect(wrapper.text()).not.toContain('undefined')
  })

  it('异常输入应被处理', () => {
    const wrapper = mount(FInputNumber, {
      props: { modelValue: NaN }
    })
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('长文本应被正确处理', () => {
    const longText = 'a'.repeat(1000)
    const wrapper = mount(FInput, {
      props: { modelValue: longText }
    })
    expect(wrapper.find('input').element.value).toBe(longText)
  })
})
```

### 8. 无障碍性测试

```typescript
describe('无障碍性', () => {
  it('应有正确的 ARIA 属性', () => {
    const wrapper = mount(FButton, {
      props: { disabled: true }
    })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('应支持键盘导航', async () => {
    const wrapper = mount(FDropdown)
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('应有正确的 role 属性', () => {
    const wrapper = mount(FModal)
    expect(wrapper.attributes('role')).toBe('dialog')
  })
})
```

## 执行测试

### 运行单个组件测试

```bash
# 运行特定组件的测试
pnpm test FButton

# 或使用文件路径
pnpm test packages/fit-ui/src/FButton/__tests__/button.test.ts
```

### 运行所有测试

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage
```

### 调试测试

```typescript
// 在测试中使用
it.only('仅运行此测试', () => {
  // ...
})

// 跳过测试
it.skip('跳过此测试', () => {
  // ...
})

// 查看 DOM 结构
console.log(wrapper.html())
```

## 测试流程

### Step 1: 分析组件 API

读取组件文件，识别：
- Props 及其类型、默认值
- Emits 事件
- Slots 插槽
- 暴露的方法（defineExpose）

### Step 2: 设计测试用例

根据组件功能设计测试用例，覆盖：
- 正常使用场景
- 边界情况
- 错误处理
- 交互流程

### Step 3: 编写测试代码

使用上述模板和模式编写测试：
- 使用描述性的测试名称
- 一个测试只验证一个功能点
- 使用 AAA 模式（Arrange、Act、Assert）

### Step 4: 执行测试

```bash
pnpm test <component-name>
```

### Step 5: 分析结果

- ✅ 全部通过：组件功能正常
- ❌ 有失败：修复组件或测试代码
- ⚠️ 覆盖率不足：补充测试用例

## 测试覆盖率目标

- **行覆盖率**：≥ 80%
- **分支覆盖率**：≥ 75%
- **函数覆盖率**：≥ 80%

## 常见测试场景

### 表单组件

```typescript
describe('FInput', () => {
  it('输入验证', async () => {
    const wrapper = mount(FInput, {
      props: { type: 'number', min: 0, max: 100 }
    })
    const input = wrapper.find('input')
    
    await input.setValue('50')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['50'])
    
    await input.setValue('150')
    expect(wrapper.find('.error-message').exists()).toBe(true)
  })
})
```

### 弹窗组件

```typescript
describe('FModal', () => {
  it('打开关闭流程', async () => {
    const wrapper = mount(FModal, {
      props: { modelValue: false }
    })
    
    expect(wrapper.isVisible()).toBe(false)
    
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.isVisible()).toBe(true)
    
    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })
})
```

### 列表组件

```typescript
describe('FTable', () => {
  it('渲染数据行', () => {
    const data = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
    const wrapper = mount(FTable, {
      props: { data }
    })
    
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    expect(wrapper.text()).toContain('John')
    expect(wrapper.text()).toContain('Jane')
  })
})
```

## 测试报告格式

测试完成后，输出结果报告：

```markdown
# FComponentName 测试报告

## 测试结果：✅ 通过 / ❌ 失败

---

## 测试统计

- 总测试数：X
- 通过：Y
- 失败：Z
- 跳过：W
- 执行时间：XXms

## 覆盖率

- 行覆盖率：XX%
- 分支覆盖率：XX%
- 函数覆盖率：XX%

## 失败的测试

1. **测试名称**
   - 错误信息：...
   - 期望值：...
   - 实际值：...

## 建议

- [ ] 补充 XX 场景的测试
- [ ] 提高边界情况覆盖率
- [ ] 添加性能测试
```

## 参考资源

- Vitest 文档：https://vitest.dev/
- Vue Test Utils：https://test-utils.vuejs.org/
- 项目测试示例：FButton、FInput、FSwitch
