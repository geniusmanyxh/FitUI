import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import FForm from '..'
import FFormItem from '../FormItem'
import { FORM_CONTEXT_KEY } from '../Form'

describe('FForm', () => {
  test('mount with default', () => {
    const wrapper = mount(FForm, {
      props: {
        model: {}
      }
    })
    expect(wrapper.find('.f-form').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-form--right')
  })

  test('label position', () => {
    const wrapperLeft = mount(FForm, {
      props: { model: {}, labelPosition: 'left' }
    })
    expect(wrapperLeft.classes()).toContain('f-form--left')
    
    const wrapperTop = mount(FForm, {
      props: { model: {}, labelPosition: 'top' }
    })
    expect(wrapperTop.classes()).toContain('f-form--top')
  })

  test('inline mode', () => {
    const wrapper = mount(FForm, {
      props: { model: {}, inline: true }
    })
    expect(wrapper.classes()).toContain('f-form--inline')
  })

  test('disabled state', () => {
    const wrapper = mount(FForm, {
      props: { model: {}, disabled: true }
    })
    expect(wrapper.classes()).toContain('f-form--disabled')
  })

  test('size classes', () => {
    const wrapperSmall = mount(FForm, { props: { model: {}, size: 'small' } })
    expect(wrapperSmall.classes()).toContain('f-form--small')
    
    const wrapperLarge = mount(FForm, { props: { model: {}, size: 'large' } })
    expect(wrapperLarge.classes()).toContain('f-form--large')
  })

  test('validate method', async () => {
    const model = reactive({ name: '', age: 0 })
    const rules = {
      name: [{ required: true, message: 'Name is required' }],
      age: [{ type: 'number', min: 18, message: 'Age must be at least 18' }]
    }
    
    const wrapper = mount(FForm, {
      props: {
        model,
        rules
      },
      slots: {
        default: `
          <FFormItem prop="name" label="Name">
            <FInput v-model="model.name" />
          </FFormItem>
          <FFormItem prop="age" label="Age">
            <FInputNumber v-model="model.age" />
          </FFormItem>
        `
      },
      global: {
        components: { FFormItem }
      }
    })
    
    const isValid = await wrapper.vm.validate()
    expect(isValid).toBe(false)
  })

  test('resetFields method', () => {
    const model = reactive({ name: 'John', age: 25 })
    const wrapper = mount(FForm, {
      props: { model }
    })
    
    wrapper.vm.resetFields()
    expect(model.name).toBeUndefined()
    expect(model.age).toBeUndefined()
  })

  test('clearValidate method', () => {
    const wrapper = mount(FForm, {
      props: { model: {} }
    })
    
    wrapper.vm.clearValidate()
  })

  test('validateField method', async () => {
    const model = reactive({ name: '' })
    const rules = {
      name: [{ required: true, message: 'Name is required' }]
    }
    
    const wrapper = mount(FForm, {
      props: {
        model,
        rules
      }
    })
    
    const isValid = await wrapper.vm.validateField('name')
    expect(isValid).toBe(false)
  })
})

describe('FFormItem', () => {
  test('mount with default', () => {
    const wrapper = mount(FFormItem, {
      props: {
        label: 'Username',
        prop: 'username'
      }
    })
    expect(wrapper.find('.f-form-item').exists()).toBe(true)
    expect(wrapper.find('.f-form-item__label').text()).toBe('Username')
  })

  test('required asterisk', () => {
    const wrapper = mount(FFormItem, {
      props: {
        label: 'Username',
        prop: 'username',
        required: true
      }
    })
    expect(wrapper.classes()).toContain('f-form-item--required')
  })

  test('error state', () => {
    const wrapper = mount(FFormItem, {
      props: {
        label: 'Username',
        prop: 'username',
        error: 'Username is required'
      }
    })
    expect(wrapper.classes()).toContain('f-form-item--error')
    expect(wrapper.find('.f-form-item__error').text()).toBe('Username is required')
  })

  test('label width', () => {
    const wrapper = mount(FFormItem, {
      props: {
        label: 'Username',
        labelWidth: '120px'
      }
    })
    const label = wrapper.find('.f-form-item__label')
    expect(label.attributes('style')).toContain('width: 120px')
  })

  test('size classes', () => {
    const wrapperSmall = mount(FFormItem, { props: { size: 'small' } })
    expect(wrapperSmall.classes()).toContain('f-form-item--small')
    
    const wrapperLarge = mount(FFormItem, { props: { size: 'large' } })
    expect(wrapperLarge.classes()).toContain('f-form-item--large')
  })

  test('validate method', async () => {
    const wrapper = mount(FFormItem, {
      props: {
        prop: 'username',
        rules: [{ required: true, message: 'Required' }]
      }
    })
    
    const isValid = await wrapper.vm.validate()
    expect(isValid).toBe(false)
  })

  test('clearValidate method', () => {
    const wrapper = mount(FFormItem, {
      props: {
        prop: 'username',
        error: 'Error'
      }
    })
    
    wrapper.vm.clearValidate()
    expect(wrapper.vm.errorMessage).toBe('')
  })

  test('resetField method', () => {
    const model = reactive({ username: 'John' })
    const wrapper = mount(FFormItem, {
      props: {
        prop: 'username'
      },
      provide: {
        [FORM_CONTEXT_KEY]: {
          model,
          addField: () => {},
          removeField: () => {}
        }
      }
    })
    
    wrapper.vm.resetField()
    expect(model.username).toBeUndefined()
  })

  test('label suffix', () => {
    const wrapper = mount(FFormItem, {
      props: {
        label: 'Username',
        labelSuffix: ':'
      }
    })
    expect(wrapper.find('.f-form-item__suffix').text()).toBe(':')
  })
})
