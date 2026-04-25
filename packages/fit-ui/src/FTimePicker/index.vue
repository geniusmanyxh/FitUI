<template>
  <div class="f-time-picker">
    <div class="f-time-picker__input" :class="{ 'is-disabled': disabled }">
      <input
        type="text"
        class="f-time-picker__text"
        :value="displayText"
        :placeholder="placeholder || '选择时间'"
        :disabled="disabled"
        readonly
        @click="toggleVisible"
        :aria-label="ariaLabel || 'Time picker'"
      >
      <f-icon icon="clock" size="small" class="f-time-picker__icon"></f-icon>
    </div>
    <transition name="f-time-picker-fade">
      <div v-if="visible" class="f-time-picker__panel" :style="panelStyle">
        <div class="f-time-picker__header">
          <button class="f-time-picker__header-btn" @click="handlePrev">上一天</button>
          <button class="f-time-picker__header-btn" @click="handleNow">现在</button>
          <button class="f-time-picker__header-btn" @click="handleNext">下一天</button>
        </div>
        <div class="f-time-picker__body">
          <div class="f-time-picker__column">
            <div class="f-time-picker__label">时</div>
            <ul class="f-time-picker__list" ref="hourListRef">
              <li
                v-for="h in 24"
                :key="h - 1"
                class="f-time-picker__item"
                :class="{ 'is-active': hours === h - 1, 'is-disabled': isHourDisabled(h - 1) }"
                @click="selectHour(h - 1)"
              >
                {{ String(h - 1).padStart(2, '0') }}
              </li>
            </ul>
          </div>
          <div class="f-time-picker__column">
            <div class="f-time-picker__label">分</div>
            <ul class="f-time-picker__list" ref="minuteListRef">
              <li
                v-for="m in 60"
                :key="m - 1"
                class="f-time-picker__item"
                :class="{ 'is-active': minutes === m - 1, 'is-disabled': isMinuteDisabled(m - 1) }"
                @click="selectMinute(m - 1)"
              >
                {{ String(m - 1).padStart(2, '0') }}
              </li>
            </ul>
          </div>
          <div class="f-time-picker__column">
            <div class="f-time-picker__label">秒</div>
            <ul class="f-time-picker__list" ref="secondListRef">
              <li
                v-for="s in 60"
                :key="s - 1"
                class="f-time-picker__item"
                :class="{ 'is-active': seconds === s - 1, 'is-disabled': isSecondDisabled(s - 1) }"
                @click="selectSecond(s - 1)"
              >
                {{ String(s - 1).padStart(2, '0') }}
              </li>
            </ul>
          </div>
        </div>
        <div class="f-time-picker__footer">
          <button class="f-time-picker__btn f-time-picker__btn--cancel" @click="handleCancel">取消</button>
          <button class="f-time-picker__btn f-time-picker__btn--confirm" @click="handleConfirm">确定</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { withInstall } from '@utils/install'
import FIcon from '@/FIcon'

defineOptions({ name: 'FTimePicker', inheritAttrs: false })

export interface TimePickerProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  disabledHours?: number[]
  disabledMinutes?: number[]
  disabledSeconds?: number[]
  format?: string
  ariaLabel?: string
}

export interface TimePickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'visible-change', visible: boolean): void
}

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  placeholder: '选择时间',
  disabled: false,
  disabledHours: () => [],
  disabledMinutes: () => [],
  disabledSeconds: () => [],
  format: 'HH:mm:ss',
  ariaLabel: 'Time picker'
})

const emit = defineEmits<TimePickerEmits>()

const visible = ref(false)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const panelStyle = ref({})

const displayText = computed(() => {
  if (props.modelValue) {
    return props.modelValue
  }
  return ''
})

const toggleVisible = () => {
  if (props.disabled) return
  visible.value = !visible.value
  if (visible.value && props.modelValue) {
    const [h, m, s] = props.modelValue.split(':').map(Number)
    hours.value = h || 0
    minutes.value = m || 0
    seconds.value = s || 0
  }
  emit('visible-change', visible.value)
}

const selectHour = (h: number) => {
  if (isHourDisabled(h)) return
  hours.value = h
}

const selectMinute = (m: number) => {
  if (isMinuteDisabled(m)) return
  minutes.value = m
}

const selectSecond = (s: number) => {
  if (isSecondDisabled(s)) return
  seconds.value = s
}

const isHourDisabled = (h: number) => props.disabledHours.includes(h)
const isMinuteDisabled = (m: number) => props.disabledMinutes.includes(m)
const isSecondDisabled = (s: number) => props.disabledSeconds.includes(s)

const handleConfirm = () => {
  const value = `${String(hours.value).padStart(2, '0')}:${String(minutes.value).padStart(2, '0')}:${String(seconds.value).padStart(2, '0')}`
  emit('update:modelValue', value)
  emit('change', value)
  visible.value = false
}

const handleCancel = () => {
  visible.value = false
}

const handlePrev = () => {}
const handleNext = () => {}
const handleNow = () => {
  const now = new Date()
  hours.value = now.getHours()
  minutes.value = now.getMinutes()
  seconds.value = now.getSeconds()
}

onMounted(() => {
  if (props.modelValue) {
    const [h, m, s] = props.modelValue.split(':').map(Number)
    hours.value = h || 0
    minutes.value = m || 0
    seconds.value = s || 0
  }
})
</script>

<style scoped lang="scss">
.f-time-picker {
  position: relative;
  display: inline-block;

  &__input {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__text {
    border: none;
    outline: none;
    flex: 1;
    font-size: 14px;
    background: transparent;
    cursor: pointer;
  }

  &__icon {
    color: #909399;
  }

  &__panel {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    background: white;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 240px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #ebeef5;
  }

  &__header-btn {
    border: none;
    background: transparent;
    color: #409eff;
    font-size: 12px;
    cursor: pointer;
    padding: 2px 4px;
  }

  &__body {
    display: flex;
    padding: 8px 0;
  }

  &__column {
    flex: 1;
    text-align: center;
  }

  &__label {
    font-size: 12px;
    color: #909399;
    padding: 4px 0;
  }

  &__list {
    height: 180px;
    overflow-y: auto;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f7fa;
    }

    &.is-active {
      color: #409eff;
      font-weight: 500;
    }

    &.is-disabled {
      color: #dcdfe6;
      cursor: not-allowed;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-top: 1px solid #ebeef5;
  }

  &__btn {
    border: none;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;

    &--cancel {
      background: transparent;
      color: #606266;
    }

    &--confirm {
      background: #409eff;
      color: white;
    }
  }
}

.f-time-picker-fade-enter-active,
.f-time-picker-fade-leave-active {
  transition: opacity 0.2s;
}

.f-time-picker-fade-enter-from,
.f-time-picker-fade-leave-to {
  opacity: 0;
}
</style>
