# FTag 组件

## 默认使用

常用的标签可以使用`label`属性来定义标签文本。
<nsdemo filePath="tag/index.vue"/>

## 主题模式

可以使用`mode`属性来定义标签的主题模式,默认是`dark`。
- `mode`属性可以选择：`dark、light、plain`
<nsdemo filePath="tag/mode.vue"></nsdemo>

## 标签尺寸

可以使用`size`属性定义标签的大小。
- `size`属性可以选择：`mini、small、medium、large`，默认值是：`medium`
<nsdemo filePath="tag/size.vue"></nsdemo>

## 圆角标签

可以使用`round`属性开启标签的圆角。
- `round`属性可以选择：`true、false`
<nsdemo filePath="tag/round.vue"></nsdemo>

## 开启禁用状态

可以使用`disabled`属性来禁用标签。
- `disabled`属性可以选择：`true、false`
<nsdemo filePath="tag/disabled.vue"></nsdemo>

## 开启关闭按钮

可以使用`closable`属性来开启标签的关闭按钮。
- `closable`属性可以选择：`true、false`
<nsdemo filePath="tag/close.vue"></nsdemo>

## Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :--: | :--: | :--: | :--: |
| `label` | 标签文本 | `string` | 无 | `''` |
| `mode` | 标签主题模式 | `string` | `dark、light、plain` | `dark` |
| `size` | 标签尺寸 | `string` | `mini、small、medium、large` | `medium` |
| `closable` | 是否可关闭 | `boolean` | `true、false` | `false` |
| `disabled` | 是否禁用 | `boolean` | `true、false` | `false` |
| `round` | 是否圆角 | `boolean` | `true、false` | `false` |
| `bgColor` | 自定义背景颜色 | `string` | 无 | `''` |
| `textColor` | 自定义文本颜色 | `string` | 无 | `''` |
| `borderColor` | 自定义边框颜色 | `string` | 无 | `''` |

## Events

| 事件名 | 说明 | 参数 |
| :--: | :--: | :--: |
| `close` | 当标签被关闭时触发 | 无 |

## Slots

| 插槽名 | 说明 |
| :--: | :--: |
| `label` | 自定义标签内容 |
| `close` | 自定义关闭按钮内容 |
