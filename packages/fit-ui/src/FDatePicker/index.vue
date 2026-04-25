<template>
  <div class="f-date-picker">
    <div class="f-date-picker__input" :class="{ 'is-disabled': disabled }">
      <input
        type="text"
        class="f-date-picker__text"
        :value="displayText"
        :placeholder="placeholder || '选择日期'"
        :disabled="disabled"
        readonly
        @click="toggleVisible"
        :aria-label="ariaLabel || 'Date picker'"
      >
      <f-icon icon="calendar" size="small" class="f-date-picker__icon"></f-icon>
    </div>
    <transition name="f-date-picker-fade">
      <div v-if="visible" class="f-date-picker__panel" :style="panelStyle">
        <div class="f-date-picker__header">
          <button class="f-date-picker__header-btn" @click="handlePrevMonth" aria-label="Previous month">
            <f-icon icon="arrow-left" size="small"></f-icon>
          </button>
          <span class="f-date-picker__header-label">{{ currentYear }}年{{ currentMonth + 1 }}月</span>
          <button class="f-date-picker__header-btn" @click="handleNextMonth" aria-label="Next month">
            <f-icon icon="arrow-right" size="small"></f-icon>
          </button>
        </div>
        <div class="f-date-picker__weekdays">
          <span class="f-date-picker__weekday" v-for="day in weekDays" :key="day">{{ day }}</span>
        </div>
        <div class="f-date-picker__calendar">
          <button
            v-for="date in calendarDates"
            :key="date.date"
            class="f-date-picker__date"
            :class="{
              'is-today': date.isToday,
              'is-selected': isSelected(date.date),
              'is-other-month': date.isOtherMonth,
              'is-disabled': date.isDisabled
            }"
            @click="selectDate(date)"
            :aria-label="date.label"
            :aria-selected="isSelected(date.date)"
            :tabindex="date.isOtherMonth ? -1 : 0"
          >
            {{ date.day }}
          </button>
        </div>
        <div class="f-date-picker__footer">
          <button class="f-date-picker__btn f-date-picker__btn--today" @click="selectToday">今天</button>
          <button class="f-date-picker__btn f-date-picker__btn--confirm" @click="handleConfirm">确定</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { withInstall } from '@utils/install'
import FIcon from '@/FIcon'

defineOptions({ name: 'FDatePicker', inheritAttrs: false })

export interface DatePickerProps {
  modelValue?: string
  type?: 'date' | 'daterange' | 'datetime' | 'month' | 'year'
  placeholder?: string
  disabled?: boolean
  disabledDate?: (date: Date) => boolean
  format?: string
  ariaLabel?: string
}

export interface DatePickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'visible-change', visible: boolean): void
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  type: 'date',
  placeholder: '选择日期',
  disabled: false,
  disabledDate: () => false,
  format: 'YYYY-MM-DD',
  ariaLabel: 'Date picker'
})

const emit = defineEmits<DatePickerEmits>()

const visible = ref(false)
const currentDate = ref(props.modelValue ? new Date(props.modelValue) : new Date())
const selectedDate = ref<Date | null>(props.modelValue ? new Date(props.modelValue) : null)

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const displayText = computed(() => {
  if (props.modelValue) {
    return props.modelValue
  }
  return ''
})

const panelStyle = ref({})

interface CalendarDate {
  date: string
  day: number
  isToday: boolean
  isOtherMonth: boolean
  isDisabled: boolean
  label: string
}

const calendarDates = computed<CalendarDate[]>(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDay = firstDay.getDay()
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const dates: CalendarDate[] = []

  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    dates.push({
      date: dateStr,
      day,
      isToday: false,
      isOtherMonth: true,
      isDisabled: true,
      label: `${month}月${day}日`
    })
  }

  // Current month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const dateObj = new Date(year, month, d)
    dates.push({
      date: dateStr,
      day: d,
      isToday: dateStr === todayStr,
      isOtherMonth: false,
      isDisabled: props.disabledDate(dateObj),
      label: `${month + 1}月${d}日`
    })
  }

  // Next month days to fill 6 rows (42 cells)
  const remaining = 42 - dates.length
  for (let i = 1; i <= remaining; i++) {
    const day = i
    const dateStr = `${year}-${String(month + 2).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    dates.push({
      date: dateStr,
      day,
      isToday: false,
      isOtherMonth: true,
      isDisabled: true,
      label: `${month + 2}月${day}日`
    })
  }

  return dates
})

const toggleVisible = () => {
  if (props.disabled) return
  visible.value = !visible.value
  emit('visible-change', visible.value)
}

const isSelected = (dateStr: string) => {
  return selectedDate.value ? `${selectedDate.value.getFullYear()}-${String(selectedDate.value.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.value.getDate()).padStart(2, '0')}` === dateStr : false
}

const selectDate = (date: CalendarDate) => {
  if (date.isOtherMonth || date.isDisabled) return
  selectedDate.value = new Date(date.date)
}

const selectToday = () => {
  const today = new Date()
  selectedDate.value = today
  currentDate.value = today
}

const handleConfirm = () => {
  if (selectedDate.value) {
    const year = selectedDate.value.getFullYear()
    const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.value.getDate()).padStart(2, '0')
    const value = `${year}-${month}-${day}`
    emit('update:modelValue', value)
    emit('change', value)
  }
  visible.value = false
}

const handlePrevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const handleNextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

watch(() => props.modelValue, (val) => {
  if (val) {
    selectedDate.value = new Date(val)
    currentDate.value = new Date(val)
  }
})
</script>

<style scoped lang="scss">
.f-date-picker {
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
    width: 280px;
    padding: 8px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0 8px;
  }

  &__header-btn {
    border: none;
    background: transparent;
    color: #606266;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;

    &:hover {
      background-color: #f5f7fa;
    }
  }

  &__header-label {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 12px;
    color: #909399;
    padding: 4px 0;
  }

  &__calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  &__date {
    height: 30px;
    border: none;
    background: transparent;
    font-size: 13px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f7fa;
    }

    &.is-today {
      color: #409eff;
      font-weight: 500;
    }

    &.is-selected {
      background-color: #409eff;
      color: white;
    }

    &.is-other-month {
      color: #c0c4cc;
    }

    &.is-disabled {
      color: #dcdfe6;
      cursor: not-allowed;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    margin-top: 8px;
    border-top: 1px solid #ebeef5;
  }

  &__btn {
    border: none;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;

    &--today {
      background: transparent;
      color: #409eff;
    }

    &--confirm {
      background: #409eff;
      color: white;
    }
  }
}

.f-date-picker-fade-enter-active,
.f-date-picker-fade-leave-active {
  transition: opacity 0.2s;
}

.f-date-picker-fade-enter-from,
.f-date-picker-fade-leave-to {
  opacity: 0;
}
</style>
