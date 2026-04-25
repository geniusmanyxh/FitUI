<template>
  <div class="f-steps" :class="[`f-steps--${direction}`]">
    <div class="f-steps__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, computed } from 'vue'
import { withInstall } from '@utils/install'

defineOptions({ name: 'FSteps', inheritAttrs: false })

export interface StepsProps {
  active?: number
  direction?: 'horizontal' | 'vertical'
  finishStatus?: 'wait' | 'process' | 'finish' | 'error'
  processStatus?: 'wait' | 'process' | 'finish' | 'error'
  simple?: boolean
  alignCenter?: boolean
}

export interface StepsProvideValue {
  props: StepsProps
  stepCount: number
  updateStepCount: (count: number) => void
}

export const stepsPropsKey = 'stepsProps' as const

const props = withDefaults(defineProps<StepsProps>(), {
  active: 0,
  direction: 'horizontal',
  finishStatus: 'finish',
  processStatus: 'process',
  simple: false,
  alignCenter: false
})

const stepCount = ref(0)
const updateStepCount = (count: number) => {
  stepCount.value = count
}

const stepsProvideValue = computed<StepsProvideValue>(() => ({
  props,
  stepCount: stepCount.value,
  updateStepCount
}))

provide(stepsPropsKey, stepsProvideValue)
</script>

<style scoped lang="scss">
.f-steps {
  &--horizontal {
    display: flex;
  }

  &__wrapper {
    display: flex;
    width: 100%;
  }

  &--vertical {
    .f-steps__wrapper {
      flex-direction: column;
    }
  }
}
</style>
