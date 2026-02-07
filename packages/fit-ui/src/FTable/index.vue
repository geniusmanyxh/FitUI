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
              v-for="(column, colIndex) in columns"
              :key="column.key"
              :class="getHeaderClass(column)"
              :style="getColumnStyle(column)"
              @click="handleHeaderClick(column, $event)"
            >
              <div class="f-table__cell">
                <template v-if="column.type === 'selection'">
                  <FCheckbox
                    :model-value="isAllSelected"
                    :indeterminate="isIndeterminate"
                    @update:model-value="handleSelectAll"
                  />
                </template>
                <template v-else-if="column.type === 'index'">
                  <slot name="header" :column="column">
                    {{ column.label }}
                  </slot>
                </template>
                <template v-else>
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
                </template>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    
    <div class="f-table__body-wrapper" ref="bodyWrapperRef" :style="bodyWrapperStyle">
      <table class="f-table__body">
        <colgroup>
          <col
            v-for="column in columns"
            :key="column.key"
            :style="getColumnStyle(column)"
          />
        </colgroup>
        <tbody>
          <template v-for="(row, index) in displayData" :key="getRowKey(row, index)">
            <tr
              :class="getRowClass(row, index)"
              :style="getRowStyle(row, index)"
              @click="handleRowClick(row, index, $event)"
              @dblclick="handleRowDblClick(row, index, $event)"
            >
              <template v-for="(column, colIndex) in columns" :key="column.key">
                <td
                  v-if="!getSpanHidden(row, column, index, colIndex)"
                  :class="getCellClass(row, column, index, colIndex)"
                  :rowspan="getSpanRowspan(row, column, index, colIndex)"
                  :colspan="getSpanColspan(row, column, index, colIndex)"
                  :style="getCellStyle(row, column)"
                  @contextmenu="handleRowContextMenu(row, column, $event)"
                  @click="handleCellClick(row, column, row[column.key], $event)"
                >
                  <div class="f-table__cell" :class="getCellAlignClass(column)">
                    <template v-if="column.type === 'selection'">
                      <FCheckbox
                        :model-value="isRowSelected(row, index)"
                        :disabled="!isRowSelectable(row, index)"
                        @update:model-value="(val) => handleRowSelection(row, index, val)"
                      />
                    </template>
                    <template v-else-if="column.type === 'index'">
                      <slot name="cell" :row="row" :column="column" :index="index">
                        {{ getIndexValue(index) }}
                      </slot>
                    </template>
                    <template v-else>
                      <slot name="cell" :row="row" :column="column" :index="index">
                        {{ row[column.key] }}
                      </slot>
                    </template>
                  </div>
                </td>
              </template>
            </tr>
          </template>
          <tr v-if="displayData.length === 0" class="f-table__empty-row">
            <td :colspan="columns.length" class="f-table__empty">
              <slot name="empty">
                {{ emptyText }}
              </slot>
            </td>
          </tr>
          <tr v-if="showSummary && displayData.length > 0" class="f-table__summary-row">
            <td
              v-for="(column, colIndex) in columns"
              :key="column.key"
              :class="getSummaryCellClass(column)"
            >
              <div class="f-table__cell" :class="getCellAlignClass(column)">
                <slot name="summary" :column="column" :columns="columns" :data="displayData">
                  <template v-if="colIndex === 0">
                    {{ sumText }}
                  </template>
                  <template v-else-if="summaryMethod">
                    {{ getSummaryValue(colIndex) }}
                  </template>
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import FCheckbox from '../FCheckbox'
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
  lazy: false,
  sumText: '合计',
  showSummary: false,
  indent: 16
})

const emit = defineEmits<TableEmits>()

const bodyWrapperRef = ref<HTMLElement>()
const currentSort = ref<{ prop: string; order: 'ascending' | 'descending' } | null>(null)
const currentRow = ref<Record<string, any> | null>(null)
const selectedRows = ref<Record<string, any>[]>([])

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
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})

const bodyWrapperStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
    style.overflowY = 'auto'
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
  
  if (props.rowClassName) {
    if (typeof props.rowClassName === 'string') {
      classes.push(props.rowClassName)
    } else {
      const customClass = props.rowClassName({ row, rowIndex: index })
      if (customClass) {
        classes.push(customClass)
      }
    }
  }
  
  return classes
}

function getRowStyle(row: Record<string, any>, index: number) {
  if (props.rowStyle) {
    if (typeof props.rowStyle === 'function') {
      return props.rowStyle({ row, rowIndex: index })
    } else {
      return props.rowStyle
    }
  }
  return {}
}

function getCellClass(row: Record<string, any>, column: TableColumn, rowIndex: number, columnIndex: number) {
  const classes: string[] = []
  
  if (column.cellClassName) {
    classes.push(column.cellClassName)
  }
  
  return classes
}

