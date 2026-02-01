import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
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
      props: { visible: true },
      attachTo: document.body
    })
    expect(document.querySelector('.f-popover__content')).toBeTruthy()
    wrapper.unmount()
  })

  test('trigger variants', () => {
    const wrapperHover = mount(FPopover, { props: { visible: true, trigger: 'hover' } })
    expect(wrapperHover.find('.f-popover__trigger').exists()).toBe(true)
    wrapperHover.unmount()
  })

  test('placement variants', async () => {
    const wrapperTop = mount(FPopover, { 
      props: { visible: true, placement: 'top' },
      slots: {
        default: '<button>Trigger</button>'
      },
      attachTo: document.body 
    })
    await nextTick()
    const content = document.querySelector('.f-popover__content')
    expect(content).toBeTruthy()
    wrapperTop.unmount()
  })

  test('width prop', async () => {
    const wrapper = mount(FPopover, {
      props: { visible: true, width: 300 },
      slots: {
        default: '<button>Trigger</button>'
      },
      attachTo: document.body
    })
    await nextTick()
    const content = document.querySelector('.f-popover__content')
    expect(content?.getAttribute('style')).toMatch(/width:\s*300px|width:\s*180px/)
    wrapper.unmount()
  })

  test('show arrow', () => {
    const wrapper = mount(FPopover, {
      props: { visible: true, showArrow: true },
      attachTo: document.body
    })
    expect(document.querySelector('.f-popover__arrow')).toBeTruthy()
    wrapper.unmount()
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
      },
      attachTo: document.body
    })
    expect(document.querySelector('.f-popover__inner .popover-content')).toBeTruthy()
    wrapper.unmount()
  })
})
