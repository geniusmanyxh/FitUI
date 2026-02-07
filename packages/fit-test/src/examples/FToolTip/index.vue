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

      <!-- 场景四：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FToolTip content="正常提示" :disabled="false">
            <FButton type="primary">正常提示</FButton>
          </FToolTip>
          <FToolTip content="禁用提示" :disabled="true">
            <FButton type="primary">禁用提示</FButton>
          </FToolTip>
        </div>
      </div>

      <!-- 场景五：延迟显示/隐藏 -->
      <div class="section">
        <h3>延迟显示/隐藏</h3>
        <div class="row">
          <FToolTip content="延迟 500ms 显示" :show-after="500">
            <FButton type="primary">延迟显示</FButton>
          </FToolTip>
          <FToolTip content="延迟 1000ms 隐藏" :hide-after="1000">
            <FButton type="primary">延迟隐藏</FButton>
          </FToolTip>
          <FToolTip content="延迟显示和隐藏" :show-after="500" :hide-after="1000">
            <FButton type="primary">延迟显示和隐藏</FButton>
          </FToolTip>
        </div>
      </div>

      <!-- 场景六：不同触发模式 -->
      <div class="section">
        <h3>不同触发模式</h3>
        <div class="row">
          <FToolTip content="hover 触发" trigger="hover">
            <FButton type="primary">hover 触发</FButton>
          </FToolTip>
          <FToolTip content="click 触发" trigger="click">
            <FButton type="primary">click 触发</FButton>
          </FToolTip>
          <FToolTip content="focus 触发" trigger="focus">
            <FButton type="primary">focus 触发</FButton>
          </FToolTip>
          <FToolTip content="manual 触发" trigger="manual" :visible="manualVisible">
            <div>
              <FButton type="primary" @click="manualVisible = !manualVisible">manual 触发</FButton>
            </div>
          </FToolTip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FToolTip-Demo", inheritAttrs: false })

import { ref } from 'vue'

const manualVisible = ref(false)
</script>

<style scoped lang="scss">
</style>
