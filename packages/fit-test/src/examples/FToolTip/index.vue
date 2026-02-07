<template>
  <div>
    <custom-nav title="FToolTip"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：不同位置 -->
      <div class="section">
        <h3>不同位置</h3>
        <div class="row">
          <FToolTip content="顶部提示" placement="top">
            <FButton type="primary">顶部</FButton>
          </FToolTip>
          <FToolTip content="底部提示" placement="bottom">
            <FButton type="primary">底部</FButton>
          </FToolTip>
          <FToolTip content="左侧提示" placement="left">
            <FButton type="primary">左侧</FButton>
          </FToolTip>
          <FToolTip content="右侧提示" placement="right">
            <FButton type="primary">右侧</FButton>
          </FToolTip>
        </div>
      </div>

      <!-- 场景二：触发方式 -->
      <div class="section">
        <h3>触发方式</h3>
        <div class="row">
          <FToolTip content="hover 触发" trigger="hover">
            <FButton type="primary">hover 触发</FButton>
          </FToolTip>
          <FToolTip content="click 触发" trigger="click">
            <FButton type="primary">click 触发</FButton>
          </FToolTip>
        </div>
      </div>

      <!-- 场景三：自定义内容 -->
      <div class="section">
        <h3>自定义内容</h3>
        <div class="row">
          <FToolTip>
            <template #content>
              <div>
                <p>多行提示</p>
                <p>第二行内容</p>
              </div>
            </template>
            <FButton type="primary">自定义内容</FButton>
          </FToolTip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FToolTip-Demo", inheritAttrs: false })

</script>

<style scoped lang="scss">
</style>
