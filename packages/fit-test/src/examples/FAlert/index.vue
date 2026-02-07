<template>
  <div>
    <custom-nav title="FAlert"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：不同类型 -->
      <div class="section">
        <h3>不同类型</h3>
        <div class="row">
          <FAlert type="success" title="成功提示">操作成功</FAlert>
          <FAlert type="warning" title="警告提示">警告信息</FAlert>
          <FAlert type="error" title="错误提示">错误信息</FAlert>
          <FAlert type="info" title="信息提示">提示信息</FAlert>
        </div>
      </div>

      <!-- 场景二：可关闭 -->
      <div class="section">
        <h3>可关闭</h3>
        <div class="row">
          <FAlert type="success" title="成功提示" closable>操作成功</FAlert>
          <FAlert type="warning" title="警告提示" closable>警告信息</FAlert>
        </div>
      </div>

      <!-- 场景三：带描述 -->
      <div class="section">
        <h3>带描述</h3>
        <div class="row">
          <FAlert type="success" title="成功提示" closable>
            <template #description>
              <p>操作已成功完成，请继续下一步。</p>
            </template>
          </FAlert>
          <FAlert type="error" title="错误提示" closable>
            <template #description>
              <p>操作失败，请检查输入信息后重试。</p>
            </template>
          </FAlert>
        </div>
      </div>

      <!-- 场景四：带图标 -->
      <div class="section">
        <h3>带图标</h3>
        <div class="row">
          <FAlert type="success" title="成功提示" show-icon>操作成功</FAlert>
          <FAlert type="warning" title="警告提示" show-icon>警告信息</FAlert>
          <FAlert type="error" title="错误提示" show-icon>错误信息</FAlert>
          <FAlert type="info" title="信息提示" show-icon>提示信息</FAlert>
        </div>
      </div>

      <!-- 场景五：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="row">
          <FAlert type="success" title="成功提示" show-icon closable>
            <template #description>
              <p>操作已成功完成，数据已保存。</p>
            </template>
          </FAlert>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FAlert-Demo", inheritAttrs: false })

</script>

<style scoped lang="scss">
.demoBox {
  .row {
    flex-direction: column;
    gap: 15px;
  }
  
  :deep(.f-alert) {
    width: 100%;
    max-width: 600px;
  }
}
</style>
