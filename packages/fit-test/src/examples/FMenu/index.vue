<template>
  <div>
    <custom-nav title="FMenu"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：垂直菜单 -->
      <div class="section">
        <h3>垂直菜单</h3>
        <div class="row">
          <FMenu v-model:current="currentMenu" mode="vertical" style="width: 200px;">
            <FMenuItem key="1">菜单项1</FMenuItem>
            <FMenuItem key="2">菜单项2</FMenuItem>
            <FMenuItem key="3">菜单项3</FMenuItem>
          </FMenu>
        </div>
      </div>

      <!-- 场景二：水平菜单 -->
      <div class="section">
        <h3>水平菜单</h3>
        <div class="row">
          <FMenu v-model:current="currentMenu" mode="horizontal">
            <FMenuItem key="1">菜单项1</FMenuItem>
            <FMenuItem key="2">菜单项2</FMenuItem>
            <FMenuItem key="3">菜单项3</FMenuItem>
          </FMenu>
        </div>
      </div>

      <!-- 场景三：子菜单 -->
      <div class="section">
        <h3>子菜单</h3>
        <div class="row">
          <FMenu v-model:current="currentMenu" mode="vertical" style="width: 200px;">
            <FMenuItem key="1">菜单项1</FMenuItem>
            <FSubMenu key="2" title="子菜单">
              <FMenuItem key="2-1">子菜单项1</FMenuItem>
              <FMenuItem key="2-2">子菜单项2</FMenuItem>
              <FMenuItem key="2-3">子菜单项3</FMenuItem>
            </FSubMenu>
            <FMenuItem key="3">菜单项3</FMenuItem>
          </FMenu>
        </div>
      </div>

      <!-- 场景四：菜单分组 -->
      <div class="section">
        <h3>菜单分组</h3>
        <div class="row">
          <FMenu v-model:current="currentMenu" mode="vertical" style="width: 200px;">
            <FMenuGroup title="分组1">
              <FMenuItem key="1">菜单项1</FMenuItem>
              <FMenuItem key="2">菜单项2</FMenuItem>
            </FMenuGroup>
            <FMenuGroup title="分组2">
              <FMenuItem key="3">菜单项3</FMenuItem>
              <FMenuItem key="4">菜单项4</FMenuItem>
            </FMenuGroup>
          </FMenu>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FMenu-Demo", inheritAttrs: false })

import { ref } from 'vue'

const currentMenu = ref('1')
</script>

<style scoped lang="scss">
.demoBox {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  .section {
    width: 100%;
    
    h3 {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    align-items: flex-start;
  }
}
</style>
