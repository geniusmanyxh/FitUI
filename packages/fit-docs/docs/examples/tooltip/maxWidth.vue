<template>
    <div class="tooltip-mode">
        <FToolTip :content="testTxt" position="top" mode="dark" trigger="click">
            <FButton>无限制</FButton>
        </FToolTip>

        <FToolTip :content="testTxt" :maxWidth="200"  position="top" mode="dark" trigger="click">
            <FButton>200px</FButton>
        </FToolTip>

        <FToolTip :content="testTxt" :maxWidth="300"  position="top" mode="dark" trigger="click">
            <FButton>300px</FButton>
        </FToolTip>

        <FToolTip :content="testTxt" :maxWidth="500" position="top" trigger="click" mode="custom" modeTextColor="white"  modeBgColor="#409eff">
            <FButton type="primary">500px</FButton>
        </FToolTip>
    </div>
</template>

<script setup lang="ts">
import { FButton, FToolTip } from '@geniusmanyxh/fit-ui';

const testTxt = '通过 `maxWidth` 属性设置组件内容显示的最大宽度。通过 `maxWidth` 属性设置组件内容显示的最大宽度。通过 `maxWidth` 属性设置组件内容显示的最大宽度。'
</script>

<style scoped lang="scss">
.tooltip-mode{
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap:20px;
}
</style>