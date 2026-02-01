<template>
  <div class="f-pagination" :class="paginationClass">
    <span v-if="showTotal" class="f-pagination__total">
      共 {{ total }} 条
    </span>
    
    <button
      v-if="showPrev"
      class="f-pagination__prev"
      :disabled="currentPage <= 1 || disabled"
      @click="handlePrev"
    >
      <slot name="prev">
        {{ prevText }}
      </slot>
    </button>
    
    <ul v-if="showPager" class="f-pagination__pager">
      <li
        v-for="page in pages"
        :key="page"
        :class="getPageClass(page)"
        @click="handlePageClick(page)"
      >
        {{ page }}
      </li>
    </ul>
    
    <button
      v-if="showNext"
      class="f-pagination__next"
      :disabled="currentPage >= pageCount || disabled"
      @click="handleNext"
    >
      <slot name="next">
        {{ nextText }}
      </slot>
    </button>
    
    <span v-if="showJumper" class="f-pagination__jumper">
      前往
      <input
        v-model="innerCurrentPage"
        class="f-pagination__input"
        type="number"
        :min="1"
        :max="pageCount"
        @change="handleJumperChange"
      />
      页
    </span>
    
    <span v-if="showSizes" class="f-pagination__sizes">
      <select
        v-model="innerPageSize"
        class="f-pagination__select"
        @change="handleSizeChange"
      >
        <option
          v-for="size in pageSizeOptions"
          :key="size"
          :value="size"
        >
          {{ size }} 条/页
        </option>
      </select>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { PaginationProps, PaginationEmits } from './Pagination'
import type { PaginationSizeType } from './Pagination'

defineOptions({ name: 'FPagination', inheritAttrs: false })

const props = withDefaults(defineProps<PaginationProps>(), {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pagerCount: 7,
  pageSizeOptions: () => [10, 20, 30, 50, 100],
  layout: () => ['prev', 'pager', 'next', 'jumper', 'sizes', 'total'],
  prevText: '<',
  nextText: '>',
  disabled: false,
  hideOnSinglePage: false,
  size: 'medium',
  background: false
})

const emit = defineEmits<PaginationEmits>()

const innerCurrentPage = ref(props.currentPage)
const innerPageSize = ref(props.pageSize)

const pageCount = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

const showTotal = computed(() => {
  return props.layout.includes('total')
})

const showPrev = computed(() => {
  return props.layout.includes('prev')
})

const showNext = computed(() => {
  return props.layout.includes('next')
})

const showPager = computed(() => {
  return props.layout.includes('pager')
})

const showJumper = computed(() => {
  return props.layout.includes('jumper')
})

const showSizes = computed(() => {
  return props.layout.includes('sizes')
})

const paginationClass = computed(() => {
  return [
    `f-pagination--${props.size}`,
    {
      'f-pagination--background': props.background,
      'f-pagination--disabled': props.disabled
    }
  ]
})

const pages = computed(() => {
  const count = pageCount.value
  const pagerCount = props.pagerCount
  const current = props.currentPage
  
  if (count <= pagerCount) {
    return Array.from({ length: count }, (_, i) => i + 1)
  }
  
  const half = Math.floor(pagerCount / 2)
  let array: number[] = []
  
  if (current <= half) {
    array = Array.from({ length: pagerCount }, (_, i) => i + 1)
  } else if (current >= count - half) {
    array = Array.from({ length: pagerCount }, (_, i) => count - pagerCount + i + 1)
  } else {
    array = Array.from({ length: pagerCount }, (_, i) => current - half + i + 1)
  }
  
  return array
})

function getPageClass(page: number) {
  return {
    'f-pagination__item--active': page === props.currentPage,
    'f-pagination__item--disabled': props.disabled
  }
}

function handlePrev() {
  if (props.currentPage <= 1 || props.disabled) return
  const newPage = props.currentPage - 1
  emit('update:currentPage', newPage)
  emit('current-change', newPage)
  emit('prev-click', newPage)
}

function handleNext() {
  if (props.currentPage >= pageCount.value || props.disabled) return
  const newPage = props.currentPage + 1
  emit('update:currentPage', newPage)
  emit('current-change', newPage)
  emit('next-click', newPage)
}

function handlePageClick(page: number) {
  if (props.disabled || page === props.currentPage) return
  emit('update:currentPage', page)
  emit('current-change', page)
}

function handleJumperChange() {
  let page = Math.floor(innerCurrentPage.value)
  if (page < 1) page = 1
  if (page > pageCount.value) page = pageCount.value
  emit('update:currentPage', page)
  emit('current-change', page)
}

function handleSizeChange() {
  emit('update:pageSize', innerPageSize.value)
  emit('size-change', props.currentPage, innerPageSize.value)
}

watch(() => props.currentPage, (newVal) => {
  innerCurrentPage.value = newVal
})

watch(() => props.pageSize, (newVal) => {
  innerPageSize.value = newVal
})

defineExpose({
  handlePrev,
  handleNext
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
