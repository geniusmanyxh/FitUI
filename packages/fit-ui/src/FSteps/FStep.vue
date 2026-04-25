<template>
  <div class="f-step" :class="[`f-step--${status}`, `f-step--${direction}`]" :style="stepStyle">
    <div class="f-step__header">
      <div class="f-step__icon" :class="{ 'f-step__icon--active': isActive, 'f-step__icon--finish': isFinish }">
        <slot name="icon">
          <span class="f-step__number" v-if="!isFinish">{{ index + 1 }}</span>
          <f-icon v-else icon="check" size="small"></f-icon>
        </slot>
      </div>
      <div class="f-step__line" v-if="!isLast"></div>
    </div>
    <div class="f-step__content">
      <div class="f-step__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="f-step__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, inject, ref } from 'vue'
import FIcon from '@/FIcon'
import { stepsPropsKey } from './Steps'
import type { StepsProvideValue } from './Steps'
import type { ComputedRef } from 'vue'

defineOptions({ name: 'FStep', inheritAttrs: false })

export interface StepProps {
  title?: string
  description?: string
  status?: 'wait' | 'process' | 'finish' | 'error'
  icon?: string
}

const props = withDefaults(defineProps<StepProps>(), {
  title: '',
  description: '',
  status: 'wait',
  icon: ''
})

const stepsProvideRef = inject<ComputedRef<StepsProvideValue>>(stepsPropsKey)
const index = ref(0)

const stepData = computed(() => {
  if (!stepsProvideRef) return null
  return stepsProvideRef.value
})

const isLast = computed(() => {
  const ctx = stepData.value
  if (!ctx) return false
  return index.value === ctx.stepCount - 1
})

onMounted(() => {
  const ctx = stepData.value
  if (ctx) {
    index.value = ctx.stepCount
    ctx.updateStepCount(ctx.stepCount + 1)
  }
})

const direction = computed(() => stepData.value?.props.direction ?? 'horizontal')

const isActive = computed(() => {
  const ctx = stepData.value
  if (!ctx) return false
  return ctx.props.active === index.value
})

const isFinish = computed(() => {
  const ctx = stepData.value
  if (!ctx) return false
  return ctx.props.active > index.value
})

const status = computed(() => {
  if (props.status !== 'wait') return props.status
  const ctx = stepData.value
  if (!ctx) return 'wait'
  if (ctx.props.active > index.value) return ctx.props.finishStatus
  if (ctx.props.active === index.value) return ctx.props.processStatus
  return 'wait'
})

const stepStyle = computed(() => {
  const ctx = stepData.value
  if (!ctx || ctx.stepCount <= 1) return {}
  return { flex: 1 }
})
</script>

<style scoped lang="scss">
.f-step {
  display: flex;
  align-items: flex-start;
  padding: 0 16px;
  box-sizing: border-box;

  &--horizontal {
    flex-direction: column;
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #dcdfe6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #dcdfe6;
    transition: border-color 0.2s, background-color 0.2s;

    &--active {
      border-color: #409eff;
      color: #409eff;
    }

    &--finish {
      border-color: #409eff;
      background-color: #409eff;
      color: white;
    }
  }

  &__line {
    flex: 1;
    height: 2px;
    background-color: #dcdfe6;
    margin: 0 8px;
  }

  &__content {
    flex: 1;
    margin-top: 8px;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
  }

  &__description {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
  }
}
</style>
