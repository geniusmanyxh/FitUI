import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FEmpty from '..'

describe('FEmpty', () => {
  test('mount with default', () => {
    const wrapper = mount(FEmpty)
    expect(wrapper.find('.f-empty').exists()).toBe(true)
    expect(wrapper.find('.f-empty__description p').text()).toBe('暂无数据')
  })

  test('custom description', () => {
    const wrapper = mount(FEmpty, {
      props: { description: '没有找到相关内容' }
    })
    expect(wrapper.find('.f-empty__description p').text()).toBe('没有找到相关内容')
  })

  test('custom image', () => {
    const wrapper = mount(FEmpty, {
      props: { image: '/empty.png' }
    })
    expect(wrapper.find('.f-empty__image img').exists()).toBe(true)
    expect(wrapper.find('.f-empty__image img').attributes('src')).toBe('/empty.png')
  })

  test('image slot', () => {
    const wrapper = mount(FEmpty, {
      slots: {
        image: '<div class="custom-image">自定义图片</div>'
      }
    })
    expect(wrapper.find('.f-empty__image .custom-image').exists()).toBe(true)
  })

  test('description slot', () => {
    const wrapper = mount(FEmpty, {
      slots: {
        description: '<p class="custom-desc">自定义描述</p>'
      }
    })
    expect(wrapper.find('.f-empty__description .custom-desc').exists()).toBe(true)
  })

  test('default slot', () => {
    const wrapper = mount(FEmpty, {
      slots: {
        default: '<button class="action">操作按钮</button>'
      }
    })
    expect(wrapper.find('.f-empty__default .action').exists()).toBe(true)
  })

  test('click event', async () => {
    const wrapper = mount(FEmpty)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
