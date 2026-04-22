# FOption 和 FOptionGroup 组件独立化重构计划

## 📋 任务概述

将 `FOption` 和 `FOptionGroup` 两个子组件从 `FSelect/` 目录中提取出来，各自建立独立的顶级组件目录结构，与 `FSelect` 平级放在 `src/` 目录下，使其符合 FitUI 项目的组件标准规范。

---

## 🎯 重构目标

### 当前结构（存在问题）
```
src/
└── FSelect/
    ├── Option.vue          ❌ 嵌套在 FSelect 内部
    ├── OptionGroup.vue     ❌ 嵌套在 FSelect 内部
    ├── Select.ts
    ├── index.ts
    ├── index.vue
    ├── style/
    └── __tests__/
```

### 目标结构（符合规范）
```
src/
├── FSelect/                主组件
│   ├── Select.ts           类型定义
│   ├── index.ts            导出入口
│   ├── index.vue           组件主体
│   ├── style/              样式目录
│   │   ├── _select.scss
│   │   ├── index.scss
│   │   └── index.ts
│   └── __tests__/
│       └── select.test.ts
│
├── FOption/                ✅ 独立顶级组件
│   ├── Option.ts           类型定义
│   ├── index.ts            导出入口
│   ├── index.vue           组件主体
│   ├── style/              样式目录
│   │   ├── _option.scss
│   │   ├── index.scss
│   │   └── index.ts
│   └── __tests__/
│       └── option.test.ts
│
└── FOptionGroup/           ✅ 独立顶级组件
    ├── OptionGroup.ts      类型定义
    ├── index.ts            导出入口
    ├── index.vue           组件主体
    ├── style/              样式目录
    │   ├── _option-group.scss
    │   ├── index.scss
    │   └── index.ts
    └── __tests__/
        └── option-group.test.ts
```

---

## 📝 实施步骤

### Step 1: 创建 FOption 顶级组件目录

**1.1 创建目录结构**
```bash
mkdir -p packages/fit-ui/src/FOption/style
mkdir -p packages/fit-ui/src/FOption/__tests__
```

**1.2 创建 FOption/index.vue**
- 将原 `FSelect/Option.vue` 内容复制到 `FOption/index.vue`
- 保持组件名称：`name: 'FOption'`
- 确保使用路径别名导入（`@utils/install` 等）
- 遵循 Vue 组件规范：
  - `defineOptions` 在首行
  - Props 有 JSDoc 注释
  - 样式引用 `@use './style/index' as *`

**1.3 创建 FOption/Option.ts 类型定义**
```typescript
export interface OptionProps {
  /** 
   * 选项值 
   */
  value: string | number
  
  /** 
   * 选项显示文本 
   */
  label: string
  
  /** 
   * 是否禁用 
   * @default false
   */
  disabled?: boolean
}
```

**1.4 创建 FOption/index.ts**
```typescript
import comp from './index.vue'
import { withInstall } from '@utils/install'

const FOption = withInstall(comp)

export default FOption
```

**1.5 创建 FOption/style 目录**
- `style/_option.scss`: 从 `FSelect/style/_select.scss` 中提取 `.f-select__item` 相关样式
- `style/index.scss`: 
  ```scss
  @use './_option' as *;
  ```
- `style/index.ts`: 
  ```typescript
  import './index.scss'
  ```

**1.6 创建 FOption/__tests__/option.test.ts**
- 基础渲染测试
- Props 验证测试
- 事件触发测试
- 禁用状态测试
- 选中状态测试

---

### Step 2: 创建 FOptionGroup 顶级组件目录

**2.1 创建目录结构**
```bash
mkdir -p packages/fit-ui/src/FOptionGroup/style
mkdir -p packages/fit-ui/src/FOptionGroup/__tests__
```

**2.2 创建 FOptionGroup/index.vue**
- 将原 `FSelect/OptionGroup.vue` 内容复制到 `FOptionGroup/index.vue`
- 保持组件名称：`name: 'FOptionGroup'`
- 确保使用路径别名导入
- 遵循 Vue 组件规范

**2.3 创建 FOptionGroup/OptionGroup.ts 类型定义**
```typescript
export interface OptionGroupProps {
  /** 
   * 分组标签文本 
   */
  label: string
  
  /** 
   * 是否禁用整个分组 
   * @default false
   */
  disabled?: boolean
}
```

**2.4 创建 FOptionGroup/index.ts**
```typescript
import comp from './index.vue'
import { withInstall } from '@utils/install'

const FOptionGroup = withInstall(comp)

export default FOptionGroup
```

**2.5 创建 FOptionGroup/style 目录**
- `style/_option-group.scss`: 从 `FSelect/style/_select.scss` 中提取 `.f-select__group` 相关样式
- `style/index.scss`: 
  ```scss
  @use './_option-group' as *;
  ```
- `style/index.ts`: 
  ```typescript
  import './index.scss'
  ```

**2.6 创建 FOptionGroup/__tests__/option-group.test.ts**
- 基础渲染测试
- Props 验证测试
- 分组功能测试
- 禁用状态测试

