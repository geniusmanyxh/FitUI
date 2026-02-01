import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import FFormItem from '../FormItem.vue'
import FForm from '../index.vue'

describe('FFormItem', () => {
  test('required asterisk', async () => {
    const wrapper = mount(FFormItem, {
      props: {
        label: 'Username',
        prop: 'username',
        required: true
      },
      provide: {
        'formContext': {
          model: { username: '' },
          addField: () => {},
          removeField: () => {},
          validateField: () => Promise.resolve(true)
        }
      }
    })
    await nextTick()
    expect(wrapper.classes()).toContain('f-form-item--required')
  })

  test('error state', async () => {
    const wrapper = mount(FFormItem, {
      props: {
        label: 'Username',
        prop: 'username',
        error: 'Username is required'
      },
      provide: {
        'formContext': {
          model: { username: '' },
          addField: () => {},
          removeField: () => {},
          validateField: () => Promise.resolve(true)
        }
      }
    })
    await nextTick()
    expect(wrapper.classes()).toContain('f-form-item--error')
    expect(wrapper.find('.f-form-item__error').text()).toBe('Username is required')
  })

  test('validate method', async () => {
    const wrapper = mount(FFormItem, {
      props: {
        prop: 'username',
        rules: [{ required: true, message: 'Required' }]
      },
      provide: {
        'formContext': {
          model: { username: '' },
          addField: () => {},
          removeField: () => {},
          validateField: () => Promise.resolve(false)
        }
      }
    })
    
    const isValid = await wrapper.vm.validate()
    expect(isValid).toBe(false)
  })

  test('resetField method', async () => {
    const model = { username: 'John' }
    const wrapper = mount(FFormItem, {
      props: {
        prop: 'username'
      },
      provide: {
        'formContext': {
          model,
          addField: () => {},
          removeField: () => {},
          validateField: () => Promise.resolve(true)
        }
      }
    })
    
    await wrapper.vm.resetField()
    expect(model.username).toBeUndefined()
  })

  test('label suffix', async () => {
    const wrapper = mount(FFormItem, {
      props: {
        label: 'Username',
        labelSuffix: ':'
      },
      provide: {
        'formContext': {
          model: {},
          addField: () => {},
          removeField: () => {},
          validateField: () => Promise.resolve(true)
        }
      }
    })
    await nextTick()
    expect(wrapper.find('.f-form-item__suffix').text()).toBe(':')
  })
})
