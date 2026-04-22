<template>
  <div
    ref="selectRef"
    class="f-select"
    :class="selectClasses"
    :id="selectId"
    role="combobox"
    :aria-expanded="isOpen"
    :aria-haspopup="true"
    :aria-disabled="disabled"
    @click="handleWrapperClick"
  >
    <div class="f-select__trigger" ref="triggerRef" tabindex="-1">
      <div
        v-if="$slots.prefix"
        class="f-select__prefix"
      >
        <slot name="prefix" />
      </div>

      <div v-if="multiple && Array.isArray(modelValue) && modelValue.length > 0" class="f-select__tags">
        <template v-if="collapseTags">
          <span
            v-for="(item, index) in selectedOptions.slice(0, maxCollapseTags)"
            :key="getOptionValueKey(item.value)"
            class="f-select__tag"
            :class="tagTypeClass"
          >
            <span class="f-select__tag-label">{{ getOptionLabel(item) }}</span>
            <span
              v-if="!disabled"
              class="f-select__tag-close"
              @click.stop="removeTag(item.value)"
              aria-label="移除标签"
            >
              <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.6-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 449.8 296.4 191.7c-3-3.6-7.5-5.7-12.3-5.7H204.3c-7.3 0-11.1 7.9-6.6 13.1L460.2 512 197.7 824.9A7.95 7.95 0 0 0 204.3 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 574.1l215.6 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c7.3 0 11.1-7.9 6.6-13.1L563.8 512z"></path>
              </svg>
            </span>
          </span>
          <span
            v-if="selectedOptions.length > maxCollapseTags"
            class="f-select__tag f-select__tag--collapse"
            :title="collapseTagsTooltip ? collapseTagsTooltipContent : undefined"
          >
            +{{ selectedOptions.length - maxCollapseTags }}
          </span>
        </template>
        <template v-else>
          <span
            v-for="(item) in selectedOptions"
            :key="getOptionValueKey(item.value)"
            class="f-select__tag"
            :class="tagTypeClass"
          >
            <span class="f-select__tag-label">{{ getOptionLabel(item) }}</span>
            <span
              v-if="!disabled"
              class="f-select__tag-close"
              @click.stop="removeTag(item.value)"
              aria-label="移除标签"
            >
              <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.6-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 449.8 296.4 191.7c-3-3.6-7.5-5.7-12.3-5.7H204.3c-7.3 0-11.1 7.9-6.6 13.1L460.2 512 197.7 824.9A7.95 7.95 0 0 0 204.3 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 574.1l215.6 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c7.3 0 11.1-7.9 6.6-13.1L563.8 512z"></path>
              </svg>
            </span>
          </span>
        </template>
      </div>

      <input
        v-if="filterable"
        ref="inputRef"
        v-model="inputQuery"
        class="f-select__input"
        :placeholder="displayPlaceholder"
        :disabled="disabled"
        :name="name"
        role="searchbox"
        :aria-autocomplete="filterable ? 'list' : 'none'"
        :aria-activedescendant="hoverIndex >= 0 ? `${optionIdPrefix}-${hoverIndex}` : undefined"
        @click.stop
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      />
      <span
        v-else
        class="f-select__selected-text"
        :class="{ 'is-placeholder': !displayText }"
      >
        {{ displayText || placeholder }}
      </span>

      <span
        v-if="showClear"
        class="f-select__clear-icon"
        role="button"
        tabindex="-1"
        aria-label="清空"
        @click.stop="handleClear"
        @mousedown.prevent
      >
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
        </svg>
      </span>

      <span class="f-select__arrow" :class="{ 'is-reverse': isOpen }">
        <slot name="arrow">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M831.872 340.864 512 654.208 192.128 340.864a35.328 35.328 0 0 0-49.536 50.432l339.456 332.8a35.328 35.328 0 0 0 49.536 0l339.456-332.8a35.328 35.328 0 0 0-49.536-50.432z"></path>
          </svg>
        </slot>
      </span>

      <div
        v-if="$slots.suffix"
        class="f-select__suffix"
      >
        <slot name="suffix" />
      </div>
    </div>

    <Teleport :to="teleported ? 'body' : 'body'" :disabled="!teleported">
      <transition name="f-select-popper">
        <div
          v-show="isOpen"
          ref="dropdownRef"
          class="f-select__popper"
          :class="[popperClass, `f-select__popper--${size}`]"
          :style="dropdownStyle"
          role="listbox"
          :aria-multiselectable="multiple"
          @click.stop
        >
          <div v-if="showLoading" class="f-select__loading">
            <slot name="loading">
              <div class="f-select__loading-icon">
                <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                  <path d="M512 64a32 32 0 0 1 32 32v128a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v128a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm384-384a32 32 0 0 1 0 64H768a32 32 0 1 1 0-64h128zM256 512a32 32 0 0 1 0 64H128a32 32 0 0 1 0-64h128zm566.4-192a32 32 0 0 1 0 45.2l-90.4 90.5a32 32 0 0 1-45.3-45.3l90.5-90.4a32 32 0 0 1 45.2 0zM376 748a32 32 0 0 1 0 45.3l-90.5 90.5a32 32 0 1 1-45.3-45.3l90.5-90.5a32 32 0 0 1 45.3 0zM896 512a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h128a32 32 0 0 1 32 32zM128 512a32 32 0 0 1-32 32H64a32 32 0 0 1 0-64h64a32 32 0 0 1 32 32zm192-192a32 32 0 0 1-45.2 0l-90.5-90.5a32 32 0 1 1 45.3-45.3l90.4 90.5a32 32 0 0 1 0 45.3z" fill="currentColor">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 512 512"
                      to="360 512 512"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
              <span class="f-select__loading-text">加载中...</span>
            </slot>
          </div>

          <div v-else-if="filteredOptions.length === 0" class="f-select__empty">
            <slot name="empty">
              <span>{{ emptyText }}</span>
            </slot>
          </div>

          <ul
            v-else
            ref="listRef"
            class="f-select__list"
            role="presentation"
          >
            <template v-for="(option, index) in flatOptions" :key="getOptionValueKey(option.value)">
              <li
                v-if="option.isGroupLabel"
                class="f-select__group-title"
                role="presentation"
              >
                {{ option.groupLabel }}
              </li>
              <li
                v-else
                :id="`${optionIdPrefix}-${index}`"
                class="f-select__item"
                :class="{
                  'is-selected': isOptionSelected(option.value),
                  'is-disabled': option.disabled || option.groupDisabled,
                  'is-hovering': hoverIndex === index,
                  'is-grouped': option.groupLabel !== undefined,
                }"
                role="option"
                :aria-selected="isOptionSelected(option.value)"
                :aria-disabled="option.disabled || option.groupDisabled"
                @click.stop="selectOption(option)"
                @mouseenter="hoverIndex = index"
              >
                <slot name="option" :option="option">
                  <span class="f-select__item-text">{{ option.label }}</span>
                </slot>
                <span v-if="isOptionSelected(option.value)" class="f-select__item-check">
                  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
                    <path d="M406.656 706.944 195.84 496.128a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.656 706.944z"></path>
                  </svg>
                </span>
              </li>
            </template>
          </ul>
        </div>
      </transition>
    </Teleport>

    <input
      v-if="name"
      type="hidden"
      :name="name"
      :value="hiddenInputValue"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * FSelect 下拉选择器组件
 *
 * @description 功能丰富的下拉选择器，支持单选/多选、远程搜索、分组、创建等特性
 * @example
 * ```vue
 * <FSelect v-model="value" :options="options" placeholder="请选择" />
 * <FSelect v-model="values" multiple filterable collapse-tags>
 *   <FOption value="1" label="选项1" />
 *   <FOption value="2" label="选项2" />
 * </FSelect>
 * ```
 */
