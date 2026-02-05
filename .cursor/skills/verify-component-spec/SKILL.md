---
name: verify-component-spec
description: 验证 Vue3 组件是否符合 FitUI 组件库开发规范，包括目录结构、withInstall 使用、defineOptions 配置、样式引用、全局注册等。当需要检查组件规范、验证组件结构、审查组件代码或用户提到"组件规范"、"开发规范"、"组件检查"时使用。
---

# FitUI 组件规范验证

验证 Vue3 组件是否符合 [COMPONENT_DEVELOPMENT_SPEC.md](../../../docs/COMPONENT_DEVELOPMENT_SPEC.md) 中定义的强制开发规范。

## 快速开始

当需要验证组件时，按照以下步骤执行：

```
1. 读取组件目录结构
2. 逐项检查规范清单
3. 生成验证报告
4. 如有问题，提供修复建议
```

## 验证清单

### 1. 目录与文件结构

检查组件目录是否包含必需文件：

```
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

- [ ] 组件目录名为 **F + 大驼峰**
- [ ] 存在 `__tests__/` 目录和测试文件
- [ ] 存在 `style/` 目录及必需的样式文件
- [ ] 存在 `index.ts` 和 `index.vue`

### 2. index.ts 规范

读取 `index.ts` 文件，检查：

```typescript
// 必须符合此模式
import comp from './index.vue'
import { withInstall } from '@utils/install'

const FComponentName = withInstall(comp)

export default FComponentName
```

- [ ] 使用 `withInstall` 包装组件
- [ ] 仅有 `export default`，无多余的命名导出
- [ ] 从 `@utils/install` 导入 `withInstall`

**常见错误：**
- ❌ 未使用 `withInstall`
- ❌ 同时存在 `export { FComponentName }`

### 3. index.vue 规范

读取 `index.vue` 文件，检查：

#### 3.1 defineOptions（必写）

```vue
<script setup lang="ts">
defineOptions({ name: 'FComponentName', inheritAttrs: false })
```

- [ ] 存在 `defineOptions`
- [ ] `name` 属性与组件名一致
- [ ] `inheritAttrs` 设置为 `false`
- [ ] 位置在 JSDoc 之后、import 之前

#### 3.2 JSDoc 注释

- [ ] 组件顶部存在 JSDoc 注释
- [ ] 包含 `@description` 和 `@example`

#### 3.3 Props 默认值

- [ ] 可选 props 有合理默认值
- [ ] 使用 `withDefaults(defineProps<...>(), { ... })`

#### 3.4 样式引用

检查 `<style>` 标签：

```vue
<style scoped lang="scss">
@use './style/index' as *;
</style>
```

- [ ] 使用 `@use` 引用样式，而非内联大段样式
- [ ] 引用路径正确（`'./style/index'` 或 `'./style/componentname'`）

**常见错误：**
- ❌ 在 Vue 中写大段内联样式
- ❌ 未使用 `scoped`

### 4. style 目录规范

读取 `style/index.scss`，检查：

```scss
@use './_componentname' as *;
```

- [ ] 使用 `@use` 而非 `@import`
- [ ] 仅作为入口，不包含具体样式

**常见错误：**
- ❌ 使用 `@import './_componentname.scss'`

### 5. 全局注册

检查以下三个文件是否包含该组件：

#### 5.1 components.ts

```typescript
export { default as FComponentName } from './FComponentName'
```

- [ ] 存在该组件的导出行

#### 5.2 entry.ts

- [ ] 在顶部 import 中包含组件
- [ ] 在样式 import 中包含 `import './FComponentName/style'`
- [ ] 在 export 和 components 数组中包含组件

#### 5.3 full.ts

- [ ] 与 entry.ts 相同的三处修改

### 6. 单元测试

读取 `__tests__/componentname.test.ts`，检查：

- [ ] 测试文件存在
- [ ] 包含默认渲染测试
- [ ] 包含关键 props 测试
- [ ] 包含关键事件测试

## 验证流程

执行完整验证的步骤：

### Step 1: 确定组件路径

询问用户要验证的组件名或路径，例如：
- `FIcon`
- `packages/fit-ui/src/FButton`

### Step 2: 读取必需文件

使用并行读取，一次性读取所有关键文件：

```typescript
// 需要读取的文件
- packages/fit-ui/src/FComponentName/index.ts
- packages/fit-ui/src/FComponentName/index.vue
- packages/fit-ui/src/FComponentName/style/index.scss
- packages/fit-ui/src/components.ts
- packages/fit-ui/src/entry.ts
- packages/fit-ui/src/full.ts
```

### Step 3: 执行验证

逐项对照验证清单检查，记录：
- ✅ 符合项
- ❌ 不符合项（附问题描述）
- ⚠️ 警告项（建议改进）

### Step 4: 生成报告

使用以下格式输出：

```markdown
# FComponentName 组件规范验证报告

## 验证结果：✅ 通过 / ❌ 未通过

---

## 详细检查

### ✅ 符合规范 (X/Y)
- [x] 目录结构正确
- [x] 使用 withInstall
...

### ❌ 不符合规范
1. **index.vue 缺少 defineOptions**
   - 位置：packages/fit-ui/src/FComponentName/index.vue
   - 问题：未定义 defineOptions
   - 修复：在 <script setup> 顶部添加 defineOptions({ name: 'FComponentName', inheritAttrs: false })

### ⚠️ 建议改进
1. **Props 缺少注释**
   - 建议为 props 添加 JSDoc 注释说明

---

## 总结

- 总计检查项：Y 项
- 符合：X 项
- 不符合：Z 项
- 建议改进：W 项

综合评价：[优秀 / 良好 / 需改进]
```

## 批量验证

如需验证多个组件，可以：

1. 使用 Glob 工具查找所有组件目录
2. 逐个执行验证流程
3. 生成汇总报告

```typescript
// 查找所有组件
Glob: packages/fit-ui/src/F*/index.vue
```

## 自动修复

对于常见问题，可以提供自动修复：

### 问题：缺少 defineOptions

```vue
<!-- 在 <script setup> 中添加 -->
defineOptions({ name: 'FComponentName', inheritAttrs: false })
```

### 问题：样式使用 @import

```scss
<!-- 将 -->
@import './_componentname.scss';

<!-- 改为 -->
@use './_componentname' as *;
```

### 问题：未在 components.ts 中注册

```typescript
// 在 components.ts 中添加
export { default as FComponentName } from './FComponentName'
```

## 参考资源

- 完整规范文档：[COMPONENT_DEVELOPMENT_SPEC.md](../../../docs/COMPONENT_DEVELOPMENT_SPEC.md)
- 参考组件：FButton、FInput、FSwitch