---

### Step 3: 更新 FSelect/index.ts 导出

**3.1 修改导出方式**

修改前：
```typescript
import select from './index.vue'
import option from './Option.vue'
import optionGroup from './OptionGroup.vue'
import { withInstall } from '@utils/install'

const FSelect = withInstall(select)
const FOption = withInstall(option)
const FOptionGroup = withInstall(optionGroup)

export { FOption, FOptionGroup }
export default FSelect
```

修改后（导入独立的顶级组件）：
```typescript
import select from './index.vue'
import FOption from '../FOption'
import FOptionGroup from '../FOptionGroup'
import { withInstall } from '@utils/install'

const FSelect = withInstall(select)

export { FOption, FOptionGroup }
export default FSelect
```

**3.2 说明**
- FOption 和 FOptionGroup 已在各自的 `index.ts` 中通过 `withInstall` 包装
- FSelect/index.ts 直接导入即可，无需重复包装
- 保持向后兼容的导出方式

---

### Step 4: 更新类型定义

**4.1 FSelect/Select.ts 调整**
- 保留 `SelectContext` 等 FSelect 核心类型
- 删除 `OptionProps` 和 `OptionGroupProps`（已移至独立组件）
- 或保留类型别名以向后兼容：
  ```typescript
  // 向后兼容，引用新组件的类型
  export type { OptionProps } from '../FOption/Option'
  export type { OptionGroupProps } from '../FOptionGroup/OptionGroup'
  ```

**4.2 FOption/Option.ts 和 FOptionGroup/OptionGroup.ts**
- 定义独立的 Props 类型
- 确保类型完整、有 JSDoc 注释

**4.3 更新组件内的类型导入**
- FSelect/index.vue 中如有引用 OptionProps，需更新导入路径
- FOption/index.vue 和 FOptionGroup/index.vue 使用本地类型定义

---

### Step 5: 删除旧文件

**5.1 删除旧组件文件**
```bash
rm packages/fit-ui/src/FSelect/Option.vue
rm packages/fit-ui/src/FSelect/OptionGroup.vue
```

**5.2 验证无其他文件引用**
- 使用 `Grep` 搜索整个项目
- 确保没有其他地方直接引用旧路径

---

### Step 6: 更新全局注册文件

**6.1 检查并更新以下文件**
- `packages/fit-ui/src/components.ts`
- `packages/fit-ui/src/entry.ts`
- `packages/fit-ui/src/full.ts`

**6.2 更新 components.ts**

修改前：
```typescript
export { default as FSelect } from './FSelect'
// FOption 和 FOptionGroup 通过 FSelect 导出
```

修改后：
```typescript
export { default as FSelect } from './FSelect'
export { default as FOption } from './FOption'
export { default as FOptionGroup } from './FOptionGroup'
```

**6.3 更新 entry.ts**

```typescript
// 导入组件
import { FSelect, FOption, FOptionGroup } from './components'

// 导入组件样式（必须）
import './FSelect/style'
import './FOption/style'
import './FOptionGroup/style'

// 导出组件
export { FSelect, FOption, FOptionGroup }
```

**6.4 更新 full.ts**

```typescript
// 导入组件
import { FSelect, FOption, FOptionGroup } from './components'

// 导入组件样式
import './FSelect/style'
import './FOption/style'
import './FOptionGroup/style'

// 组件数组
const components = [
  // ... 其他组件
  FSelect,
  FOption,
  FOptionGroup,
  // ...
]
```

**6.5 验证注册顺序**
- 确保 FOption 和 FOptionGroup 在组件数组中注册
- 保持组件数组顺序一致

---

### Step 7: 样式处理

**7.1 样式拆分方案**

方案 A（推荐）：样式独立
- 从 `FSelect/style/_select.scss` 中提取 `.f-select__item` 样式到 `FOption/style/_option.scss`
- 从 `FSelect/style/_select.scss` 中提取 `.f-select__group` 样式到 `FOptionGroup/style/_option-group.scss`
- `FSelect/style/_select.scss` 中保留主组件样式，删除已提取的样式
- 各组件样式独立维护，避免耦合

方案 B：共享样式
- `_select.scss` 保留所有样式
- FOption 和 FOptionGroup 的 style 目录引用 `_select.scss`

**选择方案 A**：因为 FOption 和 FOptionGroup 现在是独立顶级组件，应该拥有独立的样式文件，职责更清晰。

**7.2 实现方案 A**

