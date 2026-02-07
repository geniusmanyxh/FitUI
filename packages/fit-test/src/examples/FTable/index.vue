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

      <!-- 场景七：选择列（带复选框） -->
      <div class="section">
        <h3>选择列（带复选框）</h3>
        <div class="row">
          <FTable :columns="columnsWithSelection" :data="tableData" @selection-change="handleSelectionChange" />
          <div style="margin-top: 10px;">已选择 {{ selectedRows.length }} 项</div>
        </div>
      </div>

      <!-- 场景八：索引列 -->
      <div class="section">
        <h3>索引列</h3>
        <div class="row">
          <FTable :columns="columnsWithIndex" :data="tableData" />
        </div>
      </div>

      <!-- 场景九：显示合计行 -->
      <div class="section">
        <h3>显示合计行</h3>
        <div class="row">
          <FTable 
            :columns="columnsWithSummary" 
            :data="tableData" 
            :show-summary="true"
            :summary-method="getSummaries"
          />
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
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' }
]

const sortableColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', sorter: true },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age', sorter: true },
  { title: '地址', dataIndex: 'address', key: 'address' }
]

const columnsWithSelection = [
  { type: 'selection', key: 'selection' },
  ...columns
]

const columnsWithIndex = [
  { type: 'index', title: '序号', key: 'index' },
  ...columns
]

const columnsWithSummary = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' }
]

const selectedRows = ref([])

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const getSummaries = ({ columns, data }: { columns: any[], data: any[] }) => {
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (column.key === 'age') {
      const values = data.map(item => Number(item[column.key]))
      if (!values.every(value => isNaN(value))) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)} 岁`
      } else {
        sums[index] = ''
      }
    } else {
      sums[index] = ''
    }
  })
  return sums
}
</script>

<style scoped lang="scss">
.demoBox {
  .row {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  :deep(.f-table) {
    width: 100%;
    max-width: 800px;
  }
}
</style>
