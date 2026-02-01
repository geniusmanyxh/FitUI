import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FAvatar from '..'

describe('FAvatar', () => {
  test('mount with default', () => {
    const wrapper = mount(FAvatar)
    expect(wrapper.find('.f-avatar').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-avatar--default')
    expect(wrapper.classes()).toContain('f-avatar--circle')
  })

  test('size classes', () => {
    const wrapperSmall = mount(FAvatar, { props: { size: 'small' } })
    expect(wrapperSmall.classes()).toContain('f-avatar--small')
    
    const wrapperLarge = mount(FAvatar, { props: { size: 'large' } })
    expect(wrapperLarge.classes()).toContain('f-avatar--large')
  })

  test('custom size', () => {
    const wrapper = mount(FAvatar, { props: { size: 50 } })
    const style = wrapper.find('.f-avatar').attributes('style')
    expect(style).toContain('width: 50px')
    expect(style).toContain('height: 50px')
  })

  test('shape variants', () => {
    const wrapperCircle = mount(FAvatar, { props: { shape: 'circle' } })
    expect(wrapperCircle.classes()).toContain('f-avatar--circle')
    
    const wrapperSquare = mount(FAvatar, { props: { shape: 'square' } })
    expect(wrapperSquare.classes()).toContain('f-avatar--square')
  })

  test('image source', () => {
    const wrapper = mount(FAvatar, {
      props: { src: '/avatar.png', alt: 'User Avatar' }
    })
    const img = wrapper.find('.f-avatar__image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/avatar.png')
    expect(img.attributes('alt')).toBe('User Avatar')
  })

  test('icon', () => {
    const wrapper = mount(FAvatar, {
      props: { icon: 'user' }
    })
    expect(wrapper.find('.f-avatar__icon').exists()).toBe(true)
  })

  test('text', () => {
    const wrapper = mount(FAvatar, {
      props: { text: '张三' }
    })
    expect(wrapper.find('.f-avatar__text').exists()).toBe(true)
    expect(wrapper.find('.f-avatar__text').text()).toBe('张三')
  })

  test('fit mode', () => {
    const wrapper = mount(FAvatar, {
      props: { src: '/avatar.png', fit: 'contain' }
    })
    const img = wrapper.find('.f-avatar__image')
    expect(img.attributes('style')).toContain('object-fit: contain')
  })

  test('error event', async () => {
    const wrapper = mount(FAvatar, {
      props: { src: '/invalid.png' }
    })
    
    const img = wrapper.find('.f-avatar__image')
    await img.trigger('error')
    expect(wrapper.emitted('error')).toBeTruthy()
  })

  test('click event', async () => {
    const wrapper = mount(FAvatar)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('default slot', () => {
    const wrapper = mount(FAvatar, {
      slots: {
        default: '<span class="custom">自定义内容</span>'
      }
    })
    expect(wrapper.find('.f-avatar .custom').exists()).toBe(true)
  })
})
