import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import FInputNumber from '..'

type InputNumberVm = {
  increase: () => void | Promise<void>
  decrease: () => void | Promise<void>
  setCurrentValue: (value: number) => void
  currentValue: number | null
  minDisabled: boolean
  maxDisabled: boolean
}

describe('FInputNumber', () => {
  test('mount with default', () => {
    const wrapper = mount(FInputNumber, {
      props: {
        modelValue: 0
      }
    })
    expect(wrapper.find('.f-input-number').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-input-number--medium')
  })

  test('v-model updates', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FInputNumber, {
      props: {
        modelValue: 1,
        'onUpdate:modelValue': (value: number | null) => wrapper.setProps({ modelValue: value })
      }
    })
    const vm = wrapper.vm as unknown as InputNumberVm

    await vm.increase()
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
    expect(wrapper.emitted('change')).toBeTruthy()

    await vm.decrease()
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([1])
  })

  test('min and max constraints', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FInputNumber, {
      props: {
        modelValue: 5,
        min: 0,
        max: 10,
        'onUpdate:modelValue': (value: number | null) => wrapper.setProps({ modelValue: value })
      }
    })

    const vm = wrapper.vm as unknown as InputNumberVm

    vm.setCurrentValue(15)
    expect(vm.currentValue).toBe(10)

    vm.setCurrentValue(-5)
    expect(vm.currentValue).toBe(0)
  })

  test('step control', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FInputNumber, {
      props: {
        modelValue: 0,
        step: 5,
        'onUpdate:modelValue': (value: number | null) => wrapper.setProps({ modelValue: value })
      }
    })

    const vm = wrapper.vm as unknown as InputNumberVm

    await vm.increase()
    expect(wrapper.emitted('update:modelValue')).toEqual([[5]])

    await vm.decrease()
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([0])
  })

  test('precision control', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FInputNumber, {
      props: {
        modelValue: 0,
        step: 0.1,
        precision: 2,
        'onUpdate:modelValue': (value: number | null) => wrapper.setProps({ modelValue: value })
      }
    })

    const vm = wrapper.vm as unknown as InputNumberVm

    vm.setCurrentValue(1.234)
    expect(vm.currentValue).toBe(1.23)
  })

  test('size classes', () => {
    const wrapperSmall = mount(FInputNumber, { props: { modelValue: 0, size: 'small' } })
    expect(wrapperSmall.classes()).toContain('f-input-number--small')
    
    const wrapperLarge = mount(FInputNumber, { props: { modelValue: 0, size: 'large' } })
    expect(wrapperLarge.classes()).toContain('f-input-number--large')
  })

  test('disabled state', () => {
    const wrapper = mount(FInputNumber, {
      props: { modelValue: 0, disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('.f-input-number__inner').classes()).toContain('is-disabled')
  })

  test('controls position', () => {
    const wrapperRight = mount(FInputNumber, {
      props: { modelValue: 0, controlsPosition: 'right' }
    })
    expect(wrapperRight.classes()).toContain('is-controls-right')
  })

  test('without controls', () => {
    const wrapper = mount(FInputNumber, {
      props: { modelValue: 0, controls: false }
    })
    expect(wrapper.classes()).toContain('is-without-controls')
    expect(wrapper.find('.f-input-number__decrease').exists()).toBe(false)
    expect(wrapper.find('.f-input-number__increase').exists()).toBe(false)
  })

  test('keyboard navigation', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FInputNumber, {
      props: {
        modelValue: 5,
        'onUpdate:modelValue': (value: number | null) => wrapper.setProps({ modelValue: value })
      }
    })

    const input = wrapper.find('.f-input-number__inner')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[6]])
    
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([5])
  })

  test('focus and blur events', async () => {
    const wrapper = mount(FInputNumber, {
      props: { modelValue: 0 }
    })
    
    const input = wrapper.find('.f-input-number__inner')
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  test('step strictly', async () => {
    let wrapper: VueWrapper
    wrapper = mount(FInputNumber, {
      props: {
        modelValue: 0,
        step: 3,
        stepStrictly: true,
        'onUpdate:modelValue': (value: number | null) => wrapper.setProps({ modelValue: value })
      }
    })

    const vm = wrapper.vm as unknown as InputNumberVm

    vm.setCurrentValue(5)
    expect(vm.currentValue).toBe(6)
  })

  test('min disabled when at minimum', () => {
    const wrapper = mount(FInputNumber, {
      props: {
        modelValue: 0,
        min: 0
      }
    })

    const vm = wrapper.vm as unknown as InputNumberVm
    expect(vm.minDisabled).toBe(true)
    expect(wrapper.find('.f-input-number__decrease').classes()).toContain('is-disabled')
  })

  test('max disabled when at maximum', () => {
    const wrapper = mount(FInputNumber, {
      props: {
        modelValue: 10,
        max: 10
      }
    })

    const vm = wrapper.vm as unknown as InputNumberVm
    expect(vm.maxDisabled).toBe(true)
    expect(wrapper.find('.f-input-number__increase').classes()).toContain('is-disabled')
  })
})
