<template>
  <div>
    <custom-nav title="FDropdown"></custom-nav>
    <div class="demoBox">
      <!-- 基础用法 -->
      <div class="section">
        <h3>基础用法</h3>
        <div class="row">
          <FDropdown trigger="hover">
            <template #trigger>
              <FButton type="primary">下拉菜单</FButton>
            </template>
            <FDropdownItem command="a">选项1</FDropdownItem>
            <FDropdownItem command="b">选项2</FDropdownItem>
            <FDropdownItem command="c">选项3</FDropdownItem>
          </FDropdown>
        </div>
      </div>

      <!-- 点击触发 -->
      <div class="section">
        <h3>点击触发</h3>
        <div class="row">
          <FDropdown trigger="click">
            <template #trigger>
              <FButton type="primary">点击触发</FButton>
            </template>
            <FDropdownItem command="a">选项1</FDropdownItem>
            <FDropdownItem command="b">选项2</FDropdownItem>
            <FDropdownItem command="c">选项3</FDropdownItem>
          </FDropdown>
        </div>
      </div>

      <!-- 右键触发 -->
      <div class="section">
        <h3>右键触发</h3>
        <div class="row">
          <FDropdown trigger="contextmenu">
            <template #trigger>
              <FButton type="primary">右键点击我</FButton>
            </template>
            <FDropdownItem command="a">选项1</FDropdownItem>
            <FDropdownItem command="b">选项2</FDropdownItem>
            <FDropdownItem command="c">选项3</FDropdownItem>
          </FDropdown>
        </div>
      </div>

      <!-- 分割按钮 -->
      <div class="section">
        <h3>分割按钮</h3>
        <div class="row">
          <FDropdown split-button trigger="click">
            <template #trigger>
              <FButton type="primary">主要操作</FButton>
            </template>
            <FDropdownItem command="a">选项1</FDropdownItem>
            <FDropdownItem command="b">选项2</FDropdownItem>
            <FDropdownItem command="c">选项3</FDropdownItem>
          </FDropdown>
        </div>
      </div>

      <!-- 禁用项与分割线 -->
      <div class="section">
        <h3>禁用项与分割线</h3>
        <div class="row">
          <FDropdown trigger="hover">
            <template #trigger>
              <FButton type="primary">下拉菜单</FButton>
            </template>
            <FDropdownItem command="a">选项1</FDropdownItem>
            <FDropdownItem command="b" disabled>禁用选项</FDropdownItem>
            <FDropdownItem command="c" divided>分割线后的选项</FDropdownItem>
            <FDropdownItem command="d">选项4</FDropdownItem>
          </FDropdown>
        </div>
      </div>

      <!-- 点击隐藏 -->
      <div class="section">
        <h3>点击隐藏</h3>
        <div class="row" style="flex-direction: column; gap: 12px;">
          <div>
            <div style="margin-bottom: 8px;">hide-on-click="true" (默认)</div>
            <FDropdown trigger="click" :hide-on-click="true">
              <template #trigger>
                <FButton type="primary">点击后隐藏</FButton>
              </template>
              <FDropdownItem command="a">选项1</FDropdownItem>
              <FDropdownItem command="b">选项2</FDropdownItem>
            </FDropdown>
          </div>
          <div>
            <div style="margin-bottom: 8px;">hide-on-click="false"</div>
            <FDropdown trigger="click" :hide-on-click="false">
              <template #trigger>
                <FButton type="primary">点击后不隐藏</FButton>
              </template>
              <FDropdownItem command="a">选项1</FDropdownItem>
              <FDropdownItem command="b">选项2</FDropdownItem>
            </FDropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FDropdown-Demo", inheritAttrs: false })
</script>

<style scoped lang="scss">
.demoBox {
  .row {
    align-items: flex-start;
  }
}
</style>
