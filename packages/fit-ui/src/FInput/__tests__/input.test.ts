import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import FInput from '..'

describe('FInput', () => {
  // ==================== 基础功能 ====================
  test('基础渲染', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('.f-input').exists()).toBe(true)
    expect(wrapper.find('.f-input__inner').exists()).toBe(true)
    expect(wrapper.find('input').element.getAttribute('type')).toBe('text')
  })

  test('v-model 双向绑定', async () => {
    const wrapper = mount(FInput, {
      props: {
        modelValue: 'hello',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('hello')
    await input.setValue('world')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['world'])
  })

  // ==================== 类型 ====================
  test('password 和 number 类型', () => {
    const wrapperPwd = mount(FInput, { props: { modelValue: '', type: 'password' } })
    expect(wrapperPwd.find('input').element.getAttribute('type')).toBe('password')

    const wrapperNum = mount(FInput, { props: { modelValue: '', type: 'number' } })
    expect(wrapperNum.find('input').element.getAttribute('type')).toBe('number')
  })

  test('textarea 类型', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', type: 'textarea' },
    })
    expect(wrapper.find('.f-textarea').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(false)
  })

  test('textarea rows 属性', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', type: 'textarea', rows: 5 },
    })
    expect(wrapper.find('textarea').element.getAttribute('rows')).toBe('5')
  })

  // ==================== 尺寸 ====================
  test('size 样式类', () => {
    const small = mount(FInput, { props: { modelValue: '', size: 'small' } })
    expect(small.find('.f-input--small').exists()).toBe(true)

    const large = mount(FInput, { props: { modelValue: '', size: 'large' } })
    expect(large.find('.f-input--large').exists()).toBe(true)
  })

  // ==================== 禁用 / 只读 ====================
  test('disabled 状态', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', disabled: true },
    })
    expect(wrapper.find('.is-disabled').exists()).toBe(true)
    expect(wrapper.find('input').element.hasAttribute('disabled')).toBe(true)
  })

  test('readonly 状态', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', readonly: true },
    })
    expect(wrapper.find('.is-readonly').exists()).toBe(true)
    expect(wrapper.find('input').element.hasAttribute('readonly')).toBe(true)
  })

  test('invalid 状态', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', invalid: true },
    })
    expect(wrapper.find('.is-invalid').exists()).toBe(true)
    expect(wrapper.find('input').element.getAttribute('aria-invalid')).toBe('true')
  })

  // ==================== Clearable ====================
  test('clearable - 有值且 hover 时显示清除按钮', async () => {
    const wrapper = mount(FInput, {
      props: {
        modelValue: 'hello',
        clearable: true,
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    })

    // 初始不显示
    expect(wrapper.find('.f-input__clear').exists()).toBe(false)

    // 鼠标移入显示
    await wrapper.find('.f-input').trigger('mouseenter')
    expect(wrapper.find('.f-input__clear').exists()).toBe(true)

    // 点击清空
    await wrapper.find('.f-input__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  test('clearable - 禁用时不显示', async () => {
    const wrapper = mount(FInput, {
      props: { modelValue: 'hello', clearable: true, disabled: true },
    })
    await wrapper.find('.f-input').trigger('mouseenter')
    expect(wrapper.find('.f-input__clear').exists()).toBe(false)
  })

  // ==================== ShowPassword ====================
  test('showPassword - 切换密码可见性', async () => {
    const wrapper = mount(FInput, {
      props: { modelValue: 'secret', type: 'password', showPassword: true },
    })

    // 初始为 password
    expect(wrapper.find('input').element.getAttribute('type')).toBe('password')

    // 点击切换
    await wrapper.find('.f-input__password-toggle').trigger('click')
    await nextTick()
    expect(wrapper.find('input').element.getAttribute('type')).toBe('text')

    // 再次切换
    await wrapper.find('.f-input__password-toggle').trigger('click')
    await nextTick()
    expect(wrapper.find('input').element.getAttribute('type')).toBe('password')
  })

  // ==================== Word Limit ====================
  test('showWordLimit - 字数统计', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: 'hello', maxlength: 10, showWordLimit: true },
    })
    expect(wrapper.find('.f-input__count').exists()).toBe(true)
    expect(wrapper.find('.f-input__count').text()).toBe('5 / 10')
  })

  test('showWordLimit - textarea 模式字数统计', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: 'abc', type: 'textarea', maxlength: 100, showWordLimit: true },
    })
    expect(wrapper.find('.f-input__count').exists()).toBe(true)
    expect(wrapper.find('.f-input__count').text()).toBe('3 / 100')
  })

  test('showWordLimit - 不显示（没有 maxlength）', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: 'hello', showWordLimit: true },
    })
    expect(wrapper.find('.f-input__count').exists()).toBe(false)
  })

  // ==================== Slots ====================
  test('prefix 插槽', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '' },
      slots: { prefix: '<span class="custom-prefix">P</span>' },
    })
    expect(wrapper.find('.f-input__prefix').exists()).toBe(true)
    expect(wrapper.find('.custom-prefix').exists()).toBe(true)
    expect(wrapper.find('.f-input--prefix').exists()).toBe(true)
  })

  test('suffix 插槽', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '' },
      slots: { suffix: '<span class="custom-suffix">S</span>' },
    })
    expect(wrapper.find('.f-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.custom-suffix').exists()).toBe(true)
  })

  test('prepend 插槽', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '' },
      slots: { prepend: 'https://' },
    })
    expect(wrapper.find('.f-input__prepend').exists()).toBe(true)
    expect(wrapper.find('.f-input--prepend').exists()).toBe(true)
    expect(wrapper.find('.f-input__prepend').text()).toBe('https://')
  })

  test('append 插槽', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '' },
      slots: { append: '.com' },
    })
    expect(wrapper.find('.f-input__append').exists()).toBe(true)
    expect(wrapper.find('.f-input--append').exists()).toBe(true)
    expect(wrapper.find('.f-input__append').text()).toBe('.com')
  })

  // ==================== Events ====================
  test('focus 和 blur 事件', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = mount(FInput, {
      props: { modelValue: '', onFocus, onBlur },
    })
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(onFocus).toHaveBeenCalled()
    await input.trigger('blur')
    expect(onBlur).toHaveBeenCalled()
  })

  test('change 事件', async () => {
    const onChange = vi.fn()
    const wrapper = mount(FInput, {
      props: { modelValue: '', onChange },
    })
    await wrapper.find('input').trigger('change')
    expect(onChange).toHaveBeenCalled()
  })

  test('keydown 事件', async () => {
    const onKeydown = vi.fn()
    const wrapper = mount(FInput, {
      props: { modelValue: '', onKeydown },
    })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(onKeydown).toHaveBeenCalled()
  })

  // ==================== 无障碍 ====================
  test('aria-required 和 id', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', required: true, id: 'my-input' },
    })
    expect(wrapper.find('input').element.getAttribute('id')).toBe('my-input')
    expect(wrapper.find('input').element.getAttribute('aria-required')).toBe('true')
  })

  test('aria-describedby', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', describedby: 'help-text' },
    })
    expect(wrapper.find('input').element.getAttribute('aria-describedby')).toBe('help-text')
  })

  // ==================== Expose ====================
  test('expose focus / blur / select / clear', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '' },
    })
    const vm = wrapper.vm as any
    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
    expect(typeof vm.select).toBe('function')
    expect(typeof vm.clear).toBe('function')
  })

  // ==================== maxlength / minlength ====================
  test('maxlength 属性传递到 input', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', maxlength: 20 },
    })
    expect(wrapper.find('input').element.getAttribute('maxlength')).toBe('20')
  })

  // ==================== placeholder ====================
  test('placeholder 属性', () => {
    const wrapper = mount(FInput, {
      props: { modelValue: '', placeholder: '请输入内容' },
    })
    expect(wrapper.find('input').element.getAttribute('placeholder')).toBe('请输入内容')
  })
})
