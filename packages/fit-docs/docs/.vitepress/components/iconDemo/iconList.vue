<template>
  <div class="show-components">
    <div class="showIcon" v-for="icon in iconAllList" :key="icon" @click="handleClick(icon)">
      <FIcon :icon="(icon as any)" size="medium"></FIcon>
      <span>{{ icon }}</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { FIcon } from '@geniusmanyxh/fit-ui'
import { iconAllList } from './iconAllList'
import * as clipboard from "clipboard-polyfill";

const handleClick = async (icon: string) => {
  try {
    const copyText = `<f-icon icon="${icon}"></f-icon>`
    await clipboard.writeText(copyText);
    console.log(copyText)
    alert('复制成功!'+ copyText)
  } catch (error) {
    alert('复制失败!')
  }
 
  
}
</script>

<style scoped lang="scss">
.showIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  min-width: 120px;
  margin: 10px 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(200, 194, 194, .1);
  box-sizing: border-box;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(200, 194, 194, .2);
    color: rgba(23, 206, 66, 0.818);
  }
  span {
    font-size: 12px;
  }
}
</style>