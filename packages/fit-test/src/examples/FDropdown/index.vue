<template>
  <div>
    <custom-nav title="FDropdown"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础下拉菜单 -->
      <div class="section">
        <h3>基础下拉菜单</h3>
        <div class="row">
          <FDropdown>
            <template #trigger>
              <FButton type="primary">下拉菜单</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
              <FDropdownItem>选项2</FDropdownItem>
              <FDropdownItem>选项3</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
        </div>
      </div>

      <!-- 场景二：触发方式 -->
      <div class="section">
        <h3>触发方式</h3>
        <div class="row">
          <FDropdown trigger="hover">
            <template #trigger>
              <FButton type="primary">hover 触发</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
              <FDropdownItem>选项2</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
          <FDropdown trigger="click">
            <template #trigger>
              <FButton type="primary">click 触发</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
              <FDropdownItem>选项2</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
        </div>
      </div>

      <!-- 场景三：菜单位置 -->
      <div class="section">
        <h3>菜单位置</h3>
        <div class="row">
          <FDropdown placement="top">
            <template #trigger>
              <FButton type="primary">顶部</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
          <FDropdown placement="bottom">
            <template #trigger>
              <FButton type="primary">底部</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
          <FDropdown placement="left">
            <template #trigger>
              <FButton type="primary">左侧</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
          <FDropdown placement="right">
            <template #trigger>
              <FButton type="primary">右侧</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
        </div>
      </div>

      <!-- 场景四：分割线 -->
      <div class="section">
        <h3>分割线</h3>
        <div class="row">
          <FDropdown>
            <template #trigger>
              <FButton type="primary">带分割线</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
              <FDropdownItem>选项2</FDropdownItem>
              <FDropdownItem divider></FDropdownItem>
              <FDropdownItem>选项3</FDropdownItem>
              <FDropdownItem>选项4</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
        </div>
      </div>

      <!-- 场景五：hover 触发 -->
      <div class="section">
        <h3>hover 触发</h3>
        <div class="row">
          <FDropdown trigger="hover">
            <template #trigger>
              <FButton type="primary">hover 触发</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
              <FDropdownItem>选项2</FDropdownItem>
              <FDropdownItem>选项3</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
        </div>
      </div>

      <!-- 场景六：分割按钮模式 -->
      <div class="section">
        <h3>分割按钮模式</h3>
        <div class="row">
          <FDropdown split-button>
            <template #trigger>
              <FButton type="primary">主要操作</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem>选项1</FDropdownItem>
              <FDropdownItem>选项2</FDropdownItem>
              <FDropdownItem>选项3</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
        </div>
      </div>

      <!-- 场景七：下拉项带命令 -->
      <div class="section">
        <h3>下拉项带命令</h3>
        <div class="row">
          <FDropdown @command="handleCommand">
            <template #trigger>
              <FButton type="primary">带命令的下拉菜单</FButton>
            </template>
            <FDropdownMenu>
              <FDropdownItem command="new">新建</FDropdownItem>
              <FDropdownItem command="open">打开</FDropdownItem>
              <FDropdownItem command="save">保存</FDropdownItem>
              <FDropdownItem divider></FDropdownItem>
              <FDropdownItem command="exit">退出</FDropdownItem>
            </FDropdownMenu>
          </FDropdown>
          <div style="margin-top: 10px;">选择的命令：{{ selectedCommand || '无' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FDropdown-Demo", inheritAttrs: false })

import { ref } from 'vue'
import { FDropdownItem, FDropdownMenu } from 'fit-ui/src/FDropdown'
import { FMessage } from 'fit-ui'

const selectedCommand = ref<string | number>('')

const handleCommand = (command: string | number) => {
  selectedCommand.value = command
  FMessage.success(`执行命令: ${command}`)
}
</script>

<style scoped lang="scss">
</style>
