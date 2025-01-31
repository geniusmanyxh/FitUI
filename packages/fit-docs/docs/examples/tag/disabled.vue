<template>
    <div class="demoBox">
      <div class="row">
        <FTag label="555" type="default" disabled closable></FTag>
        <FTag label="555" type="success" disabled closable></FTag>
        <FTag label="555" type="warning" disabled closable></FTag>
        <FTag label="555" type="info" disabled closable></FTag>
        <FTag label="555" type="primary" disabled closable></FTag>
        <FTag label="555" type="danger" disabled closable></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="default" mode="light" disabled closable></FTag>
        <FTag label="555" type="success" mode="light" disabled closable></FTag>
        <FTag label="555" type="warning" mode="light" disabled closable></FTag>
        <FTag label="555" type="info" mode="light" disabled closable></FTag>
        <FTag label="555" type="primary" mode="light" disabled closable></FTag>
        <FTag label="555" type="danger" mode="light" disabled closable></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="default" mode="plain" disabled closable></FTag>
        <FTag label="555" type="success" mode="plain" disabled closable></FTag>
        <FTag label="555" type="warning" mode="plain" disabled closable></FTag>
        <FTag label="555" type="info" mode="plain" disabled closable></FTag>
        <FTag label="555" type="primary" mode="plain" disabled closable></FTag>
        <FTag label="555" type="danger" mode="plain" disabled closable></FTag>
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