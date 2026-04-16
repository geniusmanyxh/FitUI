---
alwaysApply: false
description: 文件组织和目录结构规范
---
# 文件组织和目录结构

> **适用场景**：新增组件、重构目录  
> **相关文件**：`02-code-style.md`（代码风格）、`04-modules-deps.md`（模块依赖）  
> **预计阅读时间**：8 分钟

---

## 一、组件标准结构

### 1.1 目录结构

```
packages/fit-ui/src/FComponentName/
├── __tests__/
│   └── componentname.test.ts    # 单元测试（小写）
├── style/
│   ├── _componentname.scss      # 组件样式
│   ├── index.scss               # 样式入口
│   ├── index.ts                 # TS 引入样式
│   └── css.ts                   # CSS 变量（可选）
├── ComponentName.ts             # 类型定义（可选）
├── index.ts                     # 导出入口
└── index.vue                    # 组件主体
```

**强制规则**：
- ✅ 必须包含 `__tests__/`、`style/`、`index.ts`、`index.vue`
- ✅ 组件目录名：**F + 大驼峰**（如 `FButton`、`FSelect`）
- ✅ 样式部分文件：**_组件名.scss**（如 `_button.scss`）
- ✅ 测试文件：**组件名小写.test.ts**（如 `button.test.ts`）

### 1.2 文件说明

| 文件 | 用途 | 必填 |
|------|------|------|
| `index.vue` | 组件主体 | ✅ |
| `index.ts` | 组件导出（withInstall） | ✅ |
| `style/index.scss` | 样式入口 | ✅ |
| `style/_component.scss` | 组件样式 | ✅ |
| `style/index.ts` | TS 引入样式 | ✅ |
| `__tests__/xxx.test.ts` | 单元测试 | ✅ |
| `ComponentName.ts` | 类型定义 | ⚠️ 可选 |

---

## 二、index.ts 规范

### 2.1 组件导出

```typescript
// ✅ 正确：使用 withInstall
import comp from './index.vue'
import { withInstall } from '@utils/install'

const FComponentName = withInstall(comp)

export default FComponentName
```

```typescript
// ❌ 错误：未使用 withInstall
import FComponentName from './index.vue'
export default FComponentName

// ❌ 错误：多写命名导出
export default FComponentName
export { FComponentName }  // 不要这样写
```

**强制规则**：
- ✅ 必须使用 `withInstall(comp)` 包装
- ✅ 仅 `export default`，不要写 `export { FComponentName }`
- ✅ 命名导出由 `components.ts` 统一完成

### 2.2 带子组件的导出

```typescript
// FButton/index.ts
import button from "./index.vue"
import buttonGroup from "./ButtonGroup.vue"
import { withInstall } from '@utils/install'

const FButton = withInstall(button)
const FButtonGroup = withInstall(buttonGroup)

export { FButtonGroup }
export default FButton
```

---

## 三、index.vue 规范

### 3.1 基本结构

```vue
<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script lang="ts" setup>
/**
 * 组件 JSDoc 说明
 * @description 组件功能描述
 * @example 使用示例
 */

defineOptions({ 
  name: 'FComponentName', 
  inheritAttrs: false 
})

interface Props {
  /** 属性说明，@default 默认值 */
  type?: 'primary' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
```

### 3.2 强制规则

- ✅ 必须写 `defineOptions({ name: 'FComponentName', inheritAttrs: false })`
- ✅ Props 必须有 JSDoc 注释和默认值
- ✅ Emits 必须使用泛型语法
- ✅ 样式必须通过 `@use` 引用，禁止内联大段样式
- ✅ 必须设置 `inheritAttrs: false` 并手动控制 `$attrs`

---

## 四、style 目录规范

### 4.1 文件组织

```
style/
├── _component.scss      # 组件具体样式
├── index.scss           # 样式入口（仅 @use）
├── index.ts             # TS 引入样式
└── css.ts               # CSS 变量等
```

### 4.2 index.scss

```scss
// ✅ 正确：仅使用 @use
@use './_componentname' as *;

// ❌ 错误：使用 @import
@import './_componentname.scss';  // 禁止
```

### 4.3 index.ts

```typescript
// ✅ 正确：引入样式文件
import './index.scss'
```

### 4.4 _component.scss

