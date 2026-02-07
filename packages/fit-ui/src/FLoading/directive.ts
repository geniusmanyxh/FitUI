import { type Directive } from 'vue'

const vLoading: Directive = {
  mounted(el, binding) {
    if (binding.value) {
      el.style.position = 'relative'
      const mask = document.createElement('div')
      mask.className = 'f-loading-mask'
      mask.innerHTML = '<div class="f-loading-spinner"><span class="f-loading-icon"></span></div>'
      el.appendChild(mask)
      ;(el as any).__loading_mask = mask
    }
  },
  updated(el, binding) {
    if (binding.value && !(el as any).__loading_mask) {
      el.style.position = 'relative'
      const mask = document.createElement('div')
      mask.className = 'f-loading-mask'
      mask.innerHTML = '<div class="f-loading-spinner"><span class="f-loading-icon"></span></div>'
      el.appendChild(mask)
      ;(el as any).__loading_mask = mask
    } else if (!binding.value && (el as any).__loading_mask) {
      el.removeChild((el as any).__loading_mask)
      ;(el as any).__loading_mask = null
    }
  },
  unmounted(el) {
    if ((el as any).__loading_mask) {
      el.removeChild((el as any).__loading_mask)
      ;(el as any).__loading_mask = null
    }
  }
}

export default vLoading
