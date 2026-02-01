import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FDivider from '..'

describe('FDivider', () => {
  test('mount with default', () => {
    const wrapper = mount(FDivider)
    expect(wrapper.find('.f-divider').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-divider--horizontal')
    expect(wrapper.classes()).toContain('f-divider--solid')
  })

  test('direction', () => {
    const wrapperVertical = mount(FDivider, { props: { direction: 'vertical' } })
    expect(wrapperVertical.classes()).toContain('f-divider--vertical')
  })

  test('content position', () => {
    const wrapperLeft = mount(FDivider, { props: { content: '文字', contentPosition: 'left' } })
    expect(wrapperLeft.find('.f-divider__text').classes()).toContain('f-divider__text--left')
    
    const wrapperCenter = mount(FDivider, { props: { content: '文字', contentPosition: 'center' } })
    expect(wrapperCenter.find('.f-divider__text').classes()).toContain('f-divider__text--center')
    
    const wrapperRight = mount(FDivider, { props: { content: '文字', contentPosition: 'right' } })
    expect(wrapperRight.find('.f-divider__text').classes()).toContain('f-divider__text--right')
  })

  test('border style', () => {
    const wrapperDashed = mount(FDivider, { props: { borderStyle: 'dashed' } })
    expect(wrapperDashed.classes()).toContain('f-divider--dashed')
    
    const wrapperDotted = mount(FDivider, { props: { borderStyle: 'dotted' } })
    expect(wrapperDotted.classes()).toContain('f-divider--dotted')
  })

  test('content slot', () => {
    const wrapper = mount(FDivider, {
      props: { content: '文字' },
      slots: {
        default: '<span class="custom">自定义内容</span>'
      }
    })
    expect(wrapper.find('.f-divider__text .custom').exists()).toBe(true)
  })
})
