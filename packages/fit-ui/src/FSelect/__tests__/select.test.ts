import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import type { SelectOption } from '../Select'
import FSelect from '..'

type SelectVm = {
  selectedOptions: SelectOption[]
  filteredOptions: SelectOption[]
  handleClear: () => void
  removeTag: (value: string | number) => void
  selectOption: (option: SelectOption) => void
  openDropdown: () => void | Promise<void>
  navigateOptions: (direction: number) => void | Promise<void>
  isOpen: boolean
  hoverIndex: number
}

describe('FSelect', () => {
  const options = [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' },
    { value: '3', label: '选项3' }
  ]

  test('mount with default', () => {
    const wrapper = mount(FSelect, {
      props: {
        modelValue: '',
        options
      }
    })
    expect(wrapper.find('.f-select').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-select--medium')
  })

  test('v-model updates (single)', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FSelect, {
      props: {
        modelValue: '',
        options,
        'onUpdate:modelValue': (value: string | number | (string | number)[]) =>
          wrapper.setProps({ modelValue: value })
      }
    })

    const vm = wrapper.vm as unknown as SelectVm
    expect(vm.selectedOptions).toHaveLength(0)

    await vm.selectOption(options[0])
    expect(wrapper.emitted('update:modelValue')).toEqual([['1']])
    expect(wrapper.emitted('change')).toEqual([['1']])
  })

  test('v-model updates (multiple)', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FSelect, {
      props: {
        modelValue: [],
        options,
        multiple: true,
        'onUpdate:modelValue': (value: string | number | (string | number)[]) =>
          wrapper.setProps({ modelValue: value })
      }
    })

    const vm = wrapper.vm as unknown as SelectVm
    await vm.selectOption(options[0])
    expect(wrapper.emitted('update:modelValue')).toEqual([[['1']]])

    await vm.selectOption(options[1])
    const updateEmits = wrapper.emitted('update:modelValue') ?? []
    expect(updateEmits[1]).toEqual([['1', '2']])
  })

  test('size classes', () => {
    const wrapperSmall = mount(FSelect, { props: { modelValue: '', options, size: 'small' } })
    expect(wrapperSmall.classes()).toContain('f-select--small')
    
    const wrapperLarge = mount(FSelect, { props: { modelValue: '', options, size: 'large' } })
    expect(wrapperLarge.classes()).toContain('f-select--large')
  })

  test('disabled state', () => {
    const wrapper = mount(FSelect, {
      props: { modelValue: '', options, disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('clearable', () => {
    const wrapper = mount(FSelect, {
      props: { modelValue: '1', options, clearable: true }
    })
    expect(wrapper.find('.f-select__clear').exists()).toBe(true)
    
    const vm = wrapper.vm as unknown as SelectVm
    vm.handleClear()
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toEqual([['']])
  })

  test('filterable', () => {
    const wrapper = mount(FSelect, {
      props: { modelValue: '', options, filterable: true }
    })
    expect(wrapper.find('.f-select__input').exists()).toBe(true)
  })

  test('remove tag (multiple)', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FSelect, {
      props: {
        modelValue: ['1', '2'],
        options,
        multiple: true,
        'onUpdate:modelValue': (value: string | number | (string | number)[]) =>
          wrapper.setProps({ modelValue: value })
      }
    })

    const vm = wrapper.vm as unknown as SelectVm
    await vm.removeTag('1')
    expect(wrapper.emitted('update:modelValue')).toEqual([[['2']]])
    expect(wrapper.emitted('remove-tag')).toEqual([['1']])
  })

  test('multiple limit', () => {
    const wrapper = mount(FSelect, {
      props: {
        modelValue: ['1', '2', '3'],
        options,
        multiple: true,
        multipleLimit: 2
      }
    })
    const vm = wrapper.vm as unknown as SelectVm
    expect(vm.selectedOptions).toHaveLength(3)
  })

  test('disabled option', async () => {
    const disabledOptions = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2', disabled: true }
    ]
    let wrapper: VueWrapper
    wrapper = mount(FSelect, {
      props: {
        modelValue: '',
        options: disabledOptions,
        'onUpdate:modelValue': (value: string | number | (string | number)[]) =>
          wrapper.setProps({ modelValue: value })
      }
    })

    const vm = wrapper.vm as unknown as SelectVm
    await vm.selectOption(disabledOptions[1])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('grouped options', () => {
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
    const wrapper = mount(FSelect, {
      props: { modelValue: '', options: groupedOptions }
    })

    const vm = wrapper.vm as unknown as SelectVm
    expect(vm.filteredOptions).toHaveLength(2)
    expect(vm.filteredOptions[0].children).toHaveLength(2)
  })

  test('keyboard navigation', async () => {
    const wrapper = mount(FSelect, {
      props: { modelValue: '', options }
    })

    const vm = wrapper.vm as unknown as SelectVm
    await vm.openDropdown()
    expect(vm.isOpen).toBe(true)

    await vm.navigateOptions(1)
    expect(vm.hoverIndex).toBe(0)
  })

  test('focus and blur events', async () => {
    const wrapper = mount(FSelect, {
      props: { modelValue: '', options, filterable: true }
    })
    
    const input = wrapper.find('.f-select__input')
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})
