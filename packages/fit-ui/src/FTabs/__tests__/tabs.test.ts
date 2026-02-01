import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FTabs from '../index.vue'

describe('FTabs Component', () => {
  it('should render correctly with default props', () => {
    const tabs = [
      { key: '1', label: '标签1', name: 'tab1' },
      { key: '2', label: '标签2', name: 'tab2' }
    ]
    
    const wrapper = mount(FTabs, {
      props: { tabs },
      slots: {
        tab1: '内容1',
        tab2: '内容2'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.tabs_wrapper').exists()).toBe(true)
    expect(wrapper.findAll('.tabs_nav_item').length).toBe(2)
    expect(wrapper.findAll('.tabs_panel').length).toBe(2)
  })
  
  it('should activate the first tab by default', () => {
    const tabs = [
      { key: '1', label: '标签1', name: 'tab1' },
      { key: '2', label: '标签2', name: 'tab2' }
    ]
    
    const wrapper = mount(FTabs, {
      props: { tabs },
      slots: {
        tab1: '内容1',
        tab2: '内容2'
      }
    })
    
    expect(wrapper.findAll('.tabs_nav_item')[0].classes()).toContain('tabs_nav_item_active')
    expect(wrapper.findAll('.tabs_panel')[0].classes()).toContain('tabs_panel_active')
  })
  
  it('should activate the specified tab when activeKey is provided', () => {
    const tabs = [
      { key: '1', label: '标签1', name: 'tab1' },
      { key: '2', label: '标签2', name: 'tab2' }
    ]
    
    const wrapper = mount(FTabs, {
      props: { tabs, activeKey: '2' },
      slots: {
        tab1: '内容1',
        tab2: '内容2'
      }
    })
    
    expect(wrapper.findAll('.tabs_nav_item')[1].classes()).toContain('tabs_nav_item_active')
    expect(wrapper.findAll('.tabs_panel')[1].classes()).toContain('tabs_panel_active')
  })
  
  it('should emit update:activeKey event when tab is clicked', async () => {
    const tabs = [
      { key: '1', label: '标签1', name: 'tab1' },
      { key: '2', label: '标签2', name: 'tab2' }
    ]
    
    const wrapper = mount(FTabs, {
      props: { tabs },
      slots: {
        tab1: '内容1',
        tab2: '内容2'
      }
    })
    
    await wrapper.findAll('.tabs_nav_item')[1].trigger('click')
    expect(wrapper.emitted('update:activeKey')).toBeTruthy()
    expect(wrapper.emitted('update:activeKey')?.[0]).toEqual(['2'])
  })
  
  it('should emit tabClick event when tab is clicked', async () => {
    const tabs = [
      { key: '1', label: '标签1', name: 'tab1' },
      { key: '2', label: '标签2', name: 'tab2' }
    ]
    
    const wrapper = mount(FTabs, {
      props: { tabs },
      slots: {
        tab1: '内容1',
        tab2: '内容2'
      }
    })
    
    await wrapper.findAll('.tabs_nav_item')[1].trigger('click')
    expect(wrapper.emitted('tabClick')).toBeTruthy()
    expect(wrapper.emitted('tabClick')?.[0]).toEqual(['2'])
  })
  
  it('should render scrollable tabs when scrollable prop is true', () => {
    const tabs = [
      { key: '1', label: '标签1', name: 'tab1' },
      { key: '2', label: '标签2', name: 'tab2' }
    ]
    
    const wrapper = mount(FTabs, {
      props: { tabs, scrollable: true },
      slots: {
        tab1: '内容1',
        tab2: '内容2'
      }
    })
    
    expect(wrapper.find('.tabs_nav_scrollable').exists()).toBe(true)
  })
  
  it('should handle keydown events correctly', async () => {
    const tabs = [
      { key: '1', label: '标签1', name: 'tab1' },
      { key: '2', label: '标签2', name: 'tab2' },
      { key: '3', label: '标签3', name: 'tab3' }
    ]
    
    const wrapper = mount(FTabs, {
      props: { tabs, activeKey: '1' },
      slots: {
        tab1: '内容1',
        tab2: '内容2',
        tab3: '内容3'
      }
    })
    
    // Test right arrow key
    await wrapper.findAll('.tabs_nav_item')[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:activeKey')?.[0]).toEqual(['2'])
    
    // Test left arrow key
    await wrapper.findAll('.tabs_nav_item')[1].trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:activeKey')?.[1]).toEqual(['1'])
  })
  
  it('should handle tabs without keys correctly', () => {
    const tabs = [
      { label: '标签1', name: 'tab1' },
      { label: '标签2', name: 'tab2' }
    ]
    
    const wrapper = mount(FTabs, {
      props: { tabs },
      slots: {
        tab1: '内容1',
        tab2: '内容2'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('.tabs_nav_item').length).toBe(2)
  })
})
