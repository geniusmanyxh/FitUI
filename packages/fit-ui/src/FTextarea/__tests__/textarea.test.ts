import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FTextarea from '..'

describe('FTextarea', () => {
  test('mount with default', () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: ''
      }
    })
    expect(wrapper.find('.f-textarea').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-textarea--medium')
  })

  test('v-model updates', async () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    })
    
    const textarea = wrapper.find('textarea')
    await textarea.setValue('hello')
    expect(wrapper.emitted('update:modelValue')).toEqual([['hello']])
  })

  test('change event', async () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: 'test'
      }
    })
    
    const textarea = wrapper.find('textarea')
    await textarea.trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('size classes', () => {
    const wrapperSmall = mount(FTextarea, { props: { modelValue: '', size: 'small' } })
    expect(wrapperSmall.classes()).toContain('f-textarea--small')
    
    const wrapperLarge = mount(FTextarea, { props: { modelValue: '', size: 'large' } })
    expect(wrapperLarge.classes()).toContain('f-textarea--large')
  })

  test('disabled state', () => {
    const wrapper = mount(FTextarea, {
      props: { modelValue: '', disabled: true }
    })
    expect(wrapper.classes()).toContain('f-textarea--disabled')
    expect(wrapper.find('textarea').element.hasAttribute('disabled')).toBe(true)
  })

  test('readonly state', () => {
    const wrapper = mount(FTextarea, {
      props: { modelValue: '', readonly: true }
    })
    expect(wrapper.classes()).toContain('f-textarea--readonly')
    expect(wrapper.find('textarea').element.hasAttribute('readonly')).toBe(true)
  })

  test('maxlength and word limit', () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: 'test',
        maxlength: 100,
        showWordLimit: true
      }
    })
    expect(wrapper.find('textarea').element.getAttribute('maxlength')).toBe('100')
    expect(wrapper.find('.f-textarea__count').text()).toBe('4/100')
  })

  test('minlength', () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: 'test',
        minlength: 5
      }
    })
    expect(wrapper.find('textarea').element.getAttribute('minlength')).toBe('5')
    expect(wrapper.classes()).toContain('f-textarea--invalid')
  })

  test('resize prop', () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: '',
        resize: 'both'
      }
    })
    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('style')).toContain('resize: both')
  })

  test('autosize', async () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: '',
        autosize: true
      }
    })
    expect(wrapper.classes()).toContain('f-textarea--autosize')
  })

  test('rows prop', () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: '',
        rows: 5
      }
    })
    expect(wrapper.find('textarea').element.getAttribute('rows')).toBe('5')
  })

  test('placeholder', () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: '',
        placeholder: 'Please enter...'
      }
    })
    expect(wrapper.find('textarea').element.getAttribute('placeholder')).toBe('Please enter...')
  })

  test('focus and blur events', async () => {
    const wrapper = mount(FTextarea, {
      props: { modelValue: '' }
    })
    
    const textarea = wrapper.find('textarea')
    await textarea.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    
    await textarea.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  test('aria attributes', () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: '',
        label: 'Description',
        disabled: true
      }
    })
    const textarea = wrapper.find('textarea')
    expect(textarea.element.getAttribute('aria-label')).toBe('Description')
    expect(textarea.element.getAttribute('aria-disabled')).toBe('true')
  })

  test('expose methods', () => {
    const wrapper = mount(FTextarea, {
      props: { modelValue: '' }
    })
    
    expect(typeof wrapper.vm.focus).toBe('function')
    expect(typeof wrapper.vm.blur).toBe('function')
    expect(typeof wrapper.vm.select).toBe('function')
  })

  test('autosize with minRows and maxRows', () => {
    const wrapper = mount(FTextarea, {
      props: {
        modelValue: '',
        autosize: { minRows: 2, maxRows: 6 }
      }
    })
    expect(wrapper.classes()).toContain('f-textarea--autosize')
  })
})
