<template>
    <div class="demoBox">
      <div class="row">
        <FTag label="555" type="default" closable></FTag>
        <FTag label="555" type="success" closable></FTag>
        <FTag label="555" type="warning" closable></FTag>
        <FTag label="555" type="info" closable></FTag>
        <FTag label="555" type="primary" closable></FTag>
        <FTag label="555" type="danger" closable></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="default" mode="light" closable></FTag>
        <FTag label="555" type="success" mode="light" closable></FTag>
        <FTag label="555" type="warning" mode="light" closable></FTag>
        <FTag label="555" type="info" mode="light" closable></FTag>
        <FTag label="555" type="primary" mode="light" closable></FTag>
        <FTag label="555" type="danger" mode="light" closable></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="default" mode="plain" closable></FTag>
        <FTag label="555" type="success" mode="plain" closable></FTag>
        <FTag label="555" type="warning" mode="plain" closable></FTag>
        <FTag label="555" type="info" mode="plain" closable></FTag>
        <FTag label="555" type="primary" mode="plain" closable></FTag>
        <FTag label="555" type="danger" mode="plain" closable></FTag>
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