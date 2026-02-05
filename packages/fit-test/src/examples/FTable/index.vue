<template>
  <div>
    <custom-nav title="FTable"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础表格 -->
      <div class="section">
        <h3>基础表格</h3>
        <div class="row">
          <FTable :columns="columns" :data="tableData" />
        </div>
      </div>

      <!-- 场景二：斑马纹 -->
      <div class="section">
        <h3>斑马纹</h3>
        <div class="row">
          <FTable :columns="columns" :data="tableData" stripe />
        </div>
      </div>

      <!-- 场景三：边框表格 -->
      <div class="section">
        <h3>边框表格</h3>
        <div class="row">
          <FTable :columns="columns" :data="tableData" border />
        </div>
      </div>

      <!-- 场景四：固定表头 -->
      <div class="section">
        <h3>固定表头</h3>
        <div class="row">
          <FTable :columns="columns" :data="tableData" height="300px" />
        </div>
      </div>

      <!-- 场景五：排序 -->
      <div class="section">
        <h3>排序</h3>
        <div class="row">
          <FTable :columns="sortableColumns" :data="tableData" />
        </div>
      </div>

      <!-- 场景六：多选 -->
      <div class="section">
        <h3>多选</h3>
        <div class="row">
          <FTable :columns="columnsWithSelection" :data="tableData" @selection-change="handleSelectionChange" />
          <div style="margin-top: 10px;">选中项：{{ selectedRows.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FTable-Demo", inheritAttrs: false })

import { ref } from 'vue'

const tableData = [
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 30, address: '深圳市南山区' },
  { id: 5, name: '钱七', age: 26, address: '杭州市西湖区' }
]

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' }
]

const sortableColumns = [
  { title: 'ID', dataIndex: 'id', sorter: true },
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age', sorter: true },
  { title: '地址', dataIndex: 'address' }
]

const columnsWithSelection = [
  { type: 'selection' },
  ...columns
]

const selectedRows = ref([])

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}
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
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    align-items: flex-start;
  }
  
  :deep(.f-table) {
    width: 100%;
    max-width: 800px;
  }
}
</style>
