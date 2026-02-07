<template>
  <div>
    <custom-nav title="FResult"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：不同类型 -->
      <div class="section">
        <h3>不同类型</h3>
        <div class="row">
          <FResult type="success" title="成功">
            <p>操作已成功完成</p>
          </FResult>
          <FResult type="error" title="错误">
            <p>操作失败，请重试</p>
          </FResult>
          <FResult type="warning" title="警告">
            <p>请注意操作风险</p>
          </FResult>
          <FResult type="info" title="信息">
            <p>请查看相关信息</p>
          </FResult>
        </div>
      </div>

      <!-- 场景二：自定义图标 -->
      <div class="section">
        <h3>自定义图标</h3>
        <div class="row">
          <FResult title="自定义图标">
            <template #icon>
              <FIcon icon="star" size="48" color="#faad14" />
            </template>
            <p>使用自定义图标</p>
          </FResult>
        </div>
      </div>

      <!-- 场景三：带操作按钮 -->
      <div class="section">
        <h3>带操作按钮</h3>
        <div class="row">
          <FResult type="success" title="操作成功">
            <p>您的操作已成功完成</p>
            <template #extra>
              <FButton type="primary">返回首页</FButton>
              <FButton type="default">查看详情</FButton>
            </template>
          </FResult>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FResult-Demo", inheritAttrs: false })

</script>

<style scoped lang="scss">
.demoBox {
  :deep(.f-result) {
    width: 100%;
    max-width: 400px;
  }
}
</style>
