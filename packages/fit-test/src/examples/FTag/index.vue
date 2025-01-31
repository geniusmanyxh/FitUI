<template>
  <div>
    <custom-nav title="FTag"></custom-nav>
    <div class="demoBox">
      <div class="row">
        <FTag label="555" type="success"></FTag>
        <FTag label="555" type="warning"></FTag>
        <FTag label="555" type="info"></FTag>
        <FTag label="555" type="primary"></FTag>
        <FTag label="555" type="secondary"></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="success" size="small"></FTag>
        <FTag label="555" type="success" size="medium"></FTag>
        <FTag label="555" type="success" size="large"></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="success" closable></FTag>
        <FTag label="555" type="warning" closable></FTag>
        <FTag label="555" type="info" closable></FTag>
        <FTag label="555" type="primary" closable></FTag>
        <FTag label="555" type="secondary" closable></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="success" disabled></FTag>
        <FTag label="555" type="warning" disabled></FTag>
        <FTag label="555" type="info" disabled></FTag>
        <FTag label="555" type="primary" disabled></FTag>
        <FTag label="555" type="secondary" disabled></FTag>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FTag-Demo', inheritAttrs: false })

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
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
}
</style>