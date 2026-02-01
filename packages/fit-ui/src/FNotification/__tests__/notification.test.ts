import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FNotification from '..'

describe('FNotification', () => {
  test('mount with default', () => {
    const wrapper = mount(FNotification, {
      props: { visible: true, message: '这是一条通知' }
    })
    expect(wrapper.find('.f-notification').exists()).toBe(true)
  })

  test('type variants', () => {
    const wrapperSuccess = mount(FNotification, {
      props: { visible: true, type: 'success', message: '成功' }
    })
    expect(wrapperSuccess.classes()).toContain('f-notification--success')
    
    const wrapperError = mount(FNotification, {
      props: { visible: true, type: 'error', message: '错误' }
    })
    expect(wrapperError.classes()).toContain('f-notification--error')
  })

  test('title and message', () => {
    const wrapper = mount(FNotification, {
      props: { visible: true, title: '标题', message: '消息内容' }
    })
    expect(wrapper.find('.f-notification__title').text()).toBe('标题')
    expect(wrapper.find('.f-notification__text').text()).toBe('消息内容')
  })

  test('position variants', () => {
    const wrapperTopLeft = mount(FNotification, {
      props: { visible: true, message: '消息', position: 'top-left' }
    })
    expect(wrapperTopLeft.classes()).toContain('f-notification--top-left')
  })

  test('show close button', () => {
    const wrapper = mount(FNotification, {
      props: { visible: true, message: '消息', showClose: true }
    })
    expect(wrapper.find('.f-notification__close').exists()).toBe(true)
  })

  test('close event', async () => {
    const wrapper = mount(FNotification, {
      props: { visible: true, message: '消息' }
    })
    
    const closeBtn = wrapper.find('.f-notification__close')
    await closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
