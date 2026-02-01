import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FBadge from '..'

describe('FBadge', () => {
  test('mount with default', () => {
    const wrapper = mount(FBadge)
    expect(wrapper.find('.f-badge').exists()).toBe(true)
  })

  test('value display', () => {
    const wrapper = mount(FBadge, {
      props: { value: 5 }
    })
    expect(wrapper.find('.f-badge__value').text()).toBe('5')
  })

  test('max value', () => {
    const wrapper = mount(FBadge, {
      props: { value: 150, max: 99 }
    })
    expect(wrapper.find('.f-badge__value').text()).toBe('99+')
  })

  test('dot mode', () => {
    const wrapper = mount(FBadge, {
      props: { value: 5, isDot: true }
    })
    expect(wrapper.find('.f-badge__content').classes()).toContain('f-badge__content--dot')
    expect(wrapper.find('.f-badge__value').exists()).toBe(false)
  })

  test('hidden state', () => {
    const wrapper = mount(FBadge, {
      props: { value: 5, hidden: true }
    })
    expect(wrapper.find('.f-badge__content').exists()).toBe(false)
  })

  test('type variants', () => {
    const wrapperPrimary = mount(FBadge, { props: { value: 5, type: 'primary' } })
    expect(wrapperPrimary.find('.f-badge__content').classes()).toContain('f-badge__content--primary')
    
    const wrapperSuccess = mount(FBadge, { props: { value: 5, type: 'success' } })
    expect(wrapperSuccess.find('.f-badge__content').classes()).toContain('f-badge__content--success')
  })

  test('click event', async () => {
    const wrapper = mount(FBadge, {
      props: { value: 5 }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('slot content', () => {
    const wrapper = mount(FBadge, {
      props: { value: 5 },
      slots: {
        default: '<button>按钮</button>'
      }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