import { computed, nextTick, onMounted, onUnmounted, provide, ref, shallowRef, useSlots } from 'vue'
import type { SelectEmits, SelectOption, SelectProps, SelectContext, SelectOptionData, SelectExpose, SelectPlacementType } from './Select'
import { SELECT_CONTEXT_KEY } from './Select'

defineOptions({ name: 'FSelect', inheritAttrs: false })

const $slots = useSlots()

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  filterable: false,
  remote: false,
  loading: false,
  multiple: false,
  size: 'medium',
  multipleLimit: 0,
  collapseTags: false,
  collapseTagsTooltip: false,
  maxCollapseTags: 1,
  allowCreate: false,
  reserveKeyword: false,
  defaultFirstOption: false,
  valueKey: 'value',
  teleported: true,
  validateEvent: true,
  noDataText: '暂无数据',
  noMatchText: '无匹配数据',
  fitInputWidth: true,
  closeOnBlur: true,
  closeOnClickOutside: true,
  autofocus: false,
})

const emit = defineEmits<SelectEmits>()

const selectRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const isOpen = ref(false)
const inputQuery = ref('')
const hoverIndex = ref(-1)
const isFocused = ref(false)
const isComposing = shallowRef(false)
const createdOptions = ref<Map<string, SelectOption>>(new Map())
const optionInstances = ref<Map<string | number, SelectOptionData>>(new Map())

