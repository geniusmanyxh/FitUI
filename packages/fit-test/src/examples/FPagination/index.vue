<template>
  <div>
    <custom-nav title="FPagination"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础分页 -->
      <div class="section">
        <h3>基础分页</h3>
        <div class="row">
          <FPagination v-model:current-page="currentPage" :total="100" />
        </div>
      </div>

      <!-- 场景二：完整分页 -->
      <div class="section">
        <h3>完整分页</h3>
        <div class="row">
          <FPagination v-model:current-page="currentPage" :total="100" show-size-changer show-quick-jumper />
        </div>
      </div>

      <!-- 场景三：简洁分页 -->
      <div class="section">
        <h3>简洁分页</h3>
        <div class="row">
          <FPagination v-model:current-page="currentPage" :total="100" simple />
        </div>
      </div>

      <!-- 场景四：页码跳转 -->
      <div class="section">
        <h3>页码跳转</h3>
        <div class="row">
          <FPagination v-model:current-page="currentPage" :total="100" show-quick-jumper />
        </div>
      </div>

      <!-- 场景五：每页条数切换 -->
      <div class="section">
        <h3>每页条数切换</h3>
        <div class="row">
          <FPagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="100" show-size-changer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FPagination-Demo", inheritAttrs: false })

import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
</script>

<style scoped lang="scss">
</style>
