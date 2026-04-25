<template>
  <transition name="f-backtop-fade">
    <div
      v-if="visible"
      class="f-backtop"
      :class="backtopClass"
      :style="backtopStyle"
      role="button"
      tabindex="0"
      :aria-label="label || 'Back to top'"
      @click="handleClick"
      @keydown.enter="handleClick"
      @keydown.space.prevent="handleClick"
    >
      <slot>
        <f-icon icon="arrow-up" size="medium"></f-icon>
      </slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { withInstall } from '@utils/install'
import FIcon from '@/FIcon'

defineOptions({ name: 'FBacktop', inheritAttrs: false })

export interface BacktopProps {
  visibilityHeight?: number
  target?: string
  right?: number | string
  bottom?: number | string
  label?: string
}

export interface BacktopEmits {
  (e: 'click'): void
}

const props = withDefaults(defineProps<BacktopProps>(), {
  visibilityHeight: 200,
  target: '',
  right: 40,
  bottom: 40,
  label: 'Back to top'
})

const emit = defineEmits<BacktopEmits>()

const visible = ref(false)
let scrollContainer: HTMLElement | Window | null = null

const backtopStyle = computed(() => ({
  right: typeof props.right === 'number' ? `${props.right}px` : props.right,
  bottom: typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom
}))

const backtopClass = computed(() => ({
  'f-backtop--fixed': true
}))

const handleScroll = () => {
  const scrollTop = scrollContainer instanceof Window
    ? document.documentElement.scrollTop || document.body.scrollTop
    : (scrollContainer as HTMLElement)?.scrollTop || 0
  visible.value = scrollTop >= props.visibilityHeight
}

const handleClick = () => {
  if (scrollContainer instanceof Window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (scrollContainer) {
    (scrollContainer as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' })
  }
  emit('click')
}

onMounted(() => {
  if (props.target) {
    scrollContainer = document.querySelector(props.target)
  } else {
    scrollContainer = window
  }
  scrollContainer?.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  scrollContainer?.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.f-backtop {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.f-backtop-fade-enter-active,
.f-backtop-fade-leave-active {
  transition: opacity 0.3s ease;
}

.f-backtop-fade-enter-from,
.f-backtop-fade-leave-to {
  opacity: 0;
}
</style>