**FOption/style/_option.scss**:
```scss
@use '../../../styles/global' as *;

.f-select__item {
  // 从 _select.scss 中提取的完整样式
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  line-height: 1.6;
  color: var(--f-text-primary);
  cursor: pointer;
  transition: all var(--f-transition-duration) ease;
  border-radius: 4px;
  margin: 0 4px;

  &:hover:not(.is-disabled) {
    background-color: color-mix(in srgb, var(--f-primary) 8%, transparent);
  }

  &:active:not(.is-disabled) {
    transform: scale(0.98);
  }

  &-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
  }

  &-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 12px;
    color: var(--f-primary);
    font-size: 14px;
    flex-shrink: 0;
    transition: transform var(--f-transition-duration) ease;
  }

  &.is-selected {
    color: var(--f-primary);
    font-weight: 600;
    background-color: color-mix(in srgb, var(--f-primary) 10%, transparent);

    .f-select__item-check {
      transform: scale(1.1);
    }
  }

  &.is-disabled {
    color: var(--f-text-disabled);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.is-hovering {
    background-color: color-mix(in srgb, var(--f-primary) 8%, transparent);
  }

  &.is-grouped {
    padding-left: 28px;
  }
}
```

**FOptionGroup/style/_option-group.scss**:
```scss
@use '../../../styles/global' as *;

.f-select__group {
  margin: 0;
  padding: 0;

  & + .f-select__group {
    margin-top: 4px;
  }

  &-label {
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 500;
    color: var(--f-text-secondary);
    background-color: color-mix(in srgb, var(--f-text-secondary) 5%, transparent);
    cursor: default;
  }

  &-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
```

**7.3 更新 FSelect/style/_select.scss**
- 删除已移至 FOption 和 FOptionGroup 的样式
- 保留 FSelect 主组件相关样式（trigger、tags、popper、loading、empty 等）

---

### Step 8: 验证和测试

**8.1 类型检查**
```bash
cd packages/fit-ui
pnpm run type-check
# 或
vue-tsc --noEmit
```

**8.2 运行测试**
```bash
pnpm run test -- select
```

**8.3 构建验证**
```bash
pnpm run build
```

**8.4 手动测试**
- 启动开发服务器
- 验证 FSelect 组件功能
- 验证 FOption 分组功能
- 验证 FOptionGroup 分组功能

---

## ⚠️ 注意事项

### 1. 路径别名
- 所有导入必须使用路径别名（`@utils`, `@fstyles` 等）
- 禁止使用相对路径（如 `../../`）

### 2. 组件注册
- FOption 和 FOptionGroup 必须通过 `withInstall` 包装
- 确保 `defineOptions` 中 `name` 属性正确

### 3. 向后兼容
- 保持原有 API 不变
- 保持导入方式不变：
  ```typescript
  import { FSelect, FOption, FOptionGroup } from 'fit-ui'
  ```

### 4. 样式作用域
- 子组件的样式仍然使用 `scoped` 属性
- 全局样式仍通过 `_select.scss` 统一管理

---

## 📊 检查清单

- [ ] FOption 目录结构创建完成
- [ ] FOptionGroup 目录结构创建完成
- [ ] FOption/index.vue 组件代码正确
- [ ] FOptionGroup/index.vue 组件代码正确
- [ ] FOption/index.ts 导出正确
- [ ] FOptionGroup/index.ts 导出正确
- [ ] FOption/style 目录创建并正确引用样式
- [ ] FOptionGroup/style 目录创建并正确引用样式
- [ ] FSelect/index.ts 更新导出
- [ ] Select.ts 类型定义更新
- [ ] 旧文件已删除
- [ ] components.ts 更新
- [ ] entry.ts 更新
- [ ] full.ts 更新
- [ ] 类型检查通过
- [ ] 单元测试通过
- [ ] 构建成功
- [ ] 手动功能验证通过

---

## 🔍 风险点

1. **样式丢失**：拆分样式时需确保没有遗漏
2. **导入路径错误**：使用路径别名时需验证路径正确性
3. **组件注册失败**：确保 `withInstall` 正确使用
4. **类型定义缺失**：确保 Props 和 Emits 类型完整
5. **测试用例缺失**：需要为两个新组件编写完整的单元测试

---

## 📅 影响范围

### 直接修改的文件
1. 新建：`src/FOption/index.vue`
2. 新建：`src/FOption/index.ts`
3. 新建：`src/FOption/Option.ts`
4. 新建：`src/FOption/style/_option.scss`
5. 新建：`src/FOption/style/index.scss`
6. 新建：`src/FOption/style/index.ts`
7. 新建：`src/FOption/__tests__/option.test.ts`
8. 新建：`src/FOptionGroup/index.vue`
9. 新建：`src/FOptionGroup/index.ts`
10. 新建：`src/FOptionGroup/OptionGroup.ts`
11. 新建：`src/FOptionGroup/style/_option-group.scss`
12. 新建：`src/FOptionGroup/style/index.scss`
13. 新建：`src/FOptionGroup/style/index.ts`
14. 新建：`src/FOptionGroup/__tests__/option-group.test.ts`
15. 修改：`src/FSelect/index.ts`
16. 修改：`src/FSelect/Select.ts`
17. 修改：`src/FSelect/style/_select.scss`
18. 修改：`src/components.ts`
19. 修改：`src/entry.ts`
20. 修改：`src/full.ts`

### 删除的文件
1. `src/FSelect/Option.vue`
2. `src/FSelect/OptionGroup.vue`

### 不受影响的文件
- `src/FSelect/index.vue`（主组件逻辑不变）
- 其他组件