const selectId = `f-select-${Math.random().toString(36).slice(2, 8)}`
const optionIdPrefix = `${selectId}-option`

let searchTimer: ReturnType<typeof setTimeout> | null = null
let resizeObserver: ResizeObserver | null = null

// ==================== Computed ====================

const isSingle = computed(() => !props.multiple)

const selectedOptions = computed<SelectOption[]>(() => {
  const modelValue = props.modelValue
  const allOptions = getAllOptions()

  if (props.multiple && Array.isArray(modelValue)) {
    return allOptions.filter(opt => isOptionSelected(opt.value))
  }

  if (modelValue !== undefined && modelValue !== null && modelValue !== '') {
    return allOptions.filter(opt => isOptionSelected(opt.value))
  }

  return []
})

const displayText = computed(() => {
  if (isSingle.value) {
    return selectedOptions.value[0]?.label ?? ''
  }
  return ''
})

const displayPlaceholder = computed(() => {
  const hasSelected = isSingle.value ? !!displayText.value : selectedOptions.value.length > 0
  return hasSelected ? '' : props.placeholder
})

const showClear = computed(() => {
  return props.clearable && !props.disabled && selectedOptions.value.length > 0
})

const hovering = ref(false)

const showLoading = computed(() => props.loading && props.remote)

const emptyText = computed(() => {
  if (props.remote && props.loading) return props.noDataText
  if (inputQuery.value) return props.noMatchText
  return props.noDataText
})

const selectClasses = computed(() => [
  `f-select--${props.size}`,
  {
    'is-disabled': props.disabled,
    'is-multiple': props.multiple,
    'is-focus': isFocused.value,
    'is-open': isOpen.value,
    'has-prefix': !!$slots.prefix,
    'has-suffix': !!$slots.suffix,
  },
])

const tagTypeClass = computed(() => {
  return props.tagType ? `f-select__tag--${props.tagType}` : ''
})

const collapseTagsTooltipContent = computed(() => {
  return selectedOptions.value.slice(props.maxCollapseTags).map(o => getOptionLabel(o)).join(', ')
})

const hiddenInputValue = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.join(',')
  }
  return String(props.modelValue ?? '')
})

// ==================== Options Collection ====================

const slotOptions = ref<SelectOption[]>([])

function collectOptionsFromSlots(): SelectOption[] {
  const result: SelectOption[] = []

  function extractFromChildren(children: unknown[]): void {
    if (!children || !Array.isArray(children)) return

    children.forEach(child => {
      if (typeof child === 'object' && child !== null && 'props' in child) {
        const vnode = child as Record<string, unknown>
        const componentType = vnode.type as Record<string, unknown> | undefined

        if (componentType && (componentType as { name?: string }).name === 'FOption') {
          const vprops = (vnode.props ?? {}) as Record<string, unknown>
          result.push({
            value: vprops.value as string | number,
            label: (vprops.label as string) ?? String(vprops.value),
            disabled: vprops.disabled === true || vprops.disabled === '',
          })
        } else if ((componentType as { name?: string }).name === 'FOptionGroup') {
          const vprops = (vnode.props ?? {}) as Record<string, unknown>
          const groupLabel = vprops.label as string ?? ''

          const vnodeChildren = vnode.children as Record<string, unknown> | undefined
          if (vnodeChildren && typeof vnodeChildren.default === 'function') {
            const groupChildren = (vnodeChildren.default as () => unknown[])()
            if (groupChildren) {
              extractFromChildren(groupChildren as unknown[])
            }
          }
        }
      }
    })
  }

  const defaultSlot = ($slots as { default?: () => unknown[] }).default?.()
  if (defaultSlot) {
    extractFromChildren(defaultSlot)
  }

  return result
}

