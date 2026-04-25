import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import FSlider from '../index.vue'

describe('FSlider', () => {
  it('should render correctly with default props', () => {
    const wrapper = shallowMount(FSlider)
    expect(wrapper.classes()).toContain('f-slider')
  })

  it('should apply correct aria attributes', () => {
    const wrapper = shallowMount(FSlider)
    expect(wrapper.attributes('role')).toBe('slider')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')
  })

  it('should apply disabled class', () => {
    const wrapper = shallowMount(FSlider, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('should apply vertical class', () => {
    const wrapper = shallowMount(FSlider, {
      props: { vertical: true }
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })

  it('should render input when showInput is true', () => {
    const wrapper = shallowMount(FSlider, {
      props: { showInput: true }
    })
    expect(wrapper.find('.f-slider__input').exists()).toBe(true)
  })
})
