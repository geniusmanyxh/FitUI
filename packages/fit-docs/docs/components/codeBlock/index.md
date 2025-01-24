# FCodeBlock 组件

## 默认使用

可以使用`title`、`code`、`lang`、`showCode` 和 `theme` 属性来定义代码块组件。
- `title`属性定义代码块的标题。
- `code`属性定义要显示的代码。
- `lang`属性可以选择：`js、html、ts、css`，默认值是：`js`。
- `showCode`属性可以选择：`true、false`，控制代码是否显示。
- `theme`属性可以选择：`light、dark`，默认值是：`light`。

<nsdemo lang='ts' filePath="codeBlock/index.vue"/>

## Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :--: | :--: | :--: | :--: |
| `title` | 代码块标题 | `string` | 无 | `代码示例` |
| `code` | 显示的代码 | `string` | 无 | 无 |
| `lang` | 代码语言 | `string` | `js、html、ts、css` | `js` |
| `showCode` | 是否显示代码 | `boolean` | `true、false` | `false` |
| `theme` | 主题 | `string` | `light、dark` | `light` |
