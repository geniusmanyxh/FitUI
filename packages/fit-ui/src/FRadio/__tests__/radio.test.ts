import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FRadio from '../index.vue'

describe('FRadio', () => {
  it('should render correctly', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: 'a',
        value: 'a',
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-radio')
  })

  it('should render with label slot', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: 'a',
        value: 'a',
        label: 'Test Label',
      },
      slots: {
        default: 'Test Label'
      }
    })
    expect(wrapper.text()).toContain('Test Label')
    expect(wrapper.find('.f-radio__label').exists()).toBe(true)
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: 'a',
        value: 'a',
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('should emit update:modelValue event when clicked', async () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: 'a',
        value: 'b',
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['b'])
  })

  it('should not emit event when disabled', async () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: 'a',
        value: 'b',
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should show as checked when value matches modelValue', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: 'a',
        value: 'a',
      }
    })
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('should have correct aria attributes', () => {
    const wrapper = mount(FRadio, {
      props: {
        modelValue: 'a',
        value: 'a',
      }
    })
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.attributes('role')).toBe('radio')
  })
})