function getAllOptions(): SelectOption[] {
  const result: SelectOption[] = []

  if (props.options && props.options.length > 0) {
    return flattenOptions(props.options)
  }

  const slotOpts = collectOptionsFromSlots()
  if (slotOpts.length > 0) {
    return slotOpts
  }

  return result
}

function flattenOptions(options: SelectOption[], groupLabel?: string, groupDisabled?: boolean): SelectOption[] {
  const result: SelectOption[] = []

  options.forEach(opt => {
    if (opt.children) {
      result.push({
        ...opt,
        disabled: opt.disabled || groupDisabled,
      })
    } else {
      result.push({
        ...opt,
        disabled: opt.disabled || groupDisabled,
      })
    }
  })

  return result
}

// ==================== Filtering ====================

const filteredOptions = computed(() => {
  const sourceOptions = getAllOptions()

  if (!props.filterable || props.remote || !inputQuery.value) {
    return sourceOptions
  }

  return filterOptions(sourceOptions, inputQuery.value.toLowerCase())
})

const flatOptions = computed(() => {
  return flattenOptionsForDisplay(filteredOptions.value)
})

function filterOptions(options: SelectOption[], queryStr: string): SelectOption[] {
  return options.reduce((acc: SelectOption[], opt) => {
    if (opt.children) {
      const filteredChildren = filterOptions(opt.children, queryStr)
      if (filteredChildren.length > 0) {
        acc.push({ ...opt, children: filteredChildren })
      }
    } else if (props.filterMethod) {
      if (props.filterMethod(queryStr, opt)) acc.push(opt)
    } else if (opt.label.toLowerCase().includes(queryStr)) {
      acc.push(opt)
    }
    return acc
  }, [])
}

function flattenOptionsForDisplay(options: SelectOption[]): Array<SelectOptionData & { isGroupLabel?: boolean }> {
  const result: Array<SelectOptionData & { isGroupLabel?: boolean }> = []
  let index = 0

  function traverse(opts: SelectOption[], parentGroupLabel?: string, parentGroupDisabled?: boolean) {
    opts.forEach(opt => {
      if (opt.children) {
        result.push({
          value: `group-${opt.value}`,
          label: opt.label,
          disabled: opt.disabled ?? false,
          index: index++,
          groupLabel: opt.label,
          isGroupLabel: true,
        })
        traverse(opt.children, opt.label, opt.disabled)
      } else {
        result.push({
          value: opt.value,
          label: opt.label,
          disabled: opt.disabled ?? parentGroupDisabled ?? false,
          index: index++,
          groupLabel: parentGroupLabel,
          groupDisabled: parentGroupDisabled,
        })
      }
    })
  }

  traverse(options)
  return result
}

// ==================== Selection Logic ====================

function isOptionSelected(value: string | number | Record<string, unknown>): boolean {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.some(v => getValueKey(v) === getValueKey(value))
  }
  return getValueKey(props.modelValue) === getValueKey(value)
}

function getValueKey(value: unknown): string | number {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') {
    return (value as Record<string, unknown>)[props.valueKey] as string | number ?? JSON.stringify(value)
  }
  return String(value)
}

function getOptionValueKey(value: string | number): string | number {
  return getValueKey(value)
}

function getOptionLabel(option: SelectOption): string {
  return option.label ?? String(option.value)
}

