<template>
    <div class="demoBox">
        <div class="row">
        <FTag label="555" type="default" round></FTag>
        <FTag label="555" type="success" round></FTag>
        <FTag label="555" type="warning" round></FTag>
        <FTag label="555" type="info" round></FTag>
        <FTag label="555" type="primary" round></FTag>
        <FTag label="555" type="danger" round></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="default" mode="light" round></FTag>
        <FTag label="555" type="success" mode="light" round></FTag>
        <FTag label="555" type="warning" mode="light" round></FTag>
        <FTag label="555" type="info" mode="light" round></FTag>
        <FTag label="555" type="primary" mode="light" round></FTag>
        <FTag label="555" type="danger" mode="light" round></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="default" mode="plain" round></FTag>
        <FTag label="555" type="success" mode="plain" round></FTag>
        <FTag label="555" type="warning" mode="plain" round></FTag>
        <FTag label="555" type="info" mode="plain" round></FTag>
        <FTag label="555" type="primary" mode="plain" round></FTag>
        <FTag label="555" type="danger" mode="plain" round></FTag>
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