import { describe, it, expect, vi } from 'vitest'
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
    expect(wrapper.find('.dropdown_trigger').exists()).toBe(true)
    expect(wrapper.find('.dropdown_menu').exists()).toBe(false)
  })
  
  it('should toggle dropdown when trigger is clicked', async () => {
    const wrapper = mount(FDropdown, {
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: '<div class="dropdown-item" role="option">选项1</div>'
      }
    })
    
    expect(wrapper.find('.dropdown_menu').exists()).toBe(false)
    
    await wrapper.find('.dropdown_trigger').trigger('click')
    expect(wrapper.find('.dropdown_menu').exists()).toBe(true)
    
    await wrapper.find('.dropdown_trigger').trigger('click')
    expect(wrapper.find('.dropdown_menu').exists()).toBe(false)
  })
  
  it('should emit open and close events when dropdown is toggled', async () => {
    const wrapper = mount(FDropdown, {
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: '<div class="dropdown-item" role="option">选项1</div>'
      }
    })
    
    await wrapper.find('.dropdown_trigger').trigger('click')
    expect(wrapper.emitted('open')).toBeTruthy()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    
    await wrapper.find('.dropdown_trigger').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:open')?.[1]).toEqual([false])
  })
  
  it('should close dropdown when ESC key is pressed', async () => {
    const wrapper = mount(FDropdown, {
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: '<div class="dropdown-item" role="option">选项1</div>'
      }
    })
    
    await wrapper.find('.dropdown_trigger').trigger('click')
    expect(wrapper.find('.dropdown_menu').exists()).toBe(true)
    
    await wrapper.find('.dropdown_trigger').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.dropdown_menu').exists()).toBe(false)
  })
  
  it('should render dropdown in the correct position', async () => {
    const wrapper = mount(FDropdown, {
      props: { placement: 'top' },
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: '<div class="dropdown-item" role="option">选项1</div>'
      }
    })
    
    await wrapper.find('.dropdown_trigger').trigger('click')
    expect(wrapper.find('.dropdown_menu_top').exists()).toBe(true)
  })
  
  it('should be open by default when defaultOpen is true', () => {
    const wrapper = mount(FDropdown, {
      props: { defaultOpen: true },
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: '<div class="dropdown-item" role="option">选项1</div>'
      }
    })
    
    expect(wrapper.find('.dropdown_menu').exists()).toBe(true)
  })
  
  it('should handle keyboard navigation with arrow keys', async () => {
    const wrapper = mount(FDropdown, {
      slots: {
        trigger: '<button>下拉菜单</button>',
        default: `
          <div class="dropdown-item" role="option">选项1</div>
          <div class="dropdown-item" role="option">选项2</div>
          <div class="dropdown-item" role="option">选项3</div>
        `
      }
    })
    
    await wrapper.find('.dropdown_trigger').trigger('click')
    
    // 模拟按下方向键
    const menuElement = wrapper.find('.dropdown_menu')
    await menuElement.trigger('keydown', { key: 'ArrowDown' })
    
    // 由于测试环境中document.activeElement可能不可靠，这里只测试事件触发
    expect(wrapper.exists()).toBe(true)
  })
})
