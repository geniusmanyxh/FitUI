import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FPagination from '..'

describe('FPagination', () => {
  test('mount with default', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100
      }
    })
    expect(wrapper.find('.f-pagination').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-pagination--medium')
  })

  test('total display', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        layout: ['total', 'prev', 'pager', 'next']
      }
    })
    expect(wrapper.find('.f-pagination__total').text()).toBe('共 100 条')
  })

  test('page count calculation', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        pageSize: 10
      }
    })
    const pages = wrapper.findAll('.f-pagination__item')
    expect(pages).toHaveLength(10)
  })

  test('current page', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        currentPage: 3
      }
    })
    const activePage = wrapper.find('.f-pagination__item--active')
    expect(activePage.text()).toBe('3')
  })

  test('prev button', async () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        currentPage: 3,
        'onUpdate:currentPage': (e: number) => wrapper.setProps({ currentPage: e })
      }
    })
    
    const prevBtn = wrapper.find('.f-pagination__prev')
    await prevBtn.trigger('click')
    expect(wrapper.emitted('update:currentPage')).toEqual([[2]])
    expect(wrapper.emitted('prev-click')).toEqual([[2]])
  })

  test('next button', async () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        currentPage: 3,
        'onUpdate:currentPage': (e: number) => wrapper.setProps({ currentPage: e })
      }
    })
    
    const nextBtn = wrapper.find('.f-pagination__next')
    await nextBtn.trigger('click')
    expect(wrapper.emitted('update:currentPage')).toEqual([[4]])
    expect(wrapper.emitted('next-click')).toEqual([[4]])
  })

  test('page click', async () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        'onUpdate:currentPage': (e: number) => wrapper.setProps({ currentPage: e })
      }
    })
    
    const pages = wrapper.findAll('.f-pagination__item')
    await pages[4].trigger('click')
    expect(wrapper.emitted('update:currentPage')).toEqual([[5]])
    expect(wrapper.emitted('current-change')).toEqual([[5]])
  })

  test('size classes', () => {
    const wrapperSmall = mount(FPagination, { props: { total: 100, size: 'small' } })
    expect(wrapperSmall.classes()).toContain('f-pagination--small')
    
    const wrapperLarge = mount(FPagination, { props: { total: 100, size: 'large' } })
    expect(wrapperLarge.classes()).toContain('f-pagination--large')
  })

  test('disabled state', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('f-pagination--disabled')
  })

  test('background mode', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        background: true
      }
    })
    expect(wrapper.classes()).toContain('f-pagination--background')
  })

  test('page size options', async () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        pageSizeOptions: [10, 20, 30],
        'onUpdate:pageSize': (e: number) => wrapper.setProps({ pageSize: e })
      }
    })
    
    const select = wrapper.find('.f-pagination__select')
    expect(select.exists()).toBe(true)
    
    await select.setValue('20')
    expect(wrapper.emitted('update:pageSize')).toEqual([[20]])
  })

  test('jumper', async () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        layout: ['total', 'prev', 'pager', 'next', 'jumper'],
        'onUpdate:currentPage': (e: number) => wrapper.setProps({ currentPage: e })
      }
    })
    
    const input = wrapper.find('.f-pagination__input')
    expect(input.exists()).toBe(true)
    
    await input.setValue('5')
    await input.trigger('change')
    expect(wrapper.emitted('update:currentPage')).toEqual([[5]])
  })

  test('custom prev/next slots', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100
      },
      slots: {
        prev: '<span>上一页</span>',
        next: '<span>下一页</span>'
      }
    })
    expect(wrapper.find('.f-pagination__prev span').text()).toBe('上一页')
    expect(wrapper.find('.f-pagination__next span').text()).toBe('下一页')
  })

  test('hide on single page', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 5,
        pageSize: 10,
        hideOnSinglePage: true
      }
    })
    expect(wrapper.find('.f-pagination').exists()).toBe(false)
  })

  test('pager count', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100,
        pagerCount: 5
      }
    })
    const pages = wrapper.findAll('.f-pagination__item')
    expect(pages.length).toBeLessThanOrEqual(5)
  })

  test('expose methods', () => {
    const wrapper = mount(FPagination, {
      props: {
        total: 100
      }
    })
    
    expect(typeof wrapper.vm.handlePrev).toBe('function')
    expect(typeof wrapper.vm.handleNext).toBe('function')
  })
})
