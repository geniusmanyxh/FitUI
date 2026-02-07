import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FCheckbox from '../index.vue'

describe('FCheckbox', () => {
  it('should render correctly', () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-checkbox')
  })

  it('should render with label slot', () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: false,
        label: 'Test Label',
      },
      slots: {
        default: 'Test Label'
      }
    })
    expect(wrapper.text()).toContain('Test Label')
    expect(wrapper.find('.f-checkbox__label').exists()).toBe(true)
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('should emit update:modelValue event when clicked', async () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('should not emit event when disabled', async () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should respond to keyboard events', async () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: false
      }
    })
    await wrapper.trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('should have correct aria attributes', () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.attributes('role')).toBe('checkbox')
  })

  it('should support indeterminate', () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: false,
        indeterminate: true,
      }
    })
    expect(wrapper.classes()).toContain('is-indeterminate')
    expect(wrapper.attributes('aria-checked')).toBe('mixed')
  })

  it('should support border prop', () => {
    const wrapper = mount(FCheckbox, {
      props: {
        modelValue: false,
        border: true,
      }
    })
    expect(wrapper.classes()).toContain('is-bordered')
  })
})