```scss
// BEM 命名
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
- ✅ 必须使用 `@use`，禁止使用 `@import`
- ✅ `index.scss` 仅作为入口，不写具体样式
- ✅ 组件样式写在 `_component.scss` 中

---

## 五、全局注册规则

### 5.1 components.ts

```typescript
// 统一导出所有组件（命名导出）
export { default as FButton } from './FButton'
export { default as FInput } from './FInput'
export { default as FSelect } from './FSelect'
// ... 其他组件
```

**强制规则**：
- ✅ 新增组件必须在此添加导出
- ✅ 使用 `export { default as FComponentName }` 语法

### 5.2 entry.ts / full.ts

```typescript
import type { App } from 'vue'

// 1. 导入组件
import { FButton, FInput, FSelect } from './components'

// 2. 导入全局样式
import './index.scss'
import '@fstyles/theme/css-var.css'

// 3. 导入组件样式（必须）
import './FButton/style'
import './FInput/style'
import './FSelect/style'
// ... 所有组件样式

// 4. 导出组件（命名导出）
export { FButton, FInput, FSelect }

// 5. 组件数组（用于批量注册）
const components = [FButton, FInput, FSelect]

// 6. 安装函数
const install = (app: App): any => {
  components.forEach((c) => app.use(c))
}

// 7. 默认导出
export default { install }
```

**强制规则**：
- ✅ 新增组件必须同步修改 `components.ts`、`entry.ts`、`full.ts` 三处
- ✅ 必须导入并注册组件样式
- ✅ 组件数组顺序保持一致便于维护

---

## 六、项目目录规则

### 6.1 fit-ui 目录

```
packages/fit-ui/
├── src/
│   ├── FComponentName/          # 各组件目录
│   ├── components.ts            # 组件统一导出
│   ├── entry.ts                 # 按需引入入口
│   ├── full.ts                  # 全量引入入口
│   └── index.scss               # 全局样式
├── style/
│   ├── theme/                   # 主题样式
│   ├── mixins/                  # 全局 mixins
│   └── variables/               # SCSS 变量
├── utils/
│   ├── install.ts               # withInstall 工具
│   ├── fsize.ts                 # 尺寸工具
│   ├── ficon.ts                 # 图标工具
│   └── tsHooks/                 # 组合式函数
├── enums/
│   └── styleConstEnum.ts        # 样式常量枚举
├── ftypes/
│   └── index.type.ts            # 全局类型
└── fstyles/
    └── theme/                   # 主题样式
```

### 6.2 路径别名

| 别名 | 路径 | 用途 |
|------|------|------|
| `@/` | `./src/` | 组件源码 |
| `@utils/` | `./utils/` | 工具函数 |
| `@enums/` | `./enums/` | 枚举类型 |
| `@ftypes/` | `./ftypes/` | 类型定义 |
| `@fstyles/` | `./styles/` | 样式文件 |

**强制规则**：
- ✅ 必须使用路径别名，禁止使用相对路径（如 `../../`）
- ✅ 导入顺序：组件 → 工具 → 枚举 → 类型 → 样式

---

## 七、新增组件流程

### 7.1 创建步骤

1. **创建组件目录**
   ```bash
   mkdir src/FComponentName
   cd src/FComponentName
   mkdir __tests__ style
   ```

2. **创建必要文件**
   ```
   touch index.vue
   touch index.ts
   touch style/index.scss
   touch style/_component.scss
   touch style/index.ts
   touch __tests__/componentname.test.ts
   ```

3. **编写组件代码**
   - 参考 `02-code-style.md` 编写组件
   - 确保使用 `defineOptions`
   - 确保使用 `@use` 引用样式

4. **注册组件**
   - 修改 `components.ts` 添加导出
   - 修改 `entry.ts` 添加导入、样式、导出
   - 修改 `full.ts` 添加导入、样式、导出

5. **编写测试**
   - 参考 `06-testing.md` 编写测试用例
   - 至少包含 5 个基础测试

6. **自检**
   - 参考 `12-checklists.md` 使用「新增组件检查清单」

---

**下一步**：
- 模块划分请阅读 `04-modules-deps.md`
- 测试编写请阅读 `06-testing.md`
- 检查清单请阅读 `12-checklists.md`
