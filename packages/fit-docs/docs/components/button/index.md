# FButton 组件

## 常用按钮

常用的按钮可以使用`type` 和 `plain` 来定义按钮。
- `type`属性可以选择:`primary、success、info、warning、danger`
- `plain`属性可以选择:`true、false`

<sdemo filePath="button/index.vue"/>

## round按钮

可以使用`round` 属性开启按钮的圆角。
- `round`属性可以选择：`true、false`
<sdemo filePath="button/round.vue"></sdemo>

## icon按钮
可以使用`icon`属性定义按钮图标
<sdemo filePath="button/button_icon.vue"></sdemo>

## 按钮尺寸
可以使用`size`属性定义按钮大小
- `size`属性可以选择：`small、medium、large` , 默认值是：`medium`
<sdemo filePath="button/button_size.vue"></sdemo>

## Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :--: | :--: | :--: | :--: |
| `type` | 按钮类型 | `string` | `primary、success、info、warning、danger` | 无 |
| `plain` | 是否朴素按钮 | `boolean` | `true、false` | `false` |
| `round` | 是否圆角按钮 | `boolean` | `true、false` | `false` |
| `icon` | 图标类名 | `string` | [详情查看图标列表](../icon/#图标列表) | 无 |
| `size` | 尺寸 | `string` | `small、medium、large` | `medium` |