<template>
  <div class="f-scrollbar" ref="containerRef" :class="{ 'f-scrollbar--wrap': wrap }" :style="containerStyle">
    <div class="f-scrollbar__wrap" ref="wrapRef" @scroll="handleScroll">
      <slot></slot>
    </div>
    <div v-if="vertical" class="f-scrollbar__bar f-scrollbar__bar--vertical" :style="verticalBarStyle" @mousedown="handleBarMouseDown('vertical', $event)" :class="{ 'f-scrollbar__bar--visible': showVertical }">
      <div class="f-scrollbar__thumb" ref="thumbRef"></div>
    </div>
    <div v-if="horizontal" class="f-scrollbar__bar f-scrollbar__bar--horizontal" :style="horizontalBarStyle" @mousedown="handleBarMouseDown('horizontal', $event)" :class="{ 'f-scrollbar__bar--visible': showHorizontal }">
      <div class="f-scrollbar__thumb" ref="thumbRefH"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { withInstall } from '@utils/install'

defineOptions({ name: 'FScrollbar', inheritAttrs: false })

export interface ScrollbarProps {
  height?: string
  maxHeight?: string
  wrap?: boolean
  native?: boolean
}

const props = withDefaults(defineProps<ScrollbarProps>(), {
  height: '',
  maxHeight: '',
  wrap: false,
  native: false
})

const containerRef = ref<HTMLElement>()
const wrapRef = ref<HTMLElement>()
const scrollTop = ref(0)
const scrollLeft = ref(0)
const scrollHeight = ref(0)
const scrollWidth = ref(0)
const clientHeight = ref(0)
const clientWidth = ref(0)

const vertical = computed(() => scrollHeight.value > clientHeight.value && !props.native)
const horizontal = computed(() => scrollWidth.value > clientWidth.value && !props.native)

const showVertical = computed(() => vertical.value && scrollHeight.value > 0)
const showHorizontal = computed(() => horizontal.value && scrollWidth.value > 0)

const verticalBarStyle = computed(() => ({
  height: `${(clientHeight.value / scrollHeight.value) * 100}%`,
  transform: `translateY(${(scrollTop.value / scrollHeight.value) * 100}%)`
}))

const horizontalBarStyle = computed(() => ({
  width: `${(clientWidth.value / scrollWidth.value) * 100}%`,
  transform: `translateX(${(scrollLeft.value / scrollWidth.value) * 100}%)`
}))

const containerStyle = computed(() => ({
  height: props.height || undefined,
  maxHeight: props.maxHeight || undefined
}))

const handleScroll = () => {
  if (!wrapRef.value) return
  scrollTop.value = wrapRef.value.scrollTop
  scrollLeft.value = wrapRef.value.scrollLeft
  scrollHeight.value = wrapRef.value.scrollHeight
  scrollWidth.value = wrapRef.value.scrollWidth
  clientHeight.value = wrapRef.value.clientHeight
  clientWidth.value = wrapRef.value.clientWidth
}

const scrollTo = (options: ScrollToOptions | number, y?: number) => {
  if (wrapRef.value) {
    if (typeof options === 'number') {
      wrapRef.value.scrollTo(0, options)
    } else {
      wrapRef.value.scrollTo(options)
    }
  }
}

const setScrollTop = (top: number) => {
  if (wrapRef.value) {
    wrapRef.value.scrollTop = top
  }
}

const setScrollLeft = (left: number) => {
  if (wrapRef.value) {
    wrapRef.value.scrollLeft = left
  }
}

defineExpose({ scrollTo, setScrollTop, setScrollLeft, wrapRef })

onMounted(() => {
  if (wrapRef.value) {
    scrollHeight.value = wrapRef.value.scrollHeight
    scrollWidth.value = wrapRef.value.scrollWidth
    clientHeight.value = wrapRef.value.clientHeight
    clientWidth.value = wrapRef.value.clientWidth
  }
})
</script>

<style scoped lang="scss">
.f-scrollbar {
  position: relative;
  overflow: hidden;

  &__wrap {
    height: 100%;
    overflow: auto;
  }

  &__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s;

    &--vertical {
      top: 2px;
      width: 6px;
    }

    &--horizontal {
      left: 2px;
      height: 6px;
    }

    &--visible {
      opacity: 1;
    }
  }

  &__thumb {
    width: 100%;
    height: 100%;
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(144, 147, 153, 0.5);
    }
  }
}
</style>
