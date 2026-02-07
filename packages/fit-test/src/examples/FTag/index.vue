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

      <!-- Hit 边框高亮 -->
      <div class="section">
        <h3>Hit 边框高亮</h3>
        <div class="row">
          <FTag label="Tag" type="default" hit></FTag>
          <FTag label="Tag" type="success" hit></FTag>
          <FTag label="Tag" type="warning" hit></FTag>
          <FTag label="Tag" type="info" hit></FTag>
          <FTag label="Tag" type="primary" hit></FTag>
          <FTag label="Tag" type="danger" hit></FTag>
        </div>
      </div>

      <!-- 自定义颜色 -->
      <div class="section">
        <h3>自定义颜色 (color prop)</h3>
        <div class="row">
          <FTag label="Custom" color="#f56c6c"></FTag>
          <FTag label="Custom" color="#e6a23c"></FTag>
          <FTag label="Custom" color="#409eff"></FTag>
          <FTag label="Custom" color="#67c23a"></FTag>
          <FTag label="Custom" color="#909399"></FTag>
        </div>
      </div>

      <!-- 圆角 -->
      <div class="section">
        <h3>圆角 (round)</h3>
        <div class="row">
          <FTag label="Tag" type="primary" round></FTag>
          <FTag label="Tag" type="success" round></FTag>
          <FTag label="Tag" type="warning" round></FTag>
          <FTag label="Tag" type="info" round></FTag>
          <FTag label="Tag" type="danger" round></FTag>
        </div>
        <div class="row">
          <FTag label="Tag" type="primary" mode="light" round></FTag>
          <FTag label="Tag" type="success" mode="light" round></FTag>
          <FTag label="Tag" type="warning" mode="light" round></FTag>
          <FTag label="Tag" type="info" mode="light" round></FTag>
          <FTag label="Tag" type="danger" mode="light" round></FTag>
        </div>
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
