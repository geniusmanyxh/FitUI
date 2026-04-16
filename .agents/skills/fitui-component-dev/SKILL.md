---
name: fitui-component-dev
description: FitUI 组件开发专用技能，提供组件创建、重构、测试编写的标准化指导
license: MIT
---

# FitUI 组件开发技能

> **适用场景**：创建新组件、重构现有组件、编写组件测试  
> **预计阅读时间**：5 分钟

---

## 触发条件

当用户提出以下需求时，自动激活此技能：

- **创建新组件**："创建 FButton 组件"、"为 FitUI 添加一个新组件"
- **重构组件**："将 FModal 重构为 Composition API"、"优化组件代码"
- **编写测试**："为 FButton 编写测试"、"补充测试用例"
- **组件开发问题**："FitUI 组件如何组织目录"、"组件样式怎么写"

---

## 工作流程

### 1. 需求分析

首先确认用户需求类型：
- **新建组件** → 进入「组件创建流程」
- **重构组件** → 进入「组件重构流程」
- **编写测试** → 进入「测试编写流程」
- **咨询问题** → 进入「开发指导流程」

### 2. 组件创建流程

#### 步骤 1：确认组件信息

询问或确认以下信息：
- 组件名称（如 FButton）
- 组件功能描述
- 是否需要子组件（如 FButtonGroup）

#### 步骤 2：创建标准目录结构

```bash
packages/fit-ui/src/FComponentName/
├── __tests__/
│   └── componentname.test.ts
├── style/
│   ├── _componentname.scss
│   ├── index.scss
│   └── index.ts
├── index.ts
└── index.vue
```

#### 步骤 3：生成组件代码

**index.vue 模板**：

```vue
<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script lang="ts" setup>
/**
 * 组件名称 组件描述
 *
 * @description 组件功能详细描述
 * @example
 * ```vue
 * <FComponentName prop1="value" @event="handler" />
 * ```
 */
import { computed } from 'vue'

defineOptions({ 
  name: 'FComponentName', 
  inheritAttrs: false 
})

/**
 * 组件属性接口
 */
export interface ComponentNameProps {
  /** 
   * 属性描述
   * @default '默认值'
   */
  prop1?: string
}

const props = withDefaults(defineProps<ComponentNameProps>(), {
  prop1: 'default',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 计算属性
const rootClass = computed(() => ['f-component-name'])
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
```

**index.ts 模板**：

```typescript
import comp from './index.vue'
import { withInstall } from '@utils/install'

const FComponentName = withInstall(comp)

export default FComponentName
```

**style/index.scss 模板**：

```scss
@use './_componentname' as *;
```

**style/_componentname.scss 模板**：

```scss
// BEM 命名
.f-component-name {
  // 基础样式
  
  &__element {
    // 子元素
  }
  
  &--modifier {
    // 修饰符
  }
  
  &.is-state {
    // 状态
  }
}
```

#### 步骤 4：注册组件

提醒用户修改以下文件：
1. `packages/fit-ui/src/components.ts` - 添加导出
2. `packages/fit-ui/src/entry.ts` - 添加导入和样式
3. `packages/fit-ui/src/full.ts` - 添加导入和样式

#### 步骤 5：生成测试用例

参考「测试编写流程」

### 3. 组件重构流程

#### 步骤 1：分析现有代码

- 检查是否使用 Options API
- 检查代码风格是否符合规范
- 识别可优化的部分

#### 步骤 2：重构指导

**Options API → Composition API**：

```typescript
// ❌ 重构前（Options API）
export default {
  name: 'FComponentName',
  props: {
    type: String
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleClick() {}
  }
}

// ✅ 重构后（Composition API）
defineOptions({ name: 'FComponentName' })

interface Props {
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default'
})

const value = ref('')

const handleClick = () => {}
```

#### 步骤 3：代码优化

- 使用 `<script setup>` 语法
- 添加完整的 JSDoc 注释
- 使用 TypeScript 类型定义
- 应用 `inheritAttrs: false`

### 4. 测试编写流程

#### 步骤 1：确认测试范围

- 基础渲染测试
- Props 测试
- 事件测试
- 状态测试
- 插槽测试

#### 步骤 2：生成测试代码

