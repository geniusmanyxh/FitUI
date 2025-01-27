<template>
    <div class="tooltip-mode">
        <FToolTip :content="'默认主题'" position="top" mode="light">
            <FButton>默认主题</FButton>
        </FToolTip>

        <FToolTip :content="'黑色主题'" position="top" mode="dark">
            <FButton>黑色主题</FButton>
        </FToolTip>

        <FToolTip :content="'自定义蓝色主题'" position="top" mode="custom" modeTextColor="white"  modeBgColor="#409eff">
            <FButton type="primary">自定义蓝色主题</FButton>
        </FToolTip>

        <FToolTip :content="'自定义红色主题'" position="top" mode="custom" modeTextColor="#409eff" modeBgColor="red">
            <FButton type="danger">自定义蓝色主题</FButton>
        </FToolTip>
    </div>
</template>

<script setup lang="ts">
import { FButton, FToolTip } from '@geniusmanyxh/fit-ui';
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