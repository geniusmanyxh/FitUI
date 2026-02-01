import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FRadio from '../index.vue'

describe('FRadio', () => {
  it('should render correctly', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('radio_wrapper')
  })

  it('should render with label', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: false,
        label: true
      },
      slots: {
        default: 'Test Label'
      }
    })
    expect(wrapper.text()).toContain('Test Label')
    expect(wrapper.find('.radio_label').exists()).toBe(true)
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('radio_disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('should emit update:modelValue event when clicked', async () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('should not emit event when disabled', async () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should respond to keyboard events', async () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: false
      }
    })
    await wrapper.trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    
    // Reset
    await wrapper.setProps({ modelValue: false })
    await wrapper.trigger('keydown.space')
    expect(wrapper.emitted('update:modelValue')![1]).toEqual([true])
  })

  it('should have correct aria attributes', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.attributes('role')).toBe('radio')
  })
})
