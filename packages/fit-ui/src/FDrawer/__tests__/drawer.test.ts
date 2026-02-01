import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import FDrawer from '..'

describe('FDrawer', () => {
  test('mount with default', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-drawer')).toBeTruthy()
    wrapper.unmount()
  })

  test('position variants', async () => {
    const wrapperLeft = mount(FDrawer, { props: { visible: true, position: 'left' }, attachTo: document.body })
    await nextTick()
    expect(document.querySelector('.f-drawer')?.classList.contains('f-drawer--left')).toBe(true)
    wrapperLeft.unmount()
    
    const wrapperTop = mount(FDrawer, { props: { visible: true, position: 'top' }, attachTo: document.body })
    await nextTick()
    expect(document.querySelector('.f-drawer')?.classList.contains('f-drawer--top')).toBe(true)
    wrapperTop.unmount()
  })

  test('size variants', async () => {
    const wrapperSmall = mount(FDrawer, { props: { visible: true, size: 'small' }, attachTo: document.body })
    await nextTick()
    const container = document.querySelector('.f-drawer__container')
    expect(container?.getAttribute('style')).toContain('width: 300px')
    wrapperSmall.unmount()
    
    const wrapperLarge = mount(FDrawer, { props: { visible: true, size: 'large' }, attachTo: document.body })
    await nextTick()
    const containerLarge = document.querySelector('.f-drawer__container')
    expect(containerLarge?.getAttribute('style')).toContain('width: 700px')
    wrapperLarge.unmount()
  })

  test('custom size', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, size: 400 },
      attachTo: document.body
    })
    await nextTick()
    const container = document.querySelector('.f-drawer__container')
    expect(container?.getAttribute('style')).toContain('width: 400px')
    wrapper.unmount()
  })

  test('title', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, title: '标题' },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-drawer__title')?.textContent).toBe('标题')
    wrapper.unmount()
  })

  test('closable', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, closable: true },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-drawer__close')).toBeTruthy()
    wrapper.unmount()
  })

  test('mask', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, mask: true },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-drawer__mask')).toBeTruthy()
    wrapper.unmount()
  })

  test('mask closable', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, maskClosable: true, 'onUpdate:visible': (e: boolean) => wrapper.setProps({ visible: e }) },
      attachTo: document.body
    })
    await nextTick()
    
    const mask = document.querySelector('.f-drawer__mask')
    if (mask) {
      await mask.dispatchEvent(new MouseEvent('click'))
      expect(wrapper.emitted('update:visible')).toEqual([[false]])
    }
    wrapper.unmount()
  })

  test('show footer', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, showFooter: true },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-drawer__footer')).toBeTruthy()
    wrapper.unmount()
  })

  test('close event', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true, 'onUpdate:visible': (e: boolean) => wrapper.setProps({ visible: e }) },
      attachTo: document.body
    })
    await nextTick()
    
    const closeBtn = document.querySelector('.f-drawer__close')
    if (closeBtn) {
      await closeBtn.dispatchEvent(new MouseEvent('click'))
      expect(wrapper.emitted('update:visible')).toEqual([[false]])
      expect(wrapper.emitted('close')).toBeTruthy()
    }
    wrapper.unmount()
  })

  test('header slot', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true },
      slots: {
        header: '<div class="custom-header">自定义头部</div>'
      },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-drawer__header .custom-header')).toBeTruthy()
    wrapper.unmount()
  })

  test('footer slot', async () => {
    const wrapper = mount(FDrawer, {
      props: { visible: true },
      slots: {
        footer: '<div class="custom-footer">自定义底部</div>'
      },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-drawer__footer .custom-footer')).toBeTruthy()
    wrapper.unmount()
  })
})
