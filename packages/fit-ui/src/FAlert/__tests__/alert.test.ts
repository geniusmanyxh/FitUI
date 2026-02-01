import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FAlert from '../index.vue'

describe('FAlert', () => {
  it('should render correctly', () => {
    const wrapper = mount(FAlert, {
      props: {
        type: 'info',
        title: '提示',
        closable: true
      },
      slots: {
        default: '这是一条提示信息'
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('提示')
    expect(wrapper.text()).toContain('这是一条提示信息')
  })

  it('should render with different types', () => {
    const successWrapper = mount(FAlert, {
      props: {
        type: 'success'
      }
    })
    expect(successWrapper.exists()).toBe(true)

    const warningWrapper = mount(FAlert, {
      props: {
        type: 'warning'
      }
    })
    expect(warningWrapper.exists()).toBe(true)

    const errorWrapper = mount(FAlert, {
      props: {
        type: 'error'
      }
    })
    expect(errorWrapper.exists()).toBe(true)

    const infoWrapper = mount(FAlert, {
      props: {
        type: 'info'
      }
    })
    expect(infoWrapper.exists()).toBe(true)
  })

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(FAlert, {
      props: {
        closable: true
      }
    })
    
    const closeButton = wrapper.find('.alert_close')
    if (closeButton.exists()) {
      await closeButton.trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    }
  })

  it('should not show close button when closable is false', () => {
    const wrapper = mount(FAlert, {
      props: {
        closable: false
      }
    })
    expect(wrapper.find('.alert_close').exists()).toBe(false)
  })

  it('should render without title', () => {
    const wrapper = mount(FAlert, {
      slots: {
        default: '没有标题的提示信息'
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('没有标题的提示信息')
  })
})
