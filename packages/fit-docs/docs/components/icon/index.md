# FIcon 组件


## 正常使用

可以使用`icon`属性来定义图标, 图标颜色默认是灰色，如果需要改变颜色可以自定义样式来改变。
<sdemo filePath="icon/index.vue"></sdemo>

## 图标大小
可以使用`size`属性来定义图标大小
- `size`: 默认值是`medium`,可以选值是: `small`、`large`
- `size`的值也可以是数字, 它可以来设置图标的`font-size`以此来改变图标大小
- 当然你也可以自定义`css`样式的`font-size`以此来改变图标大小
<sdemo filePath="icon/icon_size.vue"></sdemo>


<script setup lang="ts">
  import iconList from '../../.vitepress/components/iconDemo/iconList.vue'
</script>

## 图标列表
点击对应图标即可复制该组件标签, 然后粘贴到你的项目中。
<iconList/>

## Props

| 属性 |是否必填| 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- | --- | 
| `icon` | 是 | 图标名称 | `string` | 无 | [详情查看图标列表](#图标列表) |
| `size` | 否 | 图标大小 | `string\|number` | `medium` | `small`、`medium`、`large`、数值 |