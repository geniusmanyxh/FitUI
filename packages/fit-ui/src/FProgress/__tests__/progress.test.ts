import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FProgress from '..'

describe('FProgress', () => {
  test('mount with default', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50 }
    })
    expect(wrapper.find('.f-progress').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-progress--line')
  })

  test('percentage display', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 75 }
    })
    expect(wrapper.find('.f-progress__text').text()).toBe('75%')
  })

  test('type variants', () => {
    const wrapperCircle = mount(FProgress, {
      props: { percentage: 50, type: 'circle' }
    })
    expect(wrapperCircle.classes()).toContain('f-progress--circle')
    
    const wrapperDashboard = mount(FProgress, {
      props: { percentage: 50, type: 'dashboard' }
    })
    expect(wrapperDashboard.classes()).toContain('f-progress--dashboard')
  })

  test('status variants', () => {
    const wrapperSuccess = mount(FProgress, {
      props: { percentage: 100, status: 'success' }
    })
    expect(wrapperSuccess.classes()).toContain('f-progress--success')
    
    const wrapperException = mount(FProgress, {
      props: { percentage: 50, status: 'exception' }
    })
    expect(wrapperException.classes()).toContain('f-progress--exception')
  })

  test('stroke width', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50, strokeWidth: 10, type: 'circle' }
    })
    const track = wrapper.find('.f-progress__circle-track')
    expect(track.attributes('stroke-width')).toBe('10')
  })

  test('text inside', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50, textInside: true }
    })
    expect(wrapper.find('.f-progress__text-inner').text()).toBe('50%')
  })

  test('show text', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50, showText: false }
    })
    expect(wrapper.find('.f-progress__text').exists()).toBe(false)
  })

  test('custom color', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50, color: '#ff0000' }
    })
    const inner = wrapper.find('.f-progress__inner')
    expect(inner.attributes('style')).toContain('background-color: #ff0000')
  })

  test('gradient colors', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 75, color: ['#ff0000', '#00ff00', '#0000ff'] }
    })
    const inner = wrapper.find('.f-progress__inner')
    expect(inner.attributes('style')).toContain('background-color: #00ff00')
  })

  test('custom background color', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50, backgroundColor: '#f0f0f0' }
    })
    const outer = wrapper.find('.f-progress__outer')
    expect(outer.attributes('style')).toContain('background-color: #f0f0f0')
  })

  test('circle width', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50, type: 'circle', width: 200 }
    })
    const circle = wrapper.find('.f-progress__circle')
    expect(circle.attributes('style')).toContain('width: 200px')
    expect(circle.attributes('style')).toContain('height: 200px')
  })

  test('default slot', () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50 },
      slots: {
        default: '<span class="custom">自定义文本</span>'
      }
    })
    expect(wrapper.find('.f-progress__text .custom').exists()).toBe(true)
  })

  test('click event', async () => {
    const wrapper = mount(FProgress, {
      props: { percentage: 50 }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
