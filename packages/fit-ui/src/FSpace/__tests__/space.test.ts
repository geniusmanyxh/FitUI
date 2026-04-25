import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import FSpace from '../index.vue'

describe('FSpace', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(FSpace)
    expect(wrapper.classes()).toContain('f-space')
  })

  it('should apply horizontal direction by default', () => {
    const wrapper = shallowMount(FSpace)
    const style = wrapper.attributes('style')
    expect(style).toContain('flex-direction: row')
  })

  it('should apply vertical direction', () => {
    const wrapper = shallowMount(FSpace, {
      props: { direction: 'vertical' }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('flex-direction: column')
  })

  it('should apply custom size', () => {
    const wrapper = shallowMount(FSpace, {
      props: { size: 16 }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('16px')
  })

  it('should apply string size', () => {
    const wrapper = shallowMount(FSpace, {
      props: { size: '1rem' }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('1rem')
  })

  it('should apply wrap property', () => {
    const wrapper = shallowMount(FSpace, {
      props: { wrap: true }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('flex-wrap: wrap')
  })

  it('should apply align property', () => {
    const wrapper = shallowMount(FSpace, {
      props: { align: 'start' }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('align-items: start')
  })
})
