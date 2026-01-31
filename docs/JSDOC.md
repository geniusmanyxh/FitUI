# 组件 JSDoc 文档说明

本文档说明 FitUI 组件库中添加的 JSDoc 注释，提升 IDE 智能提示和开发体验。

## ✅ 已添加 JSDoc 的组件

### 1. FButton 按钮组件

**位置：** `src/FButton/index.vue`

**文档内容：**
- 组件描述和使用场景
- 完整的属性说明（type, plain, round, size, icon）
- 每个属性的类型、默认值和示例
- 使用示例代码

**IDE 提示效果：**
```vue
<FButton 
  type="primary"     <!-- 提示：按钮类型，可选值：primary | success | info | warning | danger -->
  size="large"       <!-- 提示：按钮尺寸，可选值：small | medium | large -->
  plain              <!-- 提示：是否为朴素按钮 -->
  round              <!-- 提示：是否为圆角按钮 -->
  icon="search"      <!-- 提示：图标名称，例如：search | delete | edit -->
>
  按钮文本
</FButton>
```

---

### 2. FIcon 图标组件

**位置：** `src/FIcon/index.vue`

**文档内容：**
- 组件描述（支持多种图标集）
- icon 属性说明（图标名称）
- size 属性说明（支持预设尺寸和数字）
- 使用示例

**IDE 提示效果：**
```vue
<FIcon 
  icon="github"      <!-- 提示：图标名称，例如：github | search | delete | edit -->
  size="large"       <!-- 提示：图标尺寸，可选值：small | medium | large | 24 -->
/>
```

---

### 3. FTag 标签组件

**位置：** `src/FTag/index.vue`

**文档内容：**
- 组件描述和使用场景
- 12 个属性的完整说明
  - label, mode, type, size
  - closable, disabled, round
  - bgColor, textColor, borderColor
  - closeColor, closeHoverColor
- 事件说明（close 事件）
- 使用示例

**IDE 提示效果：**
```vue
<FTag 
  label="标签文本"           <!-- 提示：标签文本 -->
  type="success"             <!-- 提示：标签类型，可选值：success | warning | danger | info | primary | default -->
  mode="light"               <!-- 提示：标签模式 - dark: 深色 | light: 浅色 | plain: 朴素 -->
  size="medium"              <!-- 提示：标签尺寸，可选值：mini | small | medium | large -->
  closable                   <!-- 提示：是否可关闭 -->
  round                      <!-- 提示：是否圆角 -->
  bgColor="#409eff"          <!-- 提示：自定义背景色，例如：#409eff -->
  @close="handleClose"       <!-- 提示：关闭事件 - 点击关闭按钮时触发 -->
/>
```

---

### 4. FMessage 消息提示组件

**位置：** `src/FMessage/index.vue`

**文档内容：**
- 组件描述（全局消息提示）
- 6 个属性的完整说明
  - type, msg, duration
  - icon, showClose, zIndex
- 使用示例（配合 useMessage Hook）

**IDE 提示效果：**
```typescript
const { success, error, warning, info } = useMessage()

// 鼠标悬停会显示完整的 JSDoc 说明
success('操作成功！')  // 提示：显示成功消息
error('操作失败！', {  
  duration: 5000,      // 提示：显示时长（毫秒），默认 3000
  showClose: true      // 提示：是否显示关闭按钮，默认 false
})
```

---

### 5. FToolTip 工具提示组件

**位置：** `src/FToolTip/index.vue`

**文档内容：**
- 组件描述（鼠标悬停或点击提示）
- 9 个属性的完整说明
  - content (必填), mode, position
  - trigger, offset, zIndex, maxWidth
  - modeTextColor, modeBgColor (自定义主题)
- 使用示例

**IDE 提示效果：**
```vue
<FToolTip 
  content="这是提示信息"              <!-- 提示：提示内容（必填） -->
  position="top"                      <!-- 提示：提示位置，可选值：top | bottom | left | right 等 -->
  mode="dark"                         <!-- 提示：主题模式 - dark: 深色 | light: 浅色 | custom: 自定义 -->
  trigger="hover"                     <!-- 提示：触发方式 - hover: 悬停 | click: 点击 -->
  offset="2"                          <!-- 提示：偏移量（像素），默认 2 -->
  zIndex="1001"                       <!-- 提示：z-index 层级，默认 1001 -->
  maxWidth="200"                      <!-- 提示：最大宽度（像素），不设置则自适应 -->
  modeTextColor="#ffffff"             <!-- 提示：自定义文本颜色（仅 mode='custom' 时生效） -->
  modeBgColor="#409eff"               <!-- 提示：自定义背景颜色（仅 mode='custom' 时生效） -->
>
  <FButton>悬停我</FButton>
</FToolTip>
```

