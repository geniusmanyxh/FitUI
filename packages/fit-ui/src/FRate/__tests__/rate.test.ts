import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import FRate from '../index.vue'

describe('FRate', () => {
  it('should render correctly with default props', () => {
    const wrapper = shallowMount(FRate)
    expect(wrapper.classes()).toContain('f-rate')
    expect(wrapper.findAll('.f-rate__item')).toHaveLength(5)
  })

  it('should apply custom max value', () => {
    const wrapper = shallowMount(FRate, {
      props: { max: 10 }
    })
    expect(wrapper.findAll('.f-rate__item')).toHaveLength(10)
  })

  it('should render correct aria attributes', () => {
    const wrapper = shallowMount(FRate)
    expect(wrapper.attributes('role')).toBe('radiogroup')
    expect(wrapper.attributes('aria-label')).toBe('Rating')
  })

  it('should emit change event on click', async () => {
    const wrapper = shallowMount(FRate)
    await wrapper.find('.f-rate__item').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('should not emit when disabled', async () => {
    const wrapper = shallowMount(FRate, {
      props: { disabled: true }
    })
    await wrapper.find('.f-rate__item').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should show text when showText is true', () => {
    const wrapper = shallowMount(FRate, {
      props: { showText: true, modelValue: 3 }
    })
    expect(wrapper.find('.f-rate__text').exists()).toBe(true)
  })

  it('should apply disabled class', () => {
    const wrapper = shallowMount(FRate, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })
})
