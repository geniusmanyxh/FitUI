<template>
  <div class="f-image" :class="[`f-image--${fit}`]" :style="imageStyle">
    <img
      :src="src"
      :alt="alt"
      :class="{ 'f-image__inner': true, 'is-loading': loading, 'is-error': error, 'is-loaded': loaded }"
      @load="handleLoad"
      @error="handleError"
      v-show="show"
    >
    <div v-if="loading || lazy && !loaded" class="f-image__placeholder">
      <slot name="placeholder">
        <f-icon icon="image" size="large" class="f-image__placeholder-icon"></f-icon>
      </slot>
    </div>
    <div v-if="error" class="f-image__error">
      <slot name="error">
        <f-icon icon="image-cross" size="large" class="f-image__error-icon"></f-icon>
      </slot>
    </div>
    <div v-if="preview" class="f-image__preview-mask" @click="handlePreview">
      <f-icon icon="zoom-in" class="f-image__preview-icon"></f-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { withInstall } from '@utils/install'
import FIcon from '@/FIcon'

defineOptions({ name: 'FImage', inheritAttrs: false })

export interface ImageProps {
  src?: string
  alt?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  lazy?: boolean
  previewSrcList?: string[]
  zIndex?: number
  initialIndex?: number
  width?: string | number
  height?: string | number
}

export interface ImageEmits {
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
  (e: 'preview', index: number): void
}

const props = withDefaults(defineProps<ImageProps>(), {
  src: '',
  alt: '',
  fit: 'fill',
  lazy: false,
  previewSrcList: () => [],
  zIndex: 2000,
  initialIndex: 0
})

const emit = defineEmits<ImageEmits>()

const loading = ref(true)
const error = ref(false)
const loaded = ref(false)
const show = ref(false)

const imageStyle = computed(() => ({
  width: props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : undefined,
  height: props.height ? (typeof props.height === 'number' ? `${props.height}px` : props.height) : undefined
}))

const preview = computed(() => props.previewSrcList.length > 0)

const handleLoad = (event: Event) => {
  loading.value = false
  error.value = false
  loaded.value = true
  show.value = true
  emit('load', event)
}

const handleError = (event: Event) => {
  loading.value = false
  error.value = true
  loaded.value = false
  emit('error', event)
}

const handlePreview = () => {
  if (!preview.value) return
  const index = props.previewSrcList.indexOf(props.src)
  emit('preview', index >= 0 ? index : 0)
}

onMounted(() => {
  if (!props.lazy) {
    show.value = true
  }
})
</script>

<style scoped lang="scss">
.f-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 4px;

  &--fill {
    .f-image__inner {
      object-fit: fill;
    }
  }

  &--contain {
    .f-image__inner {
      object-fit: contain;
    }
  }

  &--cover {
    .f-image__inner {
      object-fit: cover;
    }
  }

  &--none {
    .f-image__inner {
      object-fit: none;
    }
  }

  &--scale-down {
    .f-image__inner {
      object-fit: scale-down;
    }
  }

  &__inner {
    width: 100%;
    height: 100%;
    transition: opacity 0.3s;
  }

  &__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
  }

  &__error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
    color: #909399;
  }

  &__preview-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  &__preview-icon {
    color: white;
    font-size: 24px;
  }
}
</style>
