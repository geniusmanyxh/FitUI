import { describe, expect, test, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import FCodeBlock from '..'

// 避免在单测中加载 shiki/wasm，仅验证能渲染与 lang/theme 切换不报错
vi.mock('shiki', () => ({
  createHighlighterCore: vi.fn(() =>
    Promise.resolve({
      codeToHtml: (code: string) => `<pre class="shiki-html">${code ?? ''}</pre>`,
    })
  ),
  createOnigurumaEngine: vi.fn(() => ({})),
}))

vi.mock('tj-jstools', () => ({
  getFullEl: vi.fn(() => null),
  toggleFull: vi.fn(),
}))

vi.mock('@utils/tsHooks/useMessage', () => ({
  useMessage: () => ({
    success: vi.fn(),
    error: vi.fn(),
  }),
}))

vi.mock('@utils/tsHooks', () => ({
  copyToClipboard: vi.fn(() => Promise.resolve(true)),
}))

describe('FCodeBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('mount 能渲染默认标题与语言', async () => {
    const wrapper = mount(FCodeBlock, {
      props: {
        code: 'const x = 1',
      },
      global: {
        stubs: { FIcon: true },
      },
    })
    await flushPromises()
    expect(wrapper.find('.codeBox').exists()).toBe(true)
    expect(wrapper.find('.codeBox-header-title').text()).toBe('代码示例')
    expect(wrapper.find('.lang').text()).toBe('js')
  })

  test('接受 title、lang、theme 并正确渲染', async () => {
    const wrapper = mount(FCodeBlock, {
      props: {
        title: '示例代码',
        code: 'console.log(1)',
        lang: 'ts',
        theme: 'dark',
      },
      global: {
        stubs: { FIcon: true },
      },
    })
    await flushPromises()
    expect(wrapper.find('.codeBox-header-title').text()).toBe('示例代码')
    expect(wrapper.find('.lang').text()).toBe('ts')
    expect(wrapper.attributes('data-theme')).toBe('dark')
  })

  test('语言切换不报错', async () => {
    const wrapper = mount(FCodeBlock, {
      props: {
        code: 'let x',
        lang: 'js',
      },
      global: {
        stubs: { FIcon: true },
      },
    })
    await flushPromises()
    expect(wrapper.find('.codeBox').exists()).toBe(true)
    await wrapper.setProps({ lang: 'ts' })
    await flushPromises()
    expect(wrapper.find('.lang').text()).toBe('ts')
  })

  test('主题切换不报错', async () => {
    const wrapper = mount(FCodeBlock, {
      props: {
        code: 'let x',
        theme: '',
      },
      global: {
        stubs: { FIcon: true },
      },
    })
    await flushPromises()
    expect(wrapper.find('.codeBox').exists()).toBe(true)
    await wrapper.setProps({ theme: 'dark' })
    await wrapper.vm.$nextTick()
    expect(wrapper.attributes('data-theme')).toBe('dark')
  })
})
