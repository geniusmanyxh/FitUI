<template>
  <teleport to="#f-message-box">
    <transition name="fade-message">
      <div class=" f-message" :class="curTypeClass" v-if="isShow">
        <div class="f-message-content ">
          <slot name="icon"><f-icon :icon="defaultIcon" size="medium" class="-m-1.5 mr-1"></f-icon></slot>
          <span>
            <slot>{{ msgContent }}</slot>
          </span>
        </div>
        <div class="f-message-close " @click.stop="closeMessage" v-if="showClose">
          <f-icon icon="close" size="medium" class="-m-1.5 mr-1"></f-icon>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { createEl, removeElById, hasChildElLength } from '../../utils/tsHooks'
import { msgBgClass } from './message'
import FIcon from '@/FIcon'
type MsgType = 'success' | 'error' | 'warn' | 'info' | 'default'

defineOptions({ name: 'FMessage', inheritAttrs: false, })
createEl('f-message-box')

const props = withDefaults(defineProps<{
  type?: MsgType,
  msg?: string,
  duration?: number | 'notime',
  icon?: string,
  showClose?: boolean,
}>(), {
  type: 'default',
  msg: 'Hello',
  duration: 3000,
  icon: 'circle-information',
  showClose: false
})

const isShow = ref(true);
const defaultIcon = ref<any>('circle-information')
const curTypeClass = computed(() => {
  return msgBgClass[props.type]
})
const msgContent = computed(() => {
  return props.msg
})

let durationTimer: any = null

const showOrHide = () => {
  if (durationTimer) {
    clearTimeout(durationTimer)
  }
  if (props.duration === 0 || props.duration === 'notime') {
    return;
  }
  durationTimer = setTimeout(() => {
    closeMessage()
  }, props.duration)
}


const closeMessage = () => {
  isShow.value = false

  const hasChildLen = hasChildElLength('f-message-box')
  if (hasChildLen <= 1) {
    setTimeout(() => {
      removeElById('f-message-box')
    }, 500);
  }

}

onMounted(() => {
  showOrHide()
})

watch(
  isShow,
  () => clearTimeout(durationTimer),
)
</script>
<style>
#f-message-box {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.6); */
}
</style>
<style scoped lang="scss">
@import './style/index.scss';
</style>