import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FResult from '..'

describe('FResult', () => {
  test('mount with default', () => {
    const wrapper = mount(FResult, {
      props: { title: '操作成功' }
    })
    expect(wrapper.find('.f-result').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-result--info')
  })

  test('status variants', () => {
    const wrapperSuccess = mount(FResult, {
      props: { title: '成功', status: 'success' }
    })
    expect(wrapperSuccess.classes()).toContain('f-result--success')
    
    const wrapperError = mount(FResult, {
      props: { title: '错误', status: 'error' }
    })
    expect(wrapperError.classes()).toContain('f-result--error')
  })

  test('title and subtitle', () => {
    const wrapper = mount(FResult, {
      props: { title: '标题', subTitle: '副标题' }
    })
    expect(wrapper.find('.f-result__title').text()).toBe('标题')
    expect(wrapper.find('.f-result__subtitle').text()).toBe('副标题')
  })

  test('custom icon', () => {
    const wrapper = mount(FResult, {
      props: { title: '标题', icon: 'custom-icon' }
    })
    expect(wrapper.find('.f-result__icon').exists()).toBe(true)
  })

  test('icon slot', () => {
    const wrapper = mount(FResult, {
      props: { title: '标题' },
      slots: {
        icon: '<div class="custom-icon">自定义图标</div>'
      }
    })
    expect(wrapper.find('.f-result__icon .custom-icon').exists()).toBe(true)
  })

  test('title slot', () => {
    const wrapper = mount(FResult, {
      props: { title: '标题' },
      slots: {
        title: '<h1 class="custom-title">自定义标题</h1>'
      }
    })
    expect(wrapper.find('.f-result__title .custom-title').exists()).toBe(true)
  })

  test('subTitle slot', () => {
    const wrapper = mount(FResult, {
      props: { title: '标题' },
      slots: {
        subTitle: '<p class="custom-subtitle">自定义副标题</p>'
      }
    })
    expect(wrapper.find('.f-result__subtitle .custom-subtitle').exists()).toBe(true)
  })

  test('extra slot', () => {
    const wrapper = mount(FResult, {
      props: { title: '标题' },
      slots: {
        extra: '<div class="extra-content">额外内容</div>'
      }
    })
    expect(wrapper.find('.f-result__extra .extra-content').exists()).toBe(true)
  })

  test('default slot', () => {
    const wrapper = mount(FResult, {
      props: { title: '标题' },
      slots: {
        default: '<div class="content">主要内容</div>'
      }
    })
    expect(wrapper.find('.f-result__content .content').exists()).toBe(true)
  })

  test('click event', async () => {
    const wrapper = mount(FResult, {
      props: { title: '标题' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
