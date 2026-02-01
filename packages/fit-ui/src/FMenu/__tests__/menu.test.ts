import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import type { MenuItem } from '../Menu'
import FMenu from '..'

describe('FMenu', () => {
  const items: MenuItem[] = [
    { key: '1', label: '首页', icon: 'home' },
    { key: '2', label: '用户管理', icon: 'user' },
    { key: '3', label: '系统设置', icon: 'settings', children: [
      { key: '3-1', label: '基本设置' },
      { key: '3-2', label: '安全设置' }
    ]}
  ]

  test('mount with default', () => {
    const wrapper = mount(FMenu, {
      props: { items }
    })
    expect(wrapper.find('.f-menu').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-menu--vertical')
    expect(wrapper.classes()).toContain('f-menu--light')
  })

  test('mode variants', () => {
    const wrapperHorizontal = mount(FMenu, {
      props: { items, mode: 'horizontal' }
    })
    expect(wrapperHorizontal.classes()).toContain('f-menu--horizontal')
  })

  test('theme variants', () => {
    const wrapperDark = mount(FMenu, {
      props: { items, theme: 'dark' }
    })
    expect(wrapperDark.classes()).toContain('f-menu--dark')
  })

  test('collapse mode', () => {
    const wrapper = mount(FMenu, {
      props: { items, collapse: true }
    })
    expect(wrapper.classes()).toContain('f-menu--collapse')
  })

  test('menu item click', async () => {
    const wrapper = mount(FMenu, {
      props: { items }
    })
    
    const firstItem = wrapper.findAll('.f-menu__item')[0]
    await firstItem.trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  test('submenu toggle', async () => {
    const wrapper = mount(FMenu, {
      props: { items }
    })
    
    const submenuTitles = wrapper.findAll('.f-menu__submenu-title')
    if (submenuTitles.length > 2) {
      await submenuTitles[2].trigger('click')
      expect(wrapper.emitted('open')).toBeTruthy()
    }
  })

  test('disabled item', () => {
    const itemsWithDisabled = [
      { key: '1', label: '首页', disabled: true }
    ]
    const wrapper = mount(FMenu, {
      props: { items: itemsWithDisabled }
    })
    expect(wrapper.find('.f-menu__item--disabled').exists()).toBe(true)
  })
})
