import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FPopover from '..'

describe('FPopover', () => {
  test('mount with default', () => {
    const wrapper = mount(FPopover, {
      props: { visible: true }
    })
    expect(wrapper.find('.f-popover').exists()).toBe(true)
  })

  test('visible prop', () => {
    const wrapper = mount(FPopover, {
      props: { visible: true }
    })
    expect(wrapper.find('.f-popover__content').exists()).toBe(true)
  })

  test('trigger variants', () => {
    const wrapperHover = mount(FPopover, { props: { visible: true, trigger: 'hover' } })
    expect(wrapper.find('.f-popover__trigger').exists()).toBe(true)
  })

  test('placement variants', () => {
    const wrapperTop = mount(FPopover, { props: { visible: true, placement: 'top' } })
    expect(wrapper.find('.f-popover__content').classes()).toContain('f-popover__content--top')
  })

  test('width prop', () => {
    const wrapper = mount(FPopover, {
      props: { visible: true, width: 300 }
    })
    const content = wrapper.find('.f-popover__content')
    expect(content.attributes('style')).toContain('width: 300px')
  })

  test('show arrow', () => {
    const wrapper = mount(FPopover, {
      props: { visible: true, showArrow: true }
    })
    expect(wrapper.find('.f-popover__arrow').exists()).toBe(true)
  })

  test('disabled state', () => {
    const wrapper = mount(FPopover, {
      props: { visible: true, disabled: true }
    })
    expect(wrapper.find('.f-popover__trigger').exists()).toBe(true)
  })

  test('default slot', () => {
    const wrapper = mount(FPopover, {
      props: { visible: true },
      slots: {
        default: '<button>触发元素</button>'
      }
    })
    expect(wrapper.find('.f-popover__trigger button').exists()).toBe(true)
  })

  test('content slot', () => {
    const wrapper = mount(FPopover, {
      props: { visible: true },
      slots: {
        content: '<div class="popover-content">弹出内容</div>'
      }
    })
    expect(wrapper.find('.f-popover__inner .popover-content').exists()).toBe(true)
  })
})
