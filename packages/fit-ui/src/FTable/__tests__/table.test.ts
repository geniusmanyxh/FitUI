import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import FTable from '..'

describe('FTable', () => {
  const columns = [
    { key: 'name', label: '姓名', width: 120 },
    { key: 'age', label: '年龄', width: 80 },
    { key: 'address', label: '地址' }
  ]

  const data = [
    { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
    { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
    { id: 3, name: '王五', age: 28, address: '广州市天河区' }
  ]

  test('mount with default', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      }
    })
    expect(wrapper.find('.f-table').exists()).toBe(true)
    expect(wrapper.classes()).toContain('f-table--medium')
  })

  test('render data', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      }
    })
    const rows = wrapper.findAll('.f-table__row')
    expect(rows).toHaveLength(3)
  })

  test('render columns', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      }
    })
    const headers = wrapper.findAll('.f-table__header-cell')
    expect(headers).toHaveLength(3)
    expect(headers[0].text()).toBe('姓名')
    expect(headers[1].text()).toBe('年龄')
    expect(headers[2].text()).toBe('地址')
  })

  test('size classes', () => {
    const wrapperSmall = mount(FTable, { props: { data, columns, size: 'small' } })
    expect(wrapperSmall.classes()).toContain('f-table--small')
    
    const wrapperLarge = mount(FTable, { props: { data, columns, size: 'large' } })
    expect(wrapperLarge.classes()).toContain('f-table--large')
  })

  test('stripe mode', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns,
        stripe: true
      }
    })
    expect(wrapper.classes()).toContain('f-table--stripe')
    const rows = wrapper.findAll('.f-table__row')
    expect(rows[1].classes()).toContain('f-table__row--striped')
  })

  test('border mode', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns,
        border: true
      }
    })
    expect(wrapper.classes()).toContain('f-table--border')
  })

  test('fit mode', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns,
        fit: true
      }
    })
    expect(wrapper.classes()).toContain('f-table--fit')
  })

  test('highlight current row', async () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns,
        highlightCurrentRow: true
      }
    })
    
    const rows = wrapper.findAll('.f-table__row')
    await rows[0].trigger('click')
    expect(rows[0].classes()).toContain('f-table__row--current')
  })

  test('sortable column', async () => {
    const sortableColumns = [
      { key: 'name', label: '姓名', sortable: true },
      { key: 'age', label: '年龄', sortable: true }
    ]
    const wrapper = mount(FTable, {
      props: {
        data,
        columns: sortableColumns
      }
    })
    
    const header = wrapper.findAll('.f-table__header-cell')[0]
    expect(header.classes()).toContain('f-table__header-cell--sortable')
    
    await header.trigger('click')
    expect(wrapper.emitted('sort')).toBeTruthy()
  })

  test('cell align', () => {
    const alignColumns = [
      { key: 'name', label: '姓名', align: 'left' },
      { key: 'age', label: '年龄', align: 'center' },
      { key: 'address', label: '地址', align: 'right' }
    ]
    const wrapper = mount(FTable, {
      props: {
        data,
        columns: alignColumns
      }
    })
    
    const cells = wrapper.findAll('.f-table__cell')
    expect(cells[0].classes()).toContain('f-table__cell--left')
    expect(cells[1].classes()).toContain('f-table__cell--center')
    expect(cells[2].classes()).toContain('f-table__cell--right')
  })

  test('empty data', () => {
    const wrapper = mount(FTable, {
      props: {
        data: [],
        columns
      }
    })
    expect(wrapper.find('.f-table__empty').exists()).toBe(true)
    expect(wrapper.find('.f-table__empty').text()).toBe('暂无数据')
  })

  test('custom empty text', () => {
    const wrapper = mount(FTable, {
      props: {
        data: [],
        columns,
        emptyText: '没有数据'
      }
    })
    expect(wrapper.find('.f-table__empty').text()).toBe('没有数据')
  })

  test('hide header', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns,
        showHeader: false
      }
    })
    expect(wrapper.find('.f-table__header-wrapper').exists()).toBe(false)
  })

  test('maxHeight', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns,
        maxHeight: 200
      }
    })
    const style = wrapper.find('.f-table').attributes('style')
    expect(style).toContain('max-height: 200px')
  })

  test('row click event', async () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      }
    })
    
    const rows = wrapper.findAll('.f-table__row')
    await rows[0].trigger('click')
    expect(wrapper.emitted('row-click')).toBeTruthy()
  })

  test('row dblclick event', async () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      }
    })
    
    const rows = wrapper.findAll('.f-table__row')
    await rows[0].trigger('dblclick')
    expect(wrapper.emitted('row-dblclick')).toBeTruthy()
  })

  test('cell click event', async () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      }
    })
    
    const cells = wrapper.findAll('.f-table__cell')
    await cells[0].trigger('click')
    expect(wrapper.emitted('cell-click')).toBeTruthy()
  })

  test('header click event', async () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      }
    })
    
    const headers = wrapper.findAll('.f-table__header-cell')
    await headers[0].trigger('click')
    expect(wrapper.emitted('header-click')).toBeTruthy()
  })

  test('custom cell slot', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      },
      slots: {
        cell: `
          <template #cell="{ row, column }">
            <span style="color: red;">{{ row[column.key] }}</span>
          </template>
        `
      }
    })
    expect(wrapper.find('.f-table__cell span').exists()).toBe(true)
  })

  test('custom header slot', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      },
      slots: {
        header: `
          <template #header="{ column }">
            <strong>{{ column.label }}</strong>
          </template>
        `
      }
    })
    expect(wrapper.find('.f-table__header-cell strong').exists()).toBe(true)
  })

  test('expose methods', () => {
    const wrapper = mount(FTable, {
      props: {
        data,
        columns
      }
    })
    
    expect(typeof wrapper.vm.sort).toBe('function')
    expect(typeof wrapper.vm.clearSort).toBe('function')
  })
})
