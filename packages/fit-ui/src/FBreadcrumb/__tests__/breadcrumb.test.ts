import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FBreadcrumb from '..'

describe('FBreadcrumb', () => {
  const items = [
    { label: '首页', to: '/' },
    { label: '用户管理', to: '/users' },
    { label: '用户列表', to: '/users/list' }
  ]

  test('mount with default', () => {
    const wrapper = mount(FBreadcrumb, {
      props: { items }
    })
    expect(wrapper.find('.f-breadcrumb').exists()).toBe(true)
  })

  test('custom separator', () => {
    const wrapper = mount(FBreadcrumb, {
      props: { items, separator: '>' }
    })
    expect(wrapper.find('.f-breadcrumb__separator').text()).toBe('>')
  })

  test('item click', async () => {
    const wrapper = mount(FBreadcrumb, {
      props: { items }
    })
    
    const firstItem = wrapper.findAll('.f-breadcrumb__item')[0]
    await firstItem.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('disabled item', () => {
    const itemsWithDisabled = [
      { label: '首页', disabled: true }
    ]
    const wrapper = mount(FBreadcrumb, {
      props: { items: itemsWithDisabled }
    })
    expect(wrapper.find('.f-breadcrumb__item--disabled').exists()).toBe(true)
  })

  test('item slot', () => {
    const wrapper = mount(FBreadcrumb, {
      props: { items },
      slots: {
        item: `
          <template #default="{ item }">
            <span class="custom">{{ item.label }}</span>
          </template>
        `
      }
    })
    expect(wrapper.find('.f-breadcrumb__item .custom').exists()).toBe(true)
  })
})
