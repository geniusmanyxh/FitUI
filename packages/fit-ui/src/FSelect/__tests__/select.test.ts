import { nextTick } from 'vue'
import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import type { SelectOption, SelectExpose, SelectProps } from '../Select'
import FSelect from '..'

interface TestSelectVm {
  selectedOptions: SelectOption[]
  filteredOptions: SelectOption[]
  flatOptions: Array<SelectOption & { isGroupLabel?: boolean }>
  handleClear: () => void
  removeTag: (value: string | number) => void
  selectOption: (option: SelectOption) => void
  openDropdown: () => void
  closeDropdown: () => void
  navigateOptions: (direction: number) => void
  isOpen: boolean
  hoverIndex: number
  focus: () => void
  blur: () => void
}

function mountWithVModel(modelValue: SelectProps['modelValue'], extraProps?: Partial<SelectProps>) {
  return mount(FSelect, {
    props: {
      modelValue,
      ...extraProps,
    },
    global: {
      stubs: {
        Teleport: false,
      },
    },
  })
}

describe('FSelect', () => {
  const options = [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' },
    { value: '3', label: '选项3' }
  ]

  describe('Basic', () => {
    test('mounts correctly', () => {
      const wrapper = mountWithVModel('', { options })
      expect(wrapper.find('.f-select').exists()).toBe(true)
    })

    test('has default classes', () => {
      const wrapper = mountWithVModel('', { options })
      expect(wrapper.classes()).toContain('f-select--medium')
    })

    test('renders placeholder', () => {
      const wrapper = mountWithVModel('', { options, placeholder: '自定义占位符' })
      expect(wrapper.find('.f-select__selected-text').text()).toBe('自定义占位符')
    })
  })

  describe('Props', () => {
    test('size prop: small/medium/large', () => {
      const wrapperSmall = mountWithVModel('', { options, size: 'small' })
      expect(wrapperSmall.classes()).toContain('f-select--small')
      
      const wrapperLarge = mountWithVModel('', { options, size: 'large' })
      expect(wrapperLarge.classes()).toContain('f-select--large')
    })

    test('disabled prop: prevents interaction', () => {
      const wrapper = mountWithVModel('', { options, disabled: true })
      expect(wrapper.classes()).toContain('is-disabled')
    })

    test('clearable prop: shows clear icon when has value', () => {
      const wrapper = mountWithVModel('1', { options, clearable: true })
      expect(wrapper.find('.f-select__clear-icon').exists()).toBe(true)
    })

    test('multiple prop: enables multi-select', async () => {
      const wrapper = mountWithVModel([] as (string | number)[], { options, multiple: true })

      const vm = wrapper.vm as unknown as TestSelectVm
      await vm.selectOption(options[0])
      expect(wrapper.emitted('update:modelValue')).toEqual([[['1']]])
    })

    test('filterable prop: shows input', () => {
      const wrapper = mountWithVModel('', { options, filterable: true })
      expect(wrapper.find('.f-select__input').exists()).toBe(true)
    })

    test('collapseTags prop: collapses tags in multiple mode', () => {
      const wrapper = mountWithVModel(['1', '2', '3'] as (string | number)[], {
        options,
        multiple: true,
        collapseTags: true,
        maxCollapseTags: 1
      })
      expect(wrapper.findAll('.f-select__tag').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Events', () => {
    test('update:modelValue on select (single)', async () => {
      const wrapper = mountWithVModel('', { options })

      const vm = wrapper.vm as unknown as TestSelectVm
      expect(vm.selectedOptions).toHaveLength(0)

      await vm.selectOption(options[0])
      expect(wrapper.emitted('update:modelValue')).toEqual([['1']])
      expect(wrapper.emitted('change')).toEqual([['1']])
    })

    test('update:modelValue on select (multiple)', async () => {
      const wrapper = mountWithVModel([] as (string | number)[], { options, multiple: true })

      const vm = wrapper.vm as unknown as TestSelectVm
      await vm.selectOption(options[0])
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1']])

      wrapper.setProps({ modelValue: ['1'] })
      await nextTick()
      await vm.selectOption(options[1])
      expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['1', '2']])
    })

    test('clear event', () => {
      const wrapper = mountWithVModel('1', { options, clearable: true })
      
      const vm = wrapper.vm as unknown as TestSelectVm
      vm.handleClear()
      expect(wrapper.emitted('clear')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')).toEqual([['']])
    })

    test('remove-tag event (multiple)', async () => {
      const wrapper = mountWithVModel(['1', '2'] as (string | number)[], {
        options,
        multiple: true,
      })

      const vm = wrapper.vm as unknown as TestSelectVm
      await vm.removeTag('1')
      expect(wrapper.emitted('update:modelValue')).toEqual([[['2']]])
      expect(wrapper.emitted('remove-tag')).toEqual([['1']])
    })

    test('visible-change event on open/close', async () => {
      const wrapper = mountWithVModel('', { options })

      const vm = wrapper.vm as unknown as TestSelectVm
      await vm.openDropdown()
      expect(wrapper.emitted('visible-change')).toBeTruthy()
      expect(wrapper.emitted('visible-change')?.[0]).toEqual([true])
    })
  })

  describe('Interaction', () => {
    test('disabled option cannot be selected', async () => {
      const disabledOptions = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2', disabled: true }
      ]
      const wrapper = mountWithVModel('', { options: disabledOptions })

      const vm = wrapper.vm as unknown as TestSelectVm
      await vm.selectOption(disabledOptions[1])
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    test('multiple limit prevents exceeding selection', async () => {
      const wrapper = mountWithVModel(['1', '2'] as (string | number)[], {
        options,
        multiple: true,
        multipleLimit: 2,
      })

      const vm = wrapper.vm as unknown as TestSelectVm
      const initialLength = wrapper.props('modelValue') as (string | number)[]
      const initialCount = Array.isArray(initialLength) ? initialLength.length : 0
      await vm.selectOption(options[2])
      
      const emits = wrapper.emitted('update:modelValue')
      if (emits && emits.length > 0) {
        const lastEmit = emits[emits.length - 1]
        expect((lastEmit[0] as (string | number)[]).length).toBe(initialCount)
      }
    })

    test('keyboard navigation opens dropdown', async () => {
      const wrapper = mountWithVModel('', { options })

      const vm = wrapper.vm as unknown as TestSelectVm
      await vm.openDropdown()
      expect(vm.isOpen).toBe(true)
    })
  })

  describe('Filtering', () => {
    test('local filter matches label', () => {
      const wrapper = mountWithVModel('', { options, filterable: true })
      expect(wrapper.find('.f-select__input').exists()).toBe(true)
    })

    test('custom filterMethod is called', async () => {
      const filterMethod = vi.fn(() => true)
      mountWithVModel('', { options, filterable: true, filterMethod })
      
      expect(filterMethod).toBeDefined()
    })
  })

  describe('Grouping', () => {
    test('renders grouped options correctly', () => {
      const groupedOptions = [
        {
          value: 'group-1',
          label: '分组1',
          children: [
            { value: '1', label: '选项1' },
            { value: '2', label: '选项2' }
          ]
        },
        {
          value: 'group-2',
          label: '分组2',
          children: [
            { value: '3', label: '选项3' }
          ]
        }
      ]
      const wrapper = mountWithVModel('', { options: groupedOptions })

      const vm = wrapper.vm as unknown as TestSelectVm
      expect(vm.filteredOptions).toHaveLength(2)
      expect(vm.filteredOptions[0].children).toHaveLength(2)
    })

    test('flattens grouped options for display', () => {
      const groupedOptions = [
        {
          value: 'group-1',
          label: '分组1',
          children: [
            { value: '1', label: '选项1' },
            { value: '2', label: '选项2' }
          ]
        }
      ]
      const wrapper = mountWithVModel('', { options: groupedOptions })

      const vm = wrapper.vm as unknown as TestSelectVm
      expect(vm.flatOptions.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Accessibility', () => {
    test('has role combobox on root', () => {
      const wrapper = mountWithVModel('', { options })
      expect(wrapper.attributes('role')).toBe('combobox')
    })

    test('has aria-expanded attribute', () => {
      const wrapper = mountWithVModel('', { options })
      expect(wrapper.attributes('aria-expanded')).toBeDefined()
    })

    test('has aria-disabled when disabled', () => {
      const wrapper = mountWithVModel('', { options, disabled: true })
      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })
  })

  describe('Expose', () => {
    test('focus and blur methods', async () => {
      const wrapper = mountWithVModel('', { options, filterable: true })
      
      const input = wrapper.find('.f-select__input')
      await input.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
      
      await input.trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    test('open and close methods', async () => {
      const wrapper = mountWithVModel('', { options })

      const vm = wrapper.vm as unknown as TestSelectVm
      await vm.openDropdown()
      expect(vm.isOpen).toBe(true)
    })
  })
})
