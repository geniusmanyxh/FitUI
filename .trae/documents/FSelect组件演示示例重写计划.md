# FSelect 组件演示示例重写计划

## 目标

全面重写 `d:\gitCode\FitUI\packages\fit-test\src\examples\FSelect\index.vue` 目录下的 FSelect 组件演示示例，完整展示组件的所有核心功能、配置选项和交互效果。

## 现状分析

现有 demo 存在以下问题：
1. 缺少远程搜索、分组选项、自定义插槽等高级功能演示
2. 缺少事件监听和方法调用的示例
3. 缺少对象类型 valueKey 的使用场景
4. 代码组织不够清晰，缺少注释说明
5. 缺少 tagType 颜色类型、placement 定位等配置演示
6. 多选折叠标签功能展示不完整（collapseTagsTooltip、maxCollapseTags）

## FSelect 核心功能清单

根据源码分析，FSelect 支持以下功能：

### 基础功能
- ✅ 单选/多选
- ✅ 禁用状态（组件级/选项级/分组级）
- ✅ 可清除 (clearable)
- ✅ 可搜索 (filterable)

### 高级功能
- ✅ 远程搜索 (remote + remoteMethod + loading)
- ✅ 创建新选项 (allowCreate)
- ✅ 选项分组 (FOptionGroup + 数据结构分组)
- ✅ 折叠标签 (collapseTags + collapseTagsTooltip + maxCollapseTags)
- ✅ 自定义过滤方法 (filterMethod)
- ✅ 对象值支持 (valueKey)

### 外观配置
- ✅ 三种尺寸 (small/medium/large)
- ✅ 标签颜色类型 (tagType: success/info/warning/danger)
- ✅ 下拉框定位 (placement)
- ✅ 自定义占位符、空状态文本、无匹配文本
- ✅ 前缀/后缀插槽

### 交互控制
- ✅ 多选数量限制 (multipleLimit)
- ✅ 保留搜索关键字 (reserveKeyword)
- ✅ 默认选中第一项 (defaultFirstOption)
- ✅ 自动聚焦 (autofocus)
- ✅ 点击外部关闭 (closeOnClickOutside)
- ✅ 失焦关闭 (closeOnBlur)

### 插槽系统
- ✅ prefix - 前缀内容
- ✅ suffix - 后缀内容
- ✅ option - 自定义选项模板
- ✅ empty - 空状态内容
- ✅ loading - 加载状态内容
- ✅ arrow - 下拉箭头图标

### 事件系统
- ✅ update:modelValue - 值变化
- ✅ change - 值变化触发
- ✅ visible-change - 下拉框显示/隐藏
- ✅ remove-tag - 移除标签
- ✅ clear - 清空操作
- ✅ focus/blur - 焦点事件
- ✅ create - 创建新选项

### 暴露方法
- ✅ focus() / blur()
- ✅ open() / close()

## 重写计划

### 整体结构

将 demo 重写为以下 15 个场景区块，每个区块包含：
- 清晰的标题和描述
- 可交互的组件实例
- 代码示例（使用 code-block 组件或注释）
- 关键参数说明

### 场景列表

#### 1. 基础单选 (Basic Single Select)
- 展示最基本的单选功能
- 包含 placeholder 自定义
- 演示 v-model 双向绑定
- 数据源：options 数组

#### 2. 基础多选 (Basic Multiple Select)
- 展示多选功能和标签显示
- 演示 multiple 属性
- 展示已选项的标签移除交互
- 数据源：options 数组

#### 3. 禁用状态 (Disabled States)
- 组件级禁用 (disabled=true)
- 选项级禁用 (disabled 选项)
- 分组级禁用 (FOptionGroup disabled)
- 对比展示三种禁用效果

#### 4. 可清除选择 (Clearable)
- 展示 clearable 属性
- 演示清空图标出现条件
- 展示 clear 事件触发
- 结合单选和多选场景

#### 5. 可搜索过滤 (Filterable)
- 本地搜索过滤 (filterable)
- 自定义过滤方法 (filterMethod)
- 保留搜索关键字 (reserveKeyword)
- 展示搜索交互效果

#### 6. 远程搜索 (Remote Search)
- 远程搜索功能 (remote + remoteMethod)
- 加载状态展示 (loading)
- 防抖搜索实现
- 自定义 loading 插槽

#### 7. 创建新选项 (Allow Create)
- allowCreate + filterable 组合
- 演示 create 事件
- 展示创建后的选项
- 单选和多选场景

#### 8. 选项分组 (Option Grouping)
- 使用 FOptionGroup 组件分组
- 使用数据结构 children 分组
- 展示分组标签样式
- 分组禁用效果

#### 9. 折叠标签 (Collapse Tags)
- collapseTags 折叠功能
- maxCollapseTags 控制显示数量
- collapseTagsTooltip 悬停提示
- 多选大量选项场景

#### 10. 尺寸变化 (Sizes)
- small (28px)
- medium (36px)
- large (44px)
- 横向对比展示

#### 11. 标签颜色类型 (Tag Types)
- tagType: success (绿色)
- tagType: info (蓝色)
- tagType: warning (橙色)
- tagType: danger (红色)
- 多选场景展示

#### 12. 自定义模板 (Custom Slots)
- prefix 插槽 - 自定义前缀图标
- suffix 插槽 - 自定义后缀内容
- option 插槽 - 自定义选项样式（带头像/图标）
- empty 插槽 - 自定义空状态
- arrow 插槽 - 自定义下拉箭头

#### 13. 下拉框定位 (Placement)
- top / bottom
- top-start / top-end
- bottom-start / bottom-end
- 演示不同定位效果

#### 14. 对象值支持 (Object Value & valueKey)
- 使用对象作为选项值
- valueKey 指定唯一标识
- 展示对象值的绑定和显示

#### 15. 事件与方法 (Events & Methods)
- 事件监听展示（change, visible-change, focus, blur, remove-tag, create）
- 方法调用演示（focus, blur, open, close）
- 使用 ref 调用组件方法
- 事件日志输出面板

## 实现步骤

1. 重写 `index.vue` 文件，包含所有 15 个场景
2. 完善 `<script setup>` 部分的数据和方法定义
3. 添加清晰的注释和说明
4. 优化 `<style scoped>` 样式，确保视觉展示清晰
5. 确保每个场景都可独立交互
6. 添加事件日志输出功能（场景 15）
7. 测试所有功能正常工作

## 代码组织

```vue
<template>
  <div class="f-select-demo">
    <custom-nav title="FSelect"></custom-nav>
    
    <!-- 场景 1-15 -->
    <div class="demo-section" v-for="section in sections" :key="section.title">
      <h3>{{ section.title }}</h3>
      <p class="demo-desc">{{ section.desc }}</p>
      <div class="demo-content">
        <!-- 组件实例 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入和定义
// 场景 1-15 的数据和方法
</script>

<style scoped lang="scss">
// 样式定义
</style>
```

## 注意事项

- 保持与现有项目风格一致
- 确保所有演示场景可交互
- 使用清晰的数据命名和注释
- 避免硬编码，使用响应式数据
- 确保 demo 在浏览器中正常渲染
