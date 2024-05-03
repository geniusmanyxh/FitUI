# 快速上手

## 使用npm安装

在现有Vue3项目中使用 FitUI 时，可以通过 npm 进行安装：

```sh
  # 使用npm安装
  npm i @geniusmanyxh/fit-ui
```

当然你也可以使用`yarn` 或者 `pnpm` 进行安装

```sh
  # 使用yarn安装
  yarn add @geniusmanyxh/fit-ui

  # 使用npm安装
  pnpm add @geniusmanyxh/fit-ui
```

## 引入组件

```js
import { createApp } from 'vue';
// 1. 引入你需要的组件
import { FButton } from '@geniusmanyxh/fit-ui';
// 2. 引入组件样式
import '@geniusmanyxh/fit-ui/dist/es/css/style.css';

const app = createApp();

// 3. 注册你需要的组件
app.use(FButton);
```

## `<script setup>`

```html
<template>
  <div>
    <FButton type="success" icon="apple"  size="large" plain>Primary</FButton>
  </div>
</template>

<script setup lang="ts">
import {FButton,FIcon} from '@geniusmanyxh/fit-ui'
</script>
```