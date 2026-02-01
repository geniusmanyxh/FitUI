import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FLoading from '../index.vue'

describe('FLoading', () => {
  it('should render correctly', () => {
    const wrapper = mount(FLoading, {
      props: {
        text: 'Loading...'
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Loading...')
  })

  it('should render with different sizes', () => {
    const smallWrapper = mount(FLoading, {
      props: {
        size: 'small'
      }
    })
    expect(smallWrapper.exists()).toBe(true)

    const mediumWrapper = mount(FLoading, {
      props: {
        size: 'medium'
      }
    })
    expect(mediumWrapper.exists()).toBe(true)

    const largeWrapper = mount(FLoading, {
      props: {
        size: 'large'
      }
    })
    expect(largeWrapper.exists()).toBe(true)
  })

  it('should render with different types', () => {
    const spinWrapper = mount(FLoading, {
      props: {
        type: 'spin'
      }
    })
    expect(spinWrapper.exists()).toBe(true)

    const pulseWrapper = mount(FLoading, {
      props: {
        type: 'pulse'
      }
    })
    expect(pulseWrapper.exists()).toBe(true)

    const dotsWrapper = mount(FLoading, {
      props: {
        type: 'dots'
      }
    })
    expect(dotsWrapper.exists()).toBe(true)
  })

  it('should render without text', () => {
    const wrapper = mount(FLoading)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.loading_text').exists()).toBe(false)
  })
})
