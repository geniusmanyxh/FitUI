<template>
  <div>
    <custom-nav title="FBadge"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础类型 -->
      <div class="section">
        <h3>基础类型</h3>
        <div class="row">
          <FBadge type="primary" value="5">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge type="success" value="10">
            <div class="badge-demo-item">通知</div>
          </FBadge>
          <FBadge type="warning" value="15">
            <div class="badge-demo-item">警告</div>
          </FBadge>
          <FBadge type="danger" value="20">
            <div class="badge-demo-item">错误</div>
          </FBadge>
          <FBadge type="info" value="25">
            <div class="badge-demo-item">信息</div>
          </FBadge>
        </div>
      </div>

      <!-- 场景二：数值显示 -->
      <div class="section">
        <h3>数值显示</h3>
        <div class="row">
          <FBadge value="0">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="1">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="99">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="100">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="999">
            <div class="badge-demo-item">消息</div>
          </FBadge>
        </div>
      </div>

      <!-- 场景三：最大值设置 -->
      <div class="section">
        <h3>最大值设置</h3>
        <div class="row">
          <FBadge value="5" max="10">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="15" max="10">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="99" max="99">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="100" max="99">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="999" max="99">
            <div class="badge-demo-item">消息</div>
          </FBadge>
        </div>
      </div>

      <!-- 场景四：小红点模式 -->
      <div class="section">
        <h3>小红点模式</h3>
        <div class="row">
          <FBadge is-dot>
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge type="primary" is-dot>
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge type="success" is-dot>
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge type="warning" is-dot>
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge type="danger" is-dot>
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge type="info" is-dot>
            <div class="badge-demo-item">消息</div>
          </FBadge>
        </div>
      </div>

      <!-- 场景五：隐藏状态 -->
      <div class="section">
        <h3>隐藏状态</h3>
        <div class="row">
          <FBadge value="5" hidden>
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="10">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge is-dot hidden>
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge is-dot>
            <div class="badge-demo-item">消息</div>
          </FBadge>
        </div>
      </div>

      <!-- 场景六：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="row">
          <FBadge value="5">
            <FButton type="primary">消息</FButton>
          </FBadge>
          <FBadge value="10" type="danger">
            <FIcon icon="bell" size="20" />
          </FBadge>
          <FBadge is-dot type="warning">
            <FIcon icon="mail" size="20" />
          </FBadge>
        </div>
      </div>

      <!-- 显示零值 -->
      <div class="section">
        <h3>显示零值 (showZero)</h3>
        <div class="row">
          <FBadge :value="0">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge :value="0" show-zero>
            <div class="badge-demo-item">消息</div>
          </FBadge>
        </div>
      </div>

      <!-- 偏移量 -->
      <div class="section">
        <h3>偏移量 (offset)</h3>
        <div class="row">
          <FBadge value="5">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="5" :offset="[10, 10]">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="5" :offset="[20, -10]">
            <div class="badge-demo-item">消息</div>
          </FBadge>
        </div>
      </div>

      <!-- 自定义颜色 -->
      <div class="section">
        <h3>自定义颜色 (color)</h3>
        <div class="row">
          <FBadge value="5" color="#f56c6c">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="8" color="#e6a23c">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge value="12" color="#409eff">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge is-dot color="#67c23a">
            <div class="badge-demo-item">消息</div>
          </FBadge>
          <FBadge is-dot color="#909399">
            <div class="badge-demo-item">消息</div>
          </FBadge>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FBadge-Demo", inheritAttrs: false })

</script>

<style scoped lang="scss">
.demoBox {
  .badge-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .badge-demo-item {
    // padding: 8px 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
    display: inline-block;
  }
}
</style>
