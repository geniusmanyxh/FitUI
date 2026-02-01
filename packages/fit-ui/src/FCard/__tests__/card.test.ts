import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FCard from '..'

describe('FCard', () => {
  test('mount with default', () => {
    const wrapper = mount(FCard)
    expect(wrapper.find('.f-card').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-card--always')
  })

  test('header slot', () => {
    const wrapper = mount(FCard, {
      props: { header: '标题' }
    })
    expect(wrapper.find('.f-card__header').text()).toBe('标题')
  })

  test('body content', () => {
    const wrapper = mount(FCard, {
      slots: {
        default: '<div class="content">内容</div>'
      }
    })
    expect(wrapper.find('.f-card__body .content').exists()).toBe(true)
  })

  test('shadow variants', () => {
    const wrapperHover = mount(FCard, { props: { shadow: 'hover' } })
    expect(wrapperHover.classes()).toContain('f-card--hover')
    
    const wrapperNever = mount(FCard, { props: { shadow: 'never' } })
    expect(wrapperNever.classes()).toContain('f-card--never')
  })

  test('body style and class', () => {
    const wrapper = mount(FCard, {
      props: {
        bodyStyle: { padding: '30px' },
        bodyClass: 'custom-body'
      }
    })
    const body = wrapper.find('.f-card__body')
    expect(body.classes()).toContain('custom-body')
    expect(body.attributes('style')).toContain('padding: 30px')
  })

  test('click event', async () => {
    const wrapper = mount(FCard)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
