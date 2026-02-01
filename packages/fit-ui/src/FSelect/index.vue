<template>
  <div ref="selectRef" class="f-select" :class="selectClass" @click="handleClick">
    <div class="f-select__trigger" ref="triggerRef" tabindex="0" @keydown="handleKeydown">
      <div v-if="multiple && Array.isArray(modelValue) && modelValue.length > 0" class="f-select__tags">
        <span v-for="(item, index) in selectedOptions" :key="item.value" class="f-select__tag">
          {{ item.label }}
          <span v-if="!disabled && (!multipleLimit || index < multipleLimit)" class="f-select__tag-close" @click.stop="removeTag(item.value)">
            ×
          </span>
        </span>
        <span v-if="multipleLimit && selectedOptions.length > multipleLimit" class="f-select__tag">
          +{{ selectedOptions.length - multipleLimit }}
        </span>
      </div>
      <input
        v-if="filterable"
        ref="inputRef"
        v-model="query"
        class="f-select__input"
        :placeholder="displayPlaceholder"
        :disabled="disabled"
        @click.stop
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-else class="f-select__selected-text">{{ displayText }}</span>
      <span v-if="showClear" class="f-select__clear" @click.stop="handleClear">×</span>
      <span class="f-select__arrow" :class="{ 'is-reverse': isOpen }">
        <slot name="arrow">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path d="M831.872 340.864 512 654.208 192.128 340.864a35.328 35.328 0 0 0-49.536 50.432l339.456 332.8a35.328 35.328 0 0 0 49.536 0l339.456-332.8a35.328 35.328 0 0 0-49.536-50.432z"></path>
          </svg>
        </slot>
      </span>
    </div>

    <Teleport to="body">
      <Transition name="f-select-dropdown">
        <div
          v-show="isOpen"
          ref="dropdownRef"
          class="f-select__dropdown"
          :class="`f-select__dropdown--${size}`"
          :style="dropdownStyle"
          role="listbox"
          :aria-expanded="isOpen"
          @click.stop
        >
          <div v-if="loading" class="f-select__loading">
            <slot name="loading">
              <f-icon icon="refresh" class="is-rotate"></f-icon>
            </slot>
          </div>
          <div v-else-if="filteredOptions.length === 0" class="f-select__empty">
            <slot name="empty">{{ noDataText }}</slot>
          </div>
          <ul v-else class="f-select__list" role="presentation">
            <li
              v-for="option in filteredOptions"
              :key="option.value"
              class="f-select__item"
              :class="{
                'is-selected': isSelected(option.value),
                'is-disabled': option.disabled,
                'is-group': option.children
              }"
              @click="selectOption(option)"
            >
              <template v-if="option.children">
                <div class="f-select__group-label">{{ option.label }}</div>
                <li
                  v-for="child in option.children"
                  :key="child.value"
                  class="f-select__item f-select__item--nested"
                  :class="{
                    'is-selected': isSelected(child.value),
                    'is-disabled': child.disabled
                  }"
                  @click.stop="selectOption(child)"
                  role="option"
                  :aria-selected="isSelected(child.value)"
                >
                  <slot name="option" :option="child">
                    {{ child.label }}
                  </slot>
                </li>
              </template>
              <template v-else>
                <slot name="option" :option="option">
                  {{ option.label }}
                </slot>
              </template>
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, getCurrentInstance } from 'vue'
import type { SelectOption, SelectProps } from './Select'
import type { SelectSizeType } from './Select'
import FIcon from '@/FIcon'

defineOptions({ name: 'FSelect', inheritAttrs: false })

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  filterable: false,
  remote: false,
  loading: false,
  multiple: false,
  size: 'medium',
  multipleLimit: 0
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
  (e: 'change', value: string | number | (string | number)[]): void
  (e: 'visible-change', value: boolean): void
  (e: 'remove-tag', value: string | number): void
  (e: 'clear'): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const selectRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const isOpen = ref(false)
const query = ref('')
const dropdownStyle = ref<Record<string, string>>({})
const hoverIndex = ref(-1)

const instance = getCurrentInstance()
const selectId = `f-select-${instance?.uid ?? Math.random().toString(36).slice(2)}`

const isSingle = computed(() => !props.multiple)

const selectedOptions = computed(() => {
  const modelValue = props.modelValue
  if (props.multiple && Array.isArray(modelValue)) {
    return getAllOptions().filter(opt => modelValue.includes(opt.value))
  }
  if (modelValue !== undefined && modelValue !== null && modelValue !== '') {
    return getAllOptions().filter(opt => opt.value === modelValue)
  }
  return []
})

const displayText = computed(() => {
  if (isSingle.value) {
    return selectedOptions.value[0]?.label || ''
  }
  return ''
})

const displayPlaceholder = computed(() => {
  if (isSingle.value) {
    return displayText.value ? '' : props.placeholder
  }
  return selectedOptions.value.length > 0 ? '' : props.placeholder
})

const showClear = computed(() => {
  return props.clearable && !props.disabled && selectedOptions.value.length > 0
})

const selectClass = computed(() => {
  return [
    `f-select--${props.size}`,
    {
      'is-disabled': props.disabled,
      'is-multiple': props.multiple,
      'is-focus': isOpen.value
    }
  ]
})

