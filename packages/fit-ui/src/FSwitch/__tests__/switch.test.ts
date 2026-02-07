import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FSwitch from '../index.vue'

describe('FSwitch', () => {
  it('should render correctly', () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-switch')
  })

  it('should render with activeText/inactiveText', () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: false,
        activeText: '开启',
        inactiveText: '关闭',
      }
    })
    expect(wrapper.text()).toContain('关闭')
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('should emit update:modelValue event when clicked', async () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('should not emit event when disabled', async () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should respond to keyboard events', async () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: false
      }
    })
    await wrapper.trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('should have correct aria attributes', () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.attributes('role')).toBe('switch')
  })

  it('should show loading state', () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: false,
        loading: true
      }
    })
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('should support custom activeValue/inactiveValue', async () => {
    const wrapper = mount(FSwitch, {
      props: {
        modelValue: 'no',
        activeValue: 'yes',
        inactiveValue: 'no'
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['yes'])
  })
})
