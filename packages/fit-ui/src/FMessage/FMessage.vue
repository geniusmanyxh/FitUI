<template>
  <teleport to="#f-message-box">
    <div class="f-message msg_default" v-if="isShow">
      <div class="f-message-content ">
        <f-icon :icon="defaultIcon" size="medium" class="-m-1.5 mr-1"></f-icon>
        <span>你好</span>
      </div>
      <div class="f-message-close " @click="close">
        <f-icon icon="close" size="medium" class="-m-1.5 mr-1"></f-icon>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { createEl } from '../../utils/tsHooks'
import FIcon from '@/FIcon'
type MsgType = 'success' | 'error' | 'warn' | 'info' | 'default'

defineOptions({ name: 'FMessage', inheritAttrs: false, })
createEl('f-message-box')

const props = withDefaults(defineProps<{
  type?: MsgType,
  msg?: string,
  duration?: number,
  icon?: string,
  showClose?: boolean,
}>(),{
  type: 'default',
  msg: 'Hello',
  duration: 3000,
  icon: 'circle-information',
  showClose: false
})


const isShow = ref(true);
// eslint-disable-next-line no-unused-vars
const curType = ref('default');
const defaultIcon = ref('circle-information')

watch(
  () => props.type,
  (res) => {
    console.log(res)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style scoped lang="scss">
@import './style/index.scss';
</style>