```typescript
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FComponentName from '..'

describe('FComponentName', () => {
  // 1. 基础渲染测试
  test('mounts correctly', () => {
    const wrapper = mount(FComponentName)
    expect(wrapper.exists()).toBe(true)
  })

  // 2. Props 测试
  test('renders props correctly', () => {
    const wrapper = mount(FComponentName, {
      props: { prop1: 'value' }
    })
    expect(wrapper.classes()).toContain('expected-class')
  })

  // 3. 事件测试
  test('emits events correctly', async () => {
    const wrapper = mount(FComponentName)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 4. 状态测试
  test('disabled state', async () => {
    const wrapper = mount(FComponentName, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 5. 插槽测试
  test('renders default slot', () => {
    const wrapper = mount(FComponentName, {
      slots: { default: '插槽内容' }
    })
    expect(wrapper.text()).toContain('插槽内容')
  })
})
```

### 5. 开发指导流程

#### 常见问题解答

**Q1: 组件命名规范？**
- 组件目录：`F + 大驼峰`（如 `FButton`）
- 组件名：`FComponentName`
- 样式文件：`_组件名小写.scss`
- 测试文件：`组件名小写.test.ts`

**Q2: 样式如何组织？**
- 使用 BEM 命名规范
- 使用 `@use` 代替 `@import`
- 状态类使用 `is-` 前缀

**Q3: 如何导出组件？**
- 必须使用 `withInstall` 包装
- 仅 `export default`，不要写命名导出
- 命名导出由 `components.ts` 统一完成

---

## 输出标准

所有生成的代码必须遵循以下标准：

### 代码风格

- ✅ 使用 Composition API + `<script setup>`
- ✅ 使用 TypeScript 类型定义
- ✅ 使用 `defineOptions` 设置组件名
- ✅ 设置 `inheritAttrs: false`
- ✅ Props 必须有 JSDoc 注释和默认值
- ✅ Emits 必须使用泛型语法

### 文件结构

- ✅ 必须包含 `__tests__/`、`style/`、`index.ts`、`index.vue`
- ✅ 样式使用 `@use` 语法引用
- ✅ 测试文件命名规范

### 文档规范

- ✅ 组件必须有 JSDoc 描述
- ✅ Props 必须有详细注释
- ✅ 必须提供使用示例
- ✅ 复杂逻辑必须有注释说明

---

## 与项目规则协同

本技能与以下规则文件协同工作：

- [`03-file-structure.md`](../../../.trae/rules/03-file-structure.md) - 文件结构规范
- [`02-code-style.md`](../../../.trae/rules/02-code-style.md) - 代码风格规范
- [`06-testing.md`](../../../.trae/rules/06-testing.md) - 测试标准
- [`12-checklists.md`](../../../.trae/rules/12-checklists.md) - 检查清单

---

## 使用示例

### 示例 1：创建新组件

**用户**：帮我创建一个 FCard 卡片组件

**技能响应**：

1. 确认组件信息
   - 组件名称：FCard
   - 功能：卡片容器，支持头像、标题、内容和操作区域

2. 创建目录结构
   ```
   packages/fit-ui/src/FCard/
   ├── __tests__/card.test.ts
   ├── style/
   │   ├── _card.scss
   │   ├── index.scss
   │   └── index.ts
   ├── index.ts
   └── index.vue
   ```

3. 生成组件代码（略，见模板）

4. 提醒注册组件
   - 修改 `components.ts`
   - 修改 `entry.ts`
   - 修改 `full.ts`

5. 生成测试用例

### 示例 2：编写测试

**用户**：为 FButton 组件补充测试用例

**技能响应**：

1. 分析现有测试覆盖情况
2. 补充缺失的测试用例：
   - Props 组合测试
   - 事件参数测试
   - 插槽测试
   - 边界情况测试

3. 生成完整的测试文件

### 示例 3：重构组件

**用户**：将 FModal 组件重构为 Composition API

**技能响应**：

1. 分析现有代码结构
2. 使用 Composition API 重构：
   - Props 使用 `defineProps`
   - Emits 使用 `defineEmits`
   - 响应式数据使用 `ref`/`computed`
3. 添加完整的 JSDoc 注释
4. 优化代码结构

---

## 注意事项

⚠️ **重要**：
- 不要直接导入未包装的 SFC（可能绕过 withInstall）
- 样式必须使用 `@use`，禁止使用 `@import`
- 测试必须从 `'..'` 导入（使用 index.ts）
- 新增组件必须同步修改三个注册文件

---

**版本**: 1.0.0  
**创建时间**: 2026-04-16  
**维护者**: FitUI Team
