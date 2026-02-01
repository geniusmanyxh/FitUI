<template>
  <div class="f-table" :class="tableClass" :style="tableStyle">
    <div v-if="showHeader !== false" class="f-table__header-wrapper">
      <table class="f-table__header">
        <colgroup>
          <col
            v-for="column in columns"
            :key="column.key"
            :style="getColumnStyle(column)"
          />
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="getHeaderClass(column)"
              :style="getColumnStyle(column)"
              @click="handleHeaderClick(column, $event)"
            >
              <div class="f-table__cell">
                <slot name="header" :column="column">
                  {{ column.label }}
                </slot>
                <span
                  v-if="column.sortable"
                  class="f-table__sort-icon"
                  :class="getSortClass(column.key)"
                >
                  <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                    <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm32-512h352a32 32 0 0 0 1 0 64H544a32 32 0 0 0 1 0-64zm0 128h352a32 32 0 0 0 1 0 64H544a32 32 0 0 0 1 0-64z"></path>
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    
    <div class="f-table__body-wrapper" ref="bodyWrapperRef">
      <table class="f-table__body">
        <colgroup>
          <col
            v-for="column in columns"
            :key="column.key"
            :style="getColumnStyle(column)"
          />
        </colgroup>
        <tbody>
          <tr
            v-for="(row, index) in displayData"
            :key="getRowKey(row, index)"
            :class="getRowClass(row, index)"
            @click="handleRowClick(row, index, $event)"
            @dblclick="handleRowDblClick(row, index, $event)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="getCellClass(row, column)"
              @contextmenu="handleRowContextMenu(row, column, $event)"
              @click="handleCellClick(row, column, row[column.key], $event)"
            >
              <div class="f-table__cell" :class="getCellAlignClass(column)">
                <slot name="cell" :row="row" :column="column" :index="index">
                  {{ row[column.key] }}
                </slot>
              </div>
            </td>
          </tr>
          <tr v-if="displayData.length === 0" class="f-table__empty-row">
            <td :colspan="columns.length" class="f-table__empty">
              <slot name="empty">
                {{ emptyText }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { TableProps, TableEmits, TableColumn } from './Table'
import type { TableSizeType } from './Table'

defineOptions({ name: 'FTable', inheritAttrs: false })

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  columns: () => [],
  size: 'medium',
  stripe: false,
  border: false,
  highlightCurrentRow: false,
  showHeader: true,
  rowKey: 'id',
  emptyText: '暂无数据',
  fit: false,
  lazy: false
})

const emit = defineEmits<TableEmits>()

const bodyWrapperRef = ref<HTMLElement>()
const currentSort = ref<{ prop: string; order: 'ascending' | 'descending' } | null>(null)
const currentRow = ref<Record<string, any> | null>(null)

const tableClass = computed(() => {
  return [
    `f-table--${props.size}`,
    {
      'f-table--stripe': props.stripe,
      'f-table--border': props.border,
      'f-table--fit': props.fit
    }
  ]
})

const tableStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }
  return style
})

const displayData = computed(() => {
  let data = [...props.data]
  
  if (currentSort.value) {
    const { prop, order } = currentSort.value
    data.sort((a, b) => {
      const aVal = a[prop]
      const bVal = b[prop]
      
      if (aVal === bVal) return 0
      
      if (order === 'ascending') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }
  
  return data
})

function getColumnStyle(column: TableColumn) {
  const style: Record<string, string> = {}
  
  if (column.width) {
    style.width = typeof column.width === 'number' ? `${column.width}px` : column.width
  }
  
  if (column.minWidth) {
    style.minWidth = typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth
  }
  
  return style
}

function getHeaderClass(column: TableColumn) {
  const classes: string[] = ['f-table__header-cell']
  
  if (column.headerClassName) {
    classes.push(column.headerClassName)
  }
  
  if (column.align) {
    classes.push(`f-table__cell--${column.align}`)
  }
  
  if (column.sortable) {
    classes.push('f-table__header-cell--sortable')
  }
  
  return classes
}

function getRowClass(row: Record<string, any>, index: number) {
  const classes: string[] = ['f-table__row']
  
  if (props.stripe && index % 2 === 1) {
    classes.push('f-table__row--striped')
  }
  
  if (props.highlightCurrentRow && currentRow.value === row) {
    classes.push('f-table__row--current')
  }
  
  return classes
}

function getCellClass(row: Record<string, any>, column: TableColumn) {
  const classes: string[] = []
  
  if (column.cellClassName) {
    classes.push(column.cellClassName)
  }
  
  return classes
}

function getCellAlignClass(column: TableColumn) {
  if (column.align) {
    return `f-table__cell--${column.align}`
  }
  return ''
}

function getSortClass(prop: string) {
  if (!currentSort.value || currentSort.value.prop !== prop) {
    return ''
  }
  return currentSort.value.order === 'ascending' ? 'f-table__sort-icon--asc' : 'f-table__sort-icon--desc'
}

function getRowKey(row: Record<string, any>, index: number) {
  return row[props.rowKey] ?? index
}

function handleHeaderClick(column: TableColumn, event: MouseEvent) {
  emit('header-click', column, event)
  
  if (!column.sortable) return
  
  if (currentSort.value && currentSort.value.prop === column.key) {
    if (currentSort.value.order === 'ascending') {
      currentSort.value = { prop: column.key, order: 'descending' }
    } else {
      currentSort.value = null
    }
  } else {
    currentSort.value = { prop: column.key, order: 'ascending' }
  }
  
  if (currentSort.value) {
    emit('sort', currentSort.value.prop, currentSort.value.order)
  }
}

function handleRowClick(row: Record<string, any>, index: number, event: MouseEvent) {
  currentRow.value = row
  emit('row-click', row, index)
}

function handleRowDblClick(row: Record<string, any>, index: number, event: MouseEvent) {
  emit('row-dblclick', row, index)
}

function handleRowContextMenu(row: Record<string, any>, column: TableColumn, event: MouseEvent) {
  emit('row-contextmenu', row, column, event)
}

function handleCellClick(row: Record<string, any>, column: TableColumn, cell: any, event: MouseEvent) {
  emit('cell-click', row, column, cell, event)
}

watch(() => props.defaultSort, (newVal) => {
  if (newVal) {
    currentSort.value = newVal
  }
}, { immediate: true })

defineExpose({
  sort: (prop: string, order: 'ascending' | 'descending') => {
    currentSort.value = { prop, order }
  },
  clearSort: () => {
    currentSort.value = null
  }
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
