<template>
  <dl class="f-descriptions" :class="descriptionsClass">
    <template v-if="bordered">
      <tr class="f-descriptions__header" v-if="title">
        <td :colspan="columns * 2">{{ title }}</td>
      </tr>
      <template v-for="(row, rowIndex) in rows" :key="rowIndex">
        <tr class="f-descriptions__row">
          <template v-for="(item, colIndex) in row" :key="colIndex">
            <td class="f-descriptions__item-label" :style="labelStyle">
              {{ item.label }}
            </td>
            <td class="f-descriptions__item-content" :style="contentStyle">
              <slot :name="item.slotName">{{ item.content }}</slot>
            </td>
          </template>
        </tr>
      </template>
    </template>
    <template v-else>
      <tr class="f-descriptions__row" v-for="(row, rowIndex) in rows" :key="rowIndex">
        <template v-for="(item, colIndex) in row" :key="colIndex">
          <td class="f-descriptions__item" :style="itemStyle">
            <div class="f-descriptions__item-label" :style="labelStyle">
              {{ item.label }}
            </div>
            <div class="f-descriptions__item-content" :style="contentStyle">
              <slot :name="item.slotName">{{ item.content }}</slot>
            </div>
          </td>
        </template>
      </tr>
    </template>
  </dl>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { withInstall } from '@utils/install'

defineOptions({ name: 'FDescriptions', inheritAttrs: false })

export interface DescriptionsProps {
  title?: string
  bordered?: boolean
  column?: number
  size?: 'small' | 'default' | 'large'
  direction?: 'horizontal' | 'vertical'
}

export interface DescriptionsItemProps {
  label?: string
  span?: number
}

export const descriptionsPropsKey = 'descriptionsProps' as const

const props = withDefaults(defineProps<DescriptionsProps>(), {
  title: '',
  bordered: false,
  column: 3,
  size: 'default',
  direction: 'horizontal'
})

const columns = computed(() => props.column)
const descriptionsClass = computed(() => ({
  'f-descriptions--bordered': props.bordered,
  [`f-descriptions--${props.size}`]: true,
  [`f-descriptions--${props.direction}`]: true
}))

interface RowItem {
  label: string
  content: string
  slotName: string
}

const rows = computed<RowItem[][]>(() => {
  // This would normally come from child items
  // For now, this is a placeholder structure
  return []
})

const labelStyle = computed(() => ({
  textAlign: 'left',
  padding: '8px 12px',
  backgroundColor: '#fafafa',
  fontWeight: 500,
  fontSize: props.size === 'small' ? '12px' : props.size === 'large' ? '14px' : '13px'
}))

const contentStyle = computed(() => ({
  padding: '8px 12px',
  fontSize: props.size === 'small' ? '12px' : props.size === 'large' ? '14px' : '13px'
}))

const itemStyle = computed(() => ({
  padding: '8px 12px'
}))

provide(descriptionsPropsKey, props)
</script>

<style scoped lang="scss">
.f-descriptions {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  &--bordered {
    border: 1px solid #ebeef5;

    td {
      border: 1px solid #ebeef5;
    }
  }

  &--small {
    font-size: 12px;
  }

  &--large {
    font-size: 14px;
  }

  &__item-label {
    color: #909399;
  }

  &__item-content {
    color: #303133;
  }
}
</style>
