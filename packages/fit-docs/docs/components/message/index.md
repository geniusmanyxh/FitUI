# FMessage 组件

## 默认使用

引入Hooks方法`useMessage`来创建一个实例，在调用上面的 `message` 方法
- `type`属性可以选择:`success、info、warning、error、default`,默认值为：`default`

<sdemo filePath="message/index.vue"/>

## 不同类型的消息提示

可以使用`message` 通过传递`type`属性来控制不同的消息类型。
也可以通过消息实例上面的方法：`success`、`warning`、`info`、`error`来控制消息类型
- `实例消息方法`：`message`、`success`、`warning`、`info`、`error`
<sdemo filePath="message/msgType.vue"></sdemo>

## 控制消息显示时长
可以使用`duration`属性控制消息显示时长,通常是设置毫秒数值(2000、3000等),如果设置为`0|notime`，则消息不会自动关闭,且会自动开启关闭图标。
<sdemo filePath="message/msgDuration.vue"></sdemo>

## 显示关闭按钮
可以使用`showClose`属性开启关闭图标，点击关闭图标，消息会自动关闭。
但是如果你设置`duration`属性为`0|notime`，则自动显示关闭图标。
- `showClose`属性可以选择：`true、false` , 默认值是：`false`
<sdemo filePath="message/msgShowClose.vue"></sdemo>

## Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :--: | :--: | :--: | :--: |
| `type` | 消息类型 | `string` | `success、info、warning、error、default` | `default` |
| `msg` | 消息内容 | `string` | 无 | `''` |
| `duration` | 消息时长 | `number\|\|'notime'` | `number、notime、0` | `2000` |
| `icon` | 图标类名 | `string` | [详情查看图标列表](../icon/#图标列表) | `circle-information` |
| `showClose` | 手动关闭图标 | `boolean` | `true、false` | `false` |
| `zIndex` | 控制元素层级 | `number` | `number` | `1000` |


## Events

| 名称 | 说明 | 类型 | 参数 | 返回值 |
| :--: | :--: | :--: | :--: | :--: |
| `onClose` | 消息关闭事件 | `Function` | `(type,msg,show(false),close(true))=>{}` | 无 |
| `onShow` | 消息显示事件 | `Function` |`(type,msg,show(true),close(false))=>{}` | 无 |