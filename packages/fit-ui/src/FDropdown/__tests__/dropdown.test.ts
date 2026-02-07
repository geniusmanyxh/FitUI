import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FDropdown from '../index.vue'

describe('FDropdown Component', () => {
  it('should render correctly with default props', () => {
    const wrapper = mount(FDropdown, {
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: '<div class="dropdown-item" role="option">选项1</div>'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.dropdown_wrapper').exists()).toBe(true)
  })

  it('should have trigger element', () => {
    const wrapper = mount(FDropdown, {
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: '<div>选项1</div>'
      }
    })

    expect(wrapper.find('.dropdown_trigger').exists()).toBe(true)
    expect(wrapper.text()).toContain('下拉菜单')
  })

  it('should have correct aria attributes', () => {
    const wrapper = mount(FDropdown, {
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: '<div>选项1</div>'
      }
    })

    expect(wrapper.find('.dropdown_trigger').attributes('role')).toBe('button')
    expect(wrapper.find('.dropdown_trigger').attributes('aria-haspopup')).toBe('listbox')
  })
})
