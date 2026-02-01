import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FSkeleton from '..'

describe('FSkeleton', () => {
  test('mount with default', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: true }
    })
    expect(wrapper.find('.f-skeleton').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-skeleton--text')
  })

  test('loading prop', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: false }
    })
    expect(wrapper.find('.f-skeleton').exists()).toBe(false)
  })

  test('type variants', () => {
    const wrapperImage = mount(FSkeleton, {
      props: { loading: true, type: 'image' }
    })
    expect(wrapperImage.classes()).toContain('f-skeleton--image')
  })

  test('rows prop', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: true, rows: 5 }
    })
    const items = wrapper.findAll('.f-skeleton__paragraph-item')
    expect(items).toHaveLength(5)
  })

  test('animated prop', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: true, animated: true }
    })
    expect(wrapper.classes()).toContain('f-skeleton--animated')
  })

  test('avatar prop', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: true, type: 'image', avatar: true }
    })
    expect(wrapper.find('.f-skeleton__avatar').exists()).toBe(true)
  })

  test('title and paragraph props', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: true, title: false, paragraph: false }
    })
    expect(wrapper.find('.f-skeleton__title').exists()).toBe(false)
    expect(wrapper.find('.f-skeleton__paragraph').exists()).toBe(false)
  })

  test('active prop', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: true, active: true }
    })
    expect(wrapper.classes()).toContain('f-skeleton--active')
  })

  test('default slot', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: false },
      slots: {
        default: '<div class="content">实际内容</div>'
      }
    })
    expect(wrapper.find('.f-skeleton .content').exists()).toBe(true)
  })

  test('template slot', () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: true },
      slots: {
        template: '<div class="custom-template">自定义模板</div>'
      }
    })
    expect(wrapper.find('.f-skeleton .custom-template').exists()).toBe(true)
  })

  test('click event', async () => {
    const wrapper = mount(FSkeleton, {
      props: { loading: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
