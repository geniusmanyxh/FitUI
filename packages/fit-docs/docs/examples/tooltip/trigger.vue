<template>
    <div class="tooltip-trigger">
        <FToolTip content="默认触发方式:hover" position="top">
            <FButton>hover</FButton>
        </FToolTip>
        <FToolTip content="触发方式:click" position="bottom" trigger="click">
            <FButton>click</FButton>
        </FToolTip>
    </div>
</template>

<script setup lang="ts">
import { FButton, FToolTip } from '@geniusmanyxh/fit-ui';
</script>

<style scoped lang="scss">
.tooltip-trigger{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;
    padding: 20px;
}
</style>