const filteredOptions = computed(() => {
  if (!props.filterable || props.remote || !query.value) {
    return props.options || []
  }
  const lowerQuery = query.value.toLowerCase()
  return filterOptions(props.options || [], lowerQuery)
})

const noDataText = computed(() => {
  return query.value ? '无匹配数据' : '暂无数据'
})

function getAllOptions(): SelectOption[] {
  const result: SelectOption[] = []
  const options = props.options || []
  
  function traverse(opts: SelectOption[]) {
    opts.forEach(opt => {
      if (opt.children) {
        traverse(opt.children)
      } else {
        result.push(opt)
      }
    })
  }
  
  traverse(options)
  return result
}

function filterOptions(options: SelectOption[], query: string): SelectOption[] {
  return options.reduce((acc: SelectOption[], opt) => {
    if (opt.children) {
      const filteredChildren = filterOptions(opt.children, query)
      if (filteredChildren.length > 0) {
        acc.push({ ...opt, children: filteredChildren })
      }
    } else if (opt.label.toLowerCase().includes(query)) {
      acc.push(opt)
    }
    return acc
  }, [])
}

function isSelected(value: string | number): boolean {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(value)
  }
  return props.modelValue === value
}

function selectOption(option: SelectOption) {
  if (option.disabled) return
  
  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValue.indexOf(option.value)
    if (index > -1) {
      currentValue.splice(index, 1)
    } else {
      if (!props.multipleLimit || currentValue.length < props.multipleLimit) {
        currentValue.push(option.value)
      }
    }
    emit('update:modelValue', currentValue)
    emit('change', currentValue)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    closeDropdown()
  }
  
  if (props.filterable) {
    query.value = ''
  }
}

function removeTag(value: string | number) {
  if (props.disabled) return
  if (props.multiple && Array.isArray(props.modelValue)) {
    const newValue = props.modelValue.filter(v => v !== value)
    emit('update:modelValue', newValue)
    emit('change', newValue)
    emit('remove-tag', value)
  }
}

function handleClear() {
  if (props.disabled) return
  const newValue = props.multiple ? [] : ''
  emit('update:modelValue', newValue)
  emit('change', newValue)
  emit('clear')
  query.value = ''
}

function handleClick() {
  if (props.disabled) return
  toggleDropdown()
}

function toggleDropdown() {
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

function openDropdown() {
  isOpen.value = true
  emit('visible-change', true)
  nextTick(() => {
    updateDropdownPosition()
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
}

function closeDropdown() {
  isOpen.value = false
  emit('visible-change', false)
  query.value = ''
  hoverIndex.value = -1
}

function updateDropdownPosition() {
  if (!triggerRef.value || !dropdownRef.value) return
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const dropdownHeight = dropdownRef.value.offsetHeight
  const windowHeight = window.innerHeight
  const spaceBelow = windowHeight - triggerRect.bottom
  const spaceAbove = triggerRect.top
  
  const shouldDropUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow
  
  dropdownStyle.value = {
    position: 'absolute',
    left: `${triggerRect.left}px`,
    top: shouldDropUp ? `${triggerRect.top - dropdownHeight - 4}px` : `${triggerRect.bottom + 4}px`,
    width: `${triggerRect.width}px`,
    zIndex: '2000'
  }
}

function handleInput() {
  if (props.remote && props.remoteMethod) {
    props.remoteMethod(query.value)
  }
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  
  switch (event.key) {
    case 'Enter':
      event.preventDefault()
      if (isOpen.value && hoverIndex.value >= 0) {
        const flatOptions = getFlatOptions()
        const option = flatOptions[hoverIndex.value]
        if (option && !option.disabled) {
          selectOption(option)
        }
      } else {
        toggleDropdown()
      }
      break
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else {
        navigateOptions(1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        navigateOptions(-1)
      }
      break
    case 'Tab':
      closeDropdown()
      break
  }
}

function getFlatOptions(): SelectOption[] {
  const result: SelectOption[] = []
  const options = filteredOptions.value
  
  function traverse(opts: SelectOption[]) {
    opts.forEach(opt => {
      if (opt.children) {
        traverse(opt.children)
      } else {
        result.push(opt)
      }
    })
  }
  
  traverse(options)
  return result
}

function navigateOptions(direction: number) {
  const flatOptions = getFlatOptions()
  const maxIndex = flatOptions.length - 1
  
  if (direction > 0) {
    hoverIndex.value = hoverIndex.value >= maxIndex ? 0 : hoverIndex.value + 1
  } else {
    hoverIndex.value = hoverIndex.value <= 0 ? maxIndex : hoverIndex.value - 1
  }
  
  scrollToHoveredOption()
}

function scrollToHoveredOption() {
  const dropdownList = dropdownRef.value?.querySelector('.f-select__list')
  if (!dropdownList) return
  
  const items = dropdownList.querySelectorAll('.f-select__item:not(.is-group)')
  const hoveredItem = items[hoverIndex.value] as HTMLElement
  
  if (hoveredItem) {
    hoveredItem.scrollIntoView({ block: 'nearest' })
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value && selectRef.value && !selectRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

const handleScroll = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

watch(() => props.modelValue, () => {
  if (props.filterable) {
    query.value = ''
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleScroll)
})

defineExpose({
  focus: () => triggerRef.value?.focus(),
  blur: () => triggerRef.value?.blur()
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
