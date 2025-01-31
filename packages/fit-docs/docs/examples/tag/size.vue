<template>
    <div class="demoBox">
        <div class="row">
        <FTag label="555" type="success" size="mini"></FTag>
        <FTag label="555" type="success" size="small"></FTag>
        <FTag label="555" type="success" size="medium"></FTag>
        <FTag label="555" type="success" size="large"></FTag>
      </div>
    </div>
</template>

<script setup lang="ts">
import { FTag } from '@geniusmanyxh/fit-ui'
</script>

<style scoped lang="scss">
.demoBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;



    .row {
        width: 100%;
        // padding: 20px;
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
}
</style>