function selectOption(option: SelectOptionData) {
  if (option.disabled) return

  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const existsIndex = currentValue.findIndex(v => getValueKey(v) === getValueKey(option.value))

    if (existsIndex > -1) {
      currentValue.splice(existsIndex, 1)
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

  if (props.filterable && !props.reserveKeyword) {
    inputQuery.value = ''
  }

  if (props.multiple) {
    nextTick(resetHoverIndex)
  }
}

function removeTag(value: string | number) {
  if (props.disabled) return
  if (props.multiple && Array.isArray(props.modelValue)) {
    const newValue = props.modelValue.filter(v => getValueKey(v) !== getValueKey(value))
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
  inputQuery.value = ''
}

// ==================== Dropdown Control ====================

function handleWrapperClick() {
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
  if (props.disabled) return
  isOpen.value = true
  emit('visible-change', true)

  nextTick(() => {
    updateDropdownPosition()
    if (props.filterable && inputRef.value) {
      inputRef.value.focus()
    }
    scrollToSelectedOption()
  })
}

function closeDropdown() {
  isOpen.value = false
  emit('visible-change', false)

  if (!props.reserveKeyword) {
    inputQuery.value = ''
  }
  hoverIndex.value = -1
}

// ==================== Positioning ====================

const dropdownStyle = ref<Record<string, string>>({})

function updateDropdownPosition() {
  if (!triggerRef.value || !dropdownRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const dropdownEl = dropdownRef.value

  dropdownEl.style.visibility = 'hidden'
  dropdownEl.style.display = 'block'

  const dropdownHeight = dropdownEl.offsetHeight
  const dropdownWidth = props.fitInputWidth ? triggerRect.width : undefined

  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth
  const spaceBelow = windowHeight - triggerRect.bottom
  const spaceAbove = triggerRect.top

  let placement: SelectPlacementType = props.placement ?? 'bottom'

  if (!props.placement) {
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      placement = 'top'
    } else {
      placement = 'bottom'
    }
  }

  const gap = 4
  let top = 0
  let left = triggerRect.left

  if (placement.startsWith('top')) {
    top = triggerRect.top - dropdownHeight - gap + window.scrollY
  } else {
    top = triggerRect.bottom + gap + window.scrollY
  }

  if (placement.includes('start')) {
    left = triggerRect.left + window.scrollX
  } else if (placement.includes('end')) {
    left = triggerRect.right - (dropdownWidth ?? triggerRect.width) + window.scrollX
  } else {
    left = triggerRect.left + window.scrollX
  }

  left = Math.max(window.scrollX, Math.min(left + (dropdownWidth ?? 0), windowWidth + window.scrollX) - (dropdownWidth ?? triggerRect.width))

  dropdownStyle.value = {
    position: 'fixed',
    left: `${left}px`,
    top: `${top}px`,
    width: dropdownWidth ? `${dropdownWidth}px` : 'auto',
    zIndex: '2000',
    visibility: 'visible',
    display: 'block',
  }

  dropdownEl.style.visibility = 'visible'
}

// ==================== Scrolling ====================

function scrollToSelectedOption() {
  if (!listRef.value) return

  const items = listRef.value.querySelectorAll('.f-select__item')
  if (!items.length) return

  for (let i = 0; i < items.length; i++) {
    const item = items[i] as HTMLElement
    if (item.classList.contains('is-selected')) {
      item.scrollIntoView({ block: 'nearest' })
      hoverIndex.value = i
      break
    }
  }
}

function scrollToHoveredOption() {
  if (!listRef.value || hoverIndex.value < 0) return

  const items = listRef.value.querySelectorAll('.f-select__item:not(.is-disabled)')
  const item = items[hoverIndex.value] as HTMLElement

  if (item) {
    item.scrollIntoView({ block: 'nearest' })
  }
}

function resetHoverIndex() {
  if (!listRef.value) return

  const items = listRef.value.querySelectorAll('.f-select__item')
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains('is-selected')) {
      hoverIndex.value = i
      return
    }
  }
  hoverIndex.value = -1
}

// ==================== Event Handlers ====================