---

### 6. useMessage Hook

**位置：** `utils/tsHooks/useMessage.ts`

**文档内容：**
- Hook 总体说明
- 完整的使用示例
- 每个方法的详细说明
  - message() - 通用消息方法
  - success() - 成功消息
  - error() - 错误消息
  - warning() - 警告消息
  - info() - 信息消息
- 参数类型说明
- 回调函数说明

**IDE 提示效果：**
```typescript
import { useMessage } from '@geniusmanyxh/fit-ui'

const { success, error, warning, info, message } = useMessage()

// 每个方法都有完整的 JSDoc 提示
success(
  '操作成功！',   // 参数1：msg - 消息内容
  {               // 参数2：options - 附加配置选项
    duration: 5000,      // 显示时长（毫秒）
    showClose: true,     // 是否显示关闭按钮
    zIndex: 2000,        // z-index 层级
    onClose: (res) => {  // 关闭回调函数
      console.log(res)
    }
  }
)
```

---

## 📊 JSDoc 覆盖率

| 组件/Hook | 状态 | 属性数 | 文档完整度 |
|-----------|------|--------|------------|
| FButton   | ✅   | 5      | 100% |
| FIcon     | ✅   | 2      | 100% |
| FTag      | ✅   | 12     | 100% |
| FMessage  | ✅   | 6      | 100% |
| FToolTip  | ✅   | 9      | 100% |
| useMessage| ✅   | 5方法  | 100% |
| FCodeBlock| ⏳   | -      | 待添加 |

---

## 🎯 JSDoc 注释规范

### 组件文档结构

```typescript
/**
 * 组件名称
 * 
 * @description 组件功能描述和使用场景
 * @example
 * ```vue
 * <ComponentName 
 *   prop1="value1"
 *   prop2="value2"
 * >
 *   内容
 * </ComponentName>
 * ```
 */
```

### 属性文档结构

```typescript
interface ComponentProps {
  /**
   * 属性描述
   * @default 默认值
   * @description 详细说明（可选）
   * @example 示例值
   */
  propName?: PropType
}
```

### 方法文档结构

```typescript
/**
 * 方法功能描述
 * @param paramName - 参数描述
 * @param options - 配置选项
 * @param options.option1 - 选项1描述
 * @returns 返回值描述
 * @example
 * methodName('param', { option1: 'value' })
 */
```

---

## 💡 使用效果

### 1. 智能提示

在 VSCode 等 IDE 中，鼠标悬停在组件或属性上时，会显示完整的文档说明。

### 2. 参数提示

输入组件或方法时，会自动提示所有可用的属性和参数。

### 3. 类型检查

TypeScript 会根据 JSDoc 提供的类型信息进行类型检查。

### 4. 文档生成

可以使用工具（如 TypeDoc）自动生成 API 文档。

---

## 🚀 后续优化

### 待添加文档的组件

1. **FCodeBlock** - 代码块组件
   - 需要添加属性文档
   - 包括 title, code, lang, showCode, theme 等

### 文档增强

1. **添加更多示例** - 为每个组件添加多个使用场景示例
2. **添加注意事项** - 标注特殊用法或限制
3. **添加相关链接** - 链接到在线文档

### 工具集成

1. **TypeDoc 配置** - 自动生成 API 文档站点
2. **Vite 插件** - 在开发时显示组件文档
3. **VSCode 插件** - 增强 IDE 提示

---

## 📝 维护指南

### 新增组件时

1. 在组件文件顶部添加组件总体说明
2. 为所有 props 添加 JSDoc 注释
3. 为所有 emits 添加说明
4. 提供至少一个使用示例

### 更新组件时

1. 同步更新 JSDoc 文档
2. 保持示例代码最新
3. 更新默认值说明

### 文档规范

- 使用中文描述（面向中文用户）
- 描述简洁清晰
- 提供实际可用的示例
- 标注重要属性的默认值

---

**文档完成度：** 85%（6/7 组件已完成）

**下一步：** 为 FCodeBlock 添加 JSDoc 注释
