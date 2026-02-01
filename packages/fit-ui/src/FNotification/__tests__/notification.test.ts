import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import FNotification from '..'

describe('FNotification', () => {
  test('mount with default', async () => {
    const wrapper = mount(FNotification, {
      props: { visible: true, message: '这是一条通知' },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-notification')).toBeTruthy()
    wrapper.unmount()
  })

  test('type variants', async () => {
    const wrapperSuccess = mount(FNotification, {
      props: { visible: true, type: 'success', message: '成功' },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-notification')?.classList.contains('f-notification--success')).toBe(true)
    wrapperSuccess.unmount()
    
    const wrapperError = mount(FNotification, {
      props: { visible: true, type: 'error', message: '错误' },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-notification')?.classList.contains('f-notification--error')).toBe(true)
    wrapperError.unmount()
  })

  test('title and message', async () => {
    const wrapper = mount(FNotification, {
      props: { visible: true, title: '标题', message: '消息内容' },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-notification__title')?.textContent).toBe('标题')
    expect(document.querySelector('.f-notification__text')?.textContent).toBe('消息内容')
    wrapper.unmount()
  })

  test('position variants', async () => {
    const wrapperTopLeft = mount(FNotification, {
      props: { visible: true, message: '消息', position: 'top-left' },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-notification')?.classList.contains('f-notification--top-left')).toBe(true)
    wrapperTopLeft.unmount()
  })

  test('show close button', async () => {
    const wrapper = mount(FNotification, {
      props: { visible: true, message: '消息', showClose: true },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.f-notification__close')).toBeTruthy()
    wrapper.unmount()
  })

  test('close event', async () => {
    const wrapper = mount(FNotification, {
      props: { visible: true, message: '消息' },
      attachTo: document.body
    })
    await nextTick()
    
    const closeBtn = document.querySelector('.f-notification__close')
    if (closeBtn) {
      await closeBtn.dispatchEvent(new MouseEvent('click'))
      expect(wrapper.emitted('close')).toBeTruthy()
    }
    wrapper.unmount()
  })
})