function handleInput() {
  if (props.remote && props.remoteMethod) {
    if (searchTimer) {
      clearTimeout(searchTimer)
    }

    searchTimer = setTimeout(() => {
      if (props.remoteMethod) {
        props.remoteMethod(inputQuery.value)
      }
    }, 300)
  }
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false
  emit('blur', event)

  if (props.closeOnBlur) {
    closeDropdown()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
      event.preventDefault()
      if (isOpen.value && hoverIndex.value >= 0) {
        const option = flatOptions.value[hoverIndex.value]
        if (option && !option.disabled && !option.isGroupLabel) {
          selectOption(option)
        }
      } else if (props.allowCreate && props.filterable && inputQuery.value) {
        createNewOption()
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
      if (!isOpen.value) {
        openDropdown()
      } else {
        navigateOptions(-1)
      }
      break

    case 'Tab':
      closeDropdown()
      break
  }
}

function navigateOptions(direction: number) {
  const flatOpts = flatOptions.value.filter(opt => !opt.isGroupLabel && !opt.disabled)
  if (flatOpts.length === 0) return

  const maxIndex = flatOpts.length - 1
  let newIndex = hoverIndex.value + direction

  if (newIndex < 0) {
    newIndex = maxIndex
  } else if (newIndex > maxIndex) {
    newIndex = 0
  }

  hoverIndex.value = newIndex
  scrollToHoveredOption()
}

function createNewOption() {
  if (!props.allowCreate || !props.filterable || !inputQuery.value) return

  const query = inputQuery.value.trim()
  if (!query) return

  const allOptions = getAllOptions()
  const exists = allOptions.some(opt => opt.label === query)

  if (!exists) {
    const newOption: SelectOption = {
      value: query,
      label: query,
    }

    createdOptions.value.set(query, newOption)

    emit('create', query)

    if (props.multiple) {
      const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
      currentValue.push(query)
      emit('update:modelValue', currentValue)
      emit('change', currentValue)
    } else {
      emit('update:modelValue', query)
      emit('change', query)
      closeDropdown()
    }

    if (!props.reserveKeyword) {
      inputQuery.value = ''
    }
  }
}

function handleCompositionStart() {
  isComposing.value = true
}

function handleCompositionEnd(e: CompositionEvent) {
  isComposing.value = false
  handleInput()
}

// ==================== Click Outside ====================

const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value && selectRef.value && !selectRef.value.contains(event.target as Node)) {
    if (props.closeOnClickOutside) {
      closeDropdown()
    }
  }
}

const handleScroll = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

// ==================== Provide Context ====================

function registerOption(key: string | number, data: SelectOptionData) {
  optionInstances.value.set(key, data)
}

function unregisterOption(key: string | number) {
  optionInstances.value.delete(key)
}

function addCreatedOption(value: string, label: string) {
  createdOptions.value.set(value, { value, label })
}

provide<SelectContext>(SELECT_CONTEXT_KEY, {
  modelValue: computed(() => props.modelValue),
  multiple: computed(() => props.multiple),
  disabled: computed(() => props.disabled),
  valueKey: computed(() => props.valueKey),
  selectOption: (option: SelectOptionData) => selectOption(option),
  registerOption,
  unregisterOption,
  updateHoverIndex: (index: number) => { hoverIndex.value = index },
  addCreatedOption,
})

// ==================== Lifecycle ====================

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleScroll)

  if (triggerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      if (isOpen.value) {
        updateDropdownPosition()
      }
    })
    resizeObserver.observe(triggerRef.value)
  }

  if (props.autofocus) {
    nextTick(() => {
      if (props.filterable && inputRef.value) {
        inputRef.value.focus()
      }
    })
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleScroll)

  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

// ==================== Expose ====================

defineExpose<SelectExpose>({
  focus: () => {
    if (props.filterable && inputRef.value) {
      inputRef.value.focus()
    } else {
      triggerRef.value?.focus()
    }
  },
  blur: () => {
    if (props.filterable && inputRef.value) {
      inputRef.value.blur()
    } else {
      triggerRef.value?.blur()
    }
  },
  open: openDropdown,
  close: closeDropdown,
  selectedOptions: computed(() => selectedOptions.value),
  isOpen: computed(() => isOpen.value),
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