function getCellStyle(row: Record<string, any>, column: TableColumn) {
  return {}
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

// Selection related functions
function isRowSelectable(row: Record<string, any>, index: number) {
  const selectionColumn = props.columns.find(col => col.type === 'selection')
  if (!selectionColumn || !selectionColumn.selectable) {
    return true
  }
  return selectionColumn.selectable(row, index)
}

function isRowSelected(row: Record<string, any>, index: number) {
  const rowKey = getRowKey(row, index)
  return selectedRows.value.some(selectedRow => getRowKey(selectedRow, -1) === rowKey)
}

const isAllSelected = computed(() => {
  const selectableRows = displayData.value.filter((row, index) => isRowSelectable(row, index))
  if (selectableRows.length === 0) return false
  return selectableRows.every((row) => {
    const index = displayData.value.indexOf(row)
    return isRowSelected(row, index)
  })
})

const isIndeterminate = computed(() => {
  const selectableRows = displayData.value.filter((row, index) => isRowSelectable(row, index))
  if (selectableRows.length === 0) return false
  const selectedCount = selectableRows.filter((row) => {
    const index = displayData.value.indexOf(row)
    return isRowSelected(row, index)
  }).length
  return selectedCount > 0 && selectedCount < selectableRows.length
})

function handleRowSelection(row: Record<string, any>, index: number, selected: string | number | boolean) {
  const rowKey = getRowKey(row, index)
  const existingIndex = selectedRows.value.findIndex(selectedRow => getRowKey(selectedRow, -1) === rowKey)
  
  if (selected) {
    if (existingIndex === -1) {
      selectedRows.value.push(row)
    }
  } else {
    if (existingIndex !== -1) {
      selectedRows.value.splice(existingIndex, 1)
    }
  }
  
  emit('selection-change', [...selectedRows.value])
  emit('select', [...selectedRows.value], row)
}

function handleSelectAll(selected: string | number | boolean) {
  const selectableRows = displayData.value.filter((row, index) => isRowSelectable(row, index))
  
  if (selected) {
    selectableRows.forEach((row, index) => {
      if (!isRowSelected(row, index)) {
        const rowKey = getRowKey(row, index)
        if (!selectedRows.value.some(selectedRow => getRowKey(selectedRow, -1) === rowKey)) {
          selectedRows.value.push(row)
        }
      }
    })
  } else {
    const rowKeys = new Set(selectableRows.map((row, index) => getRowKey(row, index)))
    selectedRows.value = selectedRows.value.filter(selectedRow => {
      const rowKey = getRowKey(selectedRow, -1)
      return !rowKeys.has(rowKey)
    })
  }
  
  emit('selection-change', [...selectedRows.value])
  emit('select-all', [...selectedRows.value])
}

// Index column functions
function getIndexValue(index: number) {
  const indexColumn = props.columns.find(col => col.type === 'index')
  if (!indexColumn || !indexColumn.index) {
    return index + 1
  }
  if (typeof indexColumn.index === 'number') {
    return indexColumn.index + index
  }
  return indexColumn.index(index)
}

// Summary row functions
function getSummaryValue(columnIndex: number) {
  if (!props.summaryMethod) {
    return ''
  }
  const result = props.summaryMethod({ columns: props.columns, data: displayData.value })
  return result[columnIndex] ?? ''
}

function getSummaryCellClass(column: TableColumn) {
  const classes: string[] = []
  if (column.align) {
    classes.push(`f-table__cell--${column.align}`)
  }
  return classes
}

// Span method functions
function getSpanMethod(row: Record<string, any>, column: TableColumn, rowIndex: number, columnIndex: number) {
  if (!props.spanMethod) {
    return null
  }
  return props.spanMethod({ row, column, rowIndex, columnIndex })
}

function getSpanRowspan(row: Record<string, any>, column: TableColumn, rowIndex: number, columnIndex: number) {
  const span = getSpanMethod(row, column, rowIndex, columnIndex)
  if (!span) return 1
  if (Array.isArray(span)) {
    return span[0]
  }
  return span.rowspan ?? 1
}

function getSpanColspan(row: Record<string, any>, column: TableColumn, rowIndex: number, columnIndex: number) {
  const span = getSpanMethod(row, column, rowIndex, columnIndex)
  if (!span) return 1
  if (Array.isArray(span)) {
    return span[1]
  }
  return span.colspan ?? 1
}

function getSpanHidden(row: Record<string, any>, column: TableColumn, rowIndex: number, columnIndex: number) {
  // Check if this cell should be hidden due to rowspan/colspan from previous cells
  // This is a simplified implementation - in a full implementation, you'd need to track spans
  return false
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
  if (props.currentRowKey !== undefined) {
    const rowKey = getRowKey(row, index)
    if (rowKey === props.currentRowKey) {
      currentRow.value = row
    }
  } else {
    currentRow.value = row
  }
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

watch(() => props.currentRowKey, (newVal) => {
  if (newVal !== undefined) {
    const row = displayData.value.find((row, index) => getRowKey(row, index) === newVal)
    if (row) {
      currentRow.value = row
    }
  }
}, { immediate: true })

defineExpose({
  sort: (prop: string, order: 'ascending' | 'descending') => {
    currentSort.value = { prop, order }
  },
  clearSort: () => {
    currentSort.value = null
  },
  toggleRowSelection: (row: Record<string, any>, selected?: boolean) => {
    const index = displayData.value.findIndex(r => r === row)
    if (index === -1) return
    
    const isCurrentlySelected = isRowSelected(row, index)
    const shouldSelect = selected !== undefined ? selected : !isCurrentlySelected
    
    if (shouldSelect !== isCurrentlySelected) {
      handleRowSelection(row, index, shouldSelect)
    }
  },
  clearSelection: () => {
    selectedRows.value = []
    emit('selection-change', [])
  },
  toggleAllSelection: () => {
    handleSelectAll(!isAllSelected.value)
  },
  setCurrentRow: (row: Record<string, any> | null) => {
    currentRow.value = row
  }
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
