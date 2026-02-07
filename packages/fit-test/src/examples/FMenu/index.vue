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

      <!-- 场景五：唯一子菜单展开 -->
      <div class="section">
        <h3>唯一子菜单展开</h3>
        <div class="row">
          <FMenu :items="menuItems" :default-active="currentMenu2" unique-opened mode="vertical" style="width: 200px;" @select="handleMenuSelect2" />
        </div>
      </div>

      <!-- 场景六：自定义颜色 -->
      <div class="section">
        <h3>自定义颜色</h3>
        <div class="row">
          <FMenu 
            :items="menuItems" 
            :default-active="currentMenu3" 
            mode="vertical" 
            background-color="#545c64" 
            text-color="#fff" 
            active-text-color="#ffd04b"
            style="width: 200px;"
            @select="handleMenuSelect3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FMenu-Demo", inheritAttrs: false })

import { ref } from 'vue'

const currentMenu = ref('1')
const currentMenu2 = ref('1')
const currentMenu3 = ref('1')

const menuItems = [
  {
    key: '1',
    label: '菜单项1'
  },
  {
    key: '2',
    label: '子菜单',
    children: [
      { key: '2-1', label: '子菜单项1' },
      { key: '2-2', label: '子菜单项2' },
      { key: '2-3', label: '子菜单项3' }
    ]
  },
  {
    key: '3',
    label: '菜单项3'
  },
  {
    key: '4',
    label: '另一个子菜单',
    children: [
      { key: '4-1', label: '子菜单项A' },
      { key: '4-2', label: '子菜单项B' }
    ]
  }
]

const handleMenuSelect2 = (key: string) => {
  currentMenu2.value = key
}

const handleMenuSelect3 = (key: string) => {
  currentMenu3.value = key
}
</script>

<style scoped lang="scss">
.demoBox {
  .row {
    align-items: flex-start;
  }
}
</style>
