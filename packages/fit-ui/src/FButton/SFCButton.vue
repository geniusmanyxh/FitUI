<template>
  <button ref="fbutton" :class="btnClassArr" v-bind="$attrs" @click.stop="handleEvent">

    <div v-if="icon" class="flex justify-center items-center">
      <slot name="icon"><f-icon :icon="curBtnIcon" :class="btnIconClassArr"></f-icon></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, onMounted, onUnmounted } from 'vue';
import { type SizeType, btnSizeClass } from '../../utils/fsize'
import { type ButtonType, btnClass } from './Button'
import FIcon from '@/FIcon';
import { type allIconType } from '../../utils/ficon'

defineOptions({ name: 'FButton', inheritAttrs: false })
const props = defineProps<{
  type?: ButtonType
  plain?: boolean
  round?: boolean
  size?: SizeType
  icon?: allIconType
}>()

const fbutton = ref()
const plainSty = '_plain'
const activeSty = 'f-active'
const roundSty = 'button_round'

const buttonSizeClass = ref(btnSizeClass['medium'])
const buttonType = ref<ButtonType>('default')

const currentTypeClass = ref(btnClass[buttonType.value]);

let btnClassArr = reactive([currentTypeClass.value])

const curBtnIcon = ref<allIconType>('github')

let btnIconClassArr = reactive(['btn_icon'])

const handleBtnType = (type: ButtonType | undefined) => {
  if (type && type !== buttonType.value) {
    btnClassArr = btnClassArr.filter(val => val !== currentTypeClass.value)
    buttonType.value = type
    currentTypeClass.value = btnClass[buttonType.value]
    // console.log(currentTypeClass.value)
    btnClassArr.push(currentTypeClass.value)
  } else {
    if (!btnClassArr.includes(currentTypeClass.value)) {
      btnClassArr.push(currentTypeClass.value)
    }

  }
}
const handleBtnPlain = (p: boolean | undefined) => {
  if (p) {
    if (!btnClassArr.includes(plainSty)) {
      btnClassArr = btnClassArr.filter((val) => val !== currentTypeClass.value)
      btnClassArr.push(currentTypeClass.value + plainSty)
    }

  } else {
    btnClassArr = btnClassArr.filter(val => val !== currentTypeClass.value + plainSty)
    if (!btnClassArr.includes(currentTypeClass.value)) {
      btnClassArr.push(currentTypeClass.value)
    }
  }
}
const handleBtnRound = (r: boolean | undefined) => {
  if (r) {
    if (!btnClassArr.includes(roundSty)) {
      btnClassArr.push(roundSty)
    }
  } else {
    if (btnClassArr.includes(roundSty)) {
      btnClassArr = btnClassArr.filter(val => val !== roundSty)
    }
  }
}

const handleBtnSize = (s: SizeType | undefined) => {
  btnClassArr = btnClassArr.filter(val => val !== buttonSizeClass.value)
  if (s) {
    if (!btnClassArr.includes(btnSizeClass[s])) {

      btnClassArr.push(btnSizeClass[s])
      buttonSizeClass.value = btnSizeClass[s]
    }
  } else {
    btnClassArr.push(btnSizeClass['medium'])
  }
}

const handleBtnIcon = (i: allIconType | undefined) => {
  if (!i) { return; }

  curBtnIcon.value = i

  // 如果不是default，图标颜色为白色,否则为黑色
  if (buttonType.value !== 'default') {
    if (!btnIconClassArr.includes('white')) {
      btnIconClassArr = btnIconClassArr.filter(val => val !== 'black')
      btnIconClassArr.push('white')
    }

  } else {
    if (!btnIconClassArr.includes('black')) {
      btnIconClassArr = btnIconClassArr.filter(val => val !== 'white')
      btnIconClassArr.push('black')
    }

  }
  // 根据按钮尺寸修改图标大小
  let size = buttonSizeClass.value.split('_')[0];
  if (!btnIconClassArr.includes(size)) {
    btnIconClassArr = btnIconClassArr.filter((val) => {
      return val !== 'small' && val !== 'medium' && val !== 'large'
    })
    btnIconClassArr.push(size)
  }

  // 如果是plain，则跟随字体颜色
  if (props.plain) {
    const iconColor: { [p: string]: string } = {
      primary: 'blue',
      success: 'green',
      warning: 'yellow',
      danger: 'red',
      info: 'gray'
    }
    let curColor = iconColor[buttonType.value]
    if (buttonType.value !== 'default') {
      btnIconClassArr = btnIconClassArr.filter(val => {
        let color = Object.keys(iconColor).
          map(v => `text-${v}-500`).
          concat(['black', 'white'])

        return !color.includes(val)
      })
      btnIconClassArr.push(`text-${curColor}-500`)
    }
  }
}

watch([
  () => props.type,
  () => props.plain,
  () => props.round,
  () => props.size,
  () => props.icon
], ([type, p, r, s, i]) => {
  // console.log(s, buttonSizeClass.value)
  handleBtnType(type)
  handleBtnPlain(p)
  handleBtnRound(r)
  handleBtnSize(s)
  handleBtnIcon(i)
}, {
  immediate: true,
  deep: true
})

const handleEvent = (e: Event) => {
  // console.log(e)
  if (fbutton.value) {
    const el = fbutton.value as HTMLElement
    if (!el.contains(e.target as HTMLElement)) {
      el.classList.remove(activeSty)

    } else {
      el.classList.add(activeSty)

    }

  }
}

onMounted(() => {
  document.addEventListener('click', handleEvent)
})
onUnmounted(() => {
  document.removeEventListener('click', handleEvent)
})
</script>

<style scoped lang="scss">
@import './style/button.scss';
</style>
