import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FInput from '..'

describe('FInput', () => {
  test('mount with default', () => {
    const wrapper = mount(FInput, {
      props: {
        modelValue: '',
      },
    })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').element.getAttribute('type')).toBe('text')
    expect(wrapper.classes()).toContain('f-input')
  })

  test('v-model updates', async () => {
    const wrapper = mount(FInput, {
      props: {
        modelValue: 'hello',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('hello')
    await input.setValue('world')
    expect(wrapper.emitted('update:modelValue')).toEqual([['world']])
  })

  test('type password and number', () => {
    const wrapperPwd = mount(FInput, { props: { modelValue: '', type: 'password' } })
    expect(wrapperPwd.find('input').element.getAttribute('type')).toBe('password')

    const wrapperNum = mount(FInput, { props: { modelValue: '', type: 'number' } })
    expect(wrapperNum.find('input').element.getAttribute('type')).toBe('number')
  })

  test('size classes', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', size: 'small' },
    })
    expect(wrapper.classes()).toContain('f-input--small')
  })

  test('disabled and invalid', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', disabled: true, invalid: true },
    })
    expect(wrapper.find('input').element.hasAttribute('disabled')).toBe(true)
    expect(wrapper.find('input').element.getAttribute('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('f-input--invalid')
  })

  test('aria-required and id for a11y', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', required: true, id: 'my-input' },
    })
    expect(wrapper.find('input').element.getAttribute('id')).toBe('my-input')
    expect(wrapper.find('input').element.getAttribute('aria-required')).toBe('true')
  })
})
