import {ref,onBeforeUnmount} from 'vue'

// eslint-disable-next-line no-undef
type ElType = keyof HTMLElementTagNameMap
type selecorType = 'class' | 'id' | 'tag'

/**
 * @description 创建标签元素
 * @param selectorName 选择器名称
 * @param selectorType 选择器类型
 * @param elType 标签类型
 */
export const createEl = (selectorName:string,selectorType:selecorType = 'id',elType:ElType = 'div') => {
    let state = ref(false)
    if ((selectorName as string).trim()) {
      let sName = ''

      if (selectorType === 'class') {
        sName = '.' + selectorName
      } else if (selectorType === 'id') {
        sName = '#' + selectorName
      } else {
        sName = selectorName
      }
      const queryEl = document.querySelector(sName)

      if (!queryEl) {
        // console.log('创建新的节点',sName)
        state.value = true
        let cEl =  document.createElement(elType)
        if (selectorType !== 'tag') {
          cEl.setAttribute(selectorType,selectorName)
        }

        document.body.appendChild(cEl)

        onBeforeUnmount(() => {
          
          document.body.removeChild(cEl)
        })
      } else {
        // console.log('已经存在节点',sName)
        state.value = false
      }
     
    } else {
      state.value = false
      
    }

    return state;
}