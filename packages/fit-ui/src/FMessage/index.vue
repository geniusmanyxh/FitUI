<template>
  <transition name="fade-message">
    <div class="f-message-item" :style="{zIndex}" :class="curTypeClass" v-if="isShow">
      <div class="f-message-item-content ">
        <slot name="icon"><f-icon :icon="defaultIcon" size="medium" class="-m-1.5 mr-1"></f-icon></slot>
        <span>
          <slot>{{ msgContent }}</slot>
        </span>
      </div>
      <div class="f-message-item-close " @click.stop="closeMessage" v-if="showClose">
        <f-icon icon="close" size="medium" class="-m-1.5 mr-1"></f-icon>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { msgBgClass } from './message'
import FIcon from '@/FIcon'
type MsgType = 'success' | 'error' | 'warn' | 'info' | 'default'

defineOptions({ name: 'FMessage', inheritAttrs: false, })

const props = withDefaults(defineProps<{
type?: MsgType,
msg?: string,
duration?: number | 'notime',
icon?: string,
showClose?: boolean,
zIndex?: number
}>(), {
type: 'default',
msg: 'Hello',
duration: 3000,
icon: 'circle-information',
showClose: false,
zIndex: 1000
})

const emit = defineEmits(['close','show']);

const isShow = ref(true);
const defaultIcon = ref<any>('circle-information')
const curTypeClass = computed(() => {
return msgBgClass[props.type]
})
const msgContent = computed(() => {
return props.msg
})

let durationTimer: any = null

/**
* 根据设定的持续时间显示或隐藏消息。该函数首先会清除任何现有的计时器，然后根据props中的duration属性来决定是否设置一个新的计时器以在指定时间后调用closeMessage函数。
* 该函数不接受参数。
* 该函数没有返回值。
*/
const showOrHide = () => {
// 清除现有的计时器，避免重复计时
if (durationTimer) {
  clearTimeout(durationTimer)
}
// 如果duration为0或'notime'，则不设置计时器，直接返回
if (props.duration === 0 || props.duration === 'notime') {
  return;
}
// 根据props.duration设置新的计时器，并在计时结束后调用closeMessage函数
durationTimer = setTimeout(() => {
  closeMessage()
}, props.duration)
}

/**
* 该函数用于关闭消息框。
* 它首先将`isShow`的值设置为`false`，从而在视图上隐藏消息框。
* 接着，它会检查是否有子元素存在，并在子元素数量小于等于1的情况下，
* 经过500毫秒的延迟后移除消息框元素。
*/
const closeMessage = () => {
// 隐藏消息框
isShow.value = false

emit('close')
}

/**
* 定义并暴露 `closeMessage` 函数给外部使用。
* 该函数通常用于关闭或处理消息提示等UI元素。
* 
* @expose {Function} closeMessage - 用于关闭消息提示的函数。
*/
defineExpose({ closeMessage })

onMounted(() => {
showOrHide()
emit('show')
})

/**
* 监听 isShow 变量的变化。
* 当 isShow 变量的值发生变化时，清除名为 durationTimer 的定时器。
* 该定时器通常用于控制某些持续时间的逻辑，当 isShow 变量状态改变时，可能需要重置或结束该逻辑。
*/
watch(
isShow,
() => clearTimeout(durationTimer),
)
</script>
<style scoped lang="scss">
@import './style/index.scss';
</style>