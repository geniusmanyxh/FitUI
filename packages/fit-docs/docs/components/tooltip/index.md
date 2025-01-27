# FToolTip 组件

## 默认使用

`FToolTip` 组件用于显示工具提示。可以通过 `content` 属性定义提示内容,`position`属性定义提示框位置。

<nsdemo filePath="tooltip/index.vue"/>

## 触发方式

组件默认触发方式为 `hover`，可以通过 `trigger` 属性设置触发方式为 `click`。

<nsdemo filePath="tooltip/trigger.vue"/>

## 样式定制

通过 `mode` 属性设置组件样式,默认为浅色模式,`mode`属性为`dark`时为黑色主题模式，`mode`属性为`light`时为浅色主题模式， `mode` 属性值为 `custom` 时，可以通过 `modeTextColor`、`modeBgColor` 属性设置自定义文本颜色和背景颜色。

<nsdemo filePath="tooltip/mode.vue"/>

::: tip
注意：`mode` 属性值为 `custom` 时，`modeTextColor`、`modeBgColor` 属性为若为空时，默认为浅色主题的文本颜色和背景颜色。
:::

## 自定义内容宽度

内容默认没有宽度，可以无限扩大，可以通过 `maxWidth` 属性设置组件内容显示的最大宽度。

<nsdemo filePath="tooltip/maxWidth.vue"/>

## Props

| 属性               | 说明                     | 类型     | 可选值                                   | 默认值 |
| :----------------: | :----------------------: | :------: | :--------------------------------------: | :----: |
| `content`         | 提示内容                 | `string` | 无                                       | 无     |
| `mode`            | 模式                     | `string` | `dark`、`light`、`custom`               | `light` |
| `modeTextColor`   | 自定义文本颜色           | `string` | 无                                       | `#000` |
| `modeBgColor`     | 自定义背景颜色           | `string` | 无                                       | `#fff` |
| `position`        | 提示框位置               | `string` | `top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end` | `left` |
| `trigger`         | 触发方式                 | `string` | `hover`、`click`                        | `hover` |
| `offset`          | 偏移量                   | `number` | 无                                       | `2`    |
| `zIndex`          | z-index                  | `number` | 无                                       | `1001` |
| `maxWidth`        | 最大宽度                 | `number` | 无                                       | `none`  |


