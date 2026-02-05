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
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FDropdown-Demo", inheritAttrs: false })

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
    align-items: center;
  }
}
</style>
