import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FDrawer from '..'

describe('FDrawer', () => {
  test('mount with default', () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true }
    })
    expect(wrapper.find('.f-drawer').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-drawer--right')
  })

  test('position variants', () => {
    const wrapperLeft = mount(FDrawer, { props: { visible: true, position: 'left' } })
    expect(wrapperLeft.classes()).toContain('f-drawer--left')
    
    const wrapperTop = mount(FDrawer, { props: { visible: true, position: 'top' } })
    expect(wrapperTop.classes()).toContain('f-drawer--top')
  })

  test('size variants', () => {
    const wrapperSmall = mount(FDrawer, { props: { visible: true, size: 'small' } })
    const container = wrapperSmall.find('.f-drawer__container')
    expect(container.attributes('style')).toContain('width: 300px')
    
    const wrapperLarge = mount(FDrawer, { props: { visible: true, size: 'large' } })
    const containerLarge = wrapperLarge.find('.f-drawer__container')
    expect(containerLarge.attributes('style')).toContain('width: 700px')
  })

  test('custom size', () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, size: 400 }
    })
    const container = wrapper.find('.f-drawer__container')
    expect(container.attributes('style')).toContain('width: 400px')
  })

  test('title', () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, title: '标题' }
    })
    expect(wrapper.find('.f-drawer__title').text()).toBe('标题')
  })

  test('closable', () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, closable: true }
    })
    expect(wrapper.find('.f-drawer__close').exists()).toBe(true)
  })

  test('mask', () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, mask: true }
    })
    expect(wrapper.find('.f-drawer__mask').exists()).toBe(true)
  })

  test('mask closable', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, maskClosable: true, 'onUpdate:visible': (e: boolean) => wrapper.setProps({ visible: e }) }
    })
    
    const mask = wrapper.find('.f-drawer__mask')
    await mask.trigger('click')
    expect(wrapper.emitted('update:visible')).toEqual([[false]])
  })

  test('show footer', () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, showFooter: true }
    })
    expect(wrapper.find('.f-drawer__footer').exists()).toBe(true)
  })

  test('close event', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, 'onUpdate:visible': (e: boolean) => wrapper.setProps({ visible: e }) }
    })
    
    const closeBtn = wrapper.find('.f-drawer__close')
    await closeBtn.trigger('click')
    expect(wrapper.emitted('update:visible')).toEqual([[false]])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('header slot', () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true },
      slots: {
        header: '<div class="custom-header">自定义头部</div>'
      }
    })
    expect(wrapper.find('.f-drawer__header .custom-header').exists()).toBe(true)
  })

  test('footer slot', () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true },
      slots: {
        footer: '<div class="custom-footer">自定义底部</div>'
      }
    })
    expect(wrapper.find('.f-drawer__footer .custom-footer').exists()).toBe(true)
  })
})
