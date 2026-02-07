<template>
  <div>
    <custom-nav title="FTag"></custom-nav>
    <div class="demoBox">
      <div class="row">
        <FTag label="555" type="default"></FTag>
        <FTag label="555" type="success"></FTag>
        <FTag label="555" type="warning"></FTag>
        <FTag label="555" type="info"></FTag>
        <FTag label="555" type="primary"></FTag>
        <FTag label="555" type="danger"></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="default" mode="light"></FTag>
        <FTag label="555" type="success" mode="light"></FTag>
        <FTag label="555" type="warning" mode="light"></FTag>
        <FTag label="555" type="info" mode="light"></FTag>
        <FTag label="555" type="primary" mode="light"></FTag>
        <FTag label="555" type="danger" mode="light"></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="default" mode="plain"></FTag>
        <FTag label="555" type="success" mode="plain"></FTag>
        <FTag label="555" type="warning" mode="plain"></FTag>
        <FTag label="555" type="info" mode="plain"></FTag>
        <FTag label="555" type="primary" mode="plain"></FTag>
        <FTag label="555" type="danger" mode="plain"></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="success" size="mini"></FTag>
        <FTag label="555" type="success" size="small"></FTag>
        <FTag label="555" type="success" size="medium"></FTag>
        <FTag label="555" type="success" size="large"></FTag>
      </div>

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

  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FTag-Demo', inheritAttrs: false })

</script>

<style scoped lang="scss">
.demoBox {
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .row {
    width: 100%;
    flex-direction: row;
  }
}
</style>