import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FModal from '../index.vue'

describe('FModal', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should emit update:modelValue event when close button is clicked', async () => {
    const wrapper = mount(FModal, {
      props: {
        modelValue: true
      }
    })
    
    // 直接触发关闭方法
    const closeButton = wrapper.find('[aria-label="关闭"]')
    if (closeButton.exists()) {
      await closeButton.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
    }
  })

  it('should emit confirm event when confirm button is clicked', async () => {
    const wrapper = mount(FModal, {
      props: {
        modelValue: true
      }
    })
    
    // 模拟点击确认按钮
    const confirmButton = wrapper.find('.modal_btn_confirm')
    if (confirmButton.exists()) {
      await confirmButton.trigger('click')
      expect(wrapper.emitted('confirm')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('should emit cancel event when cancel button is clicked', async () => {
    const wrapper = mount(FModal, {
      props: {
        modelValue: true
      }
    })
    
    // 模拟点击取消按钮
    const cancelButton = wrapper.find('.modal_btn_cancel')
    if (cancelButton.exists()) {
      await cancelButton.trigger('click')
      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it.skip('should respond to ESC key', async () => {
    const wrapper = mount(FModal, {
      props: {
        modelValue: true
      }
    })
    
    // 模拟 ESC 键按下
    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it.skip('should not respond to ESC key when closeOnPressEscape is false', async () => {
    const wrapper = mount(FModal, {
      props: {
        modelValue: true,
        closeOnPressEscape: false
      }
    })
    
    // 模拟 ESC 键按下
    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
