<template>
  <div class="f-watermark" :style="watermarkStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withInstall } from '@utils/install'

defineOptions({ name: 'FWatermark', inheritAttrs: false })

export interface WatermarkProps {
  content?: string
  image?: string
  width?: number
  height?: number
  rotate?: number
  opacity?: number
  fontSize?: number
  color?: string
  gap?: [number, number]
  zIndex?: number
}

const props = withDefaults(defineProps<WatermarkProps>(), {
  content: '',
  image: '',
  width: 200,
  height: 200,
  rotate: -22,
  opacity: 0.15,
  fontSize: 14,
  color: 'rgba(0, 0, 0, 0.15)',
  gap: () => [100, 100],
  zIndex: 9
})

const canvasRef = ref<HTMLCanvasElement>()
const watermarkUrl = ref('')

const watermarkStyle = computed(() => ({
  position: 'relative' as const,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${watermarkUrl.value})`,
    backgroundRepeat: 'repeat',
    zIndex: props.zIndex,
    pointerEvents: 'none'
  }
}))

const generateWatermark = () => {
  if (props.image) {
    watermarkUrl.value = props.image
    return
  }

  if (!props.content) return

  const canvas = document.createElement('canvas')
  canvas.width = props.width
  canvas.height = props.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((props.rotate * Math.PI) / 180)
  ctx.font = `${props.fontSize}px sans-serif`
  ctx.fillStyle = props.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(props.content, 0, 0)

  watermarkUrl.value = canvas.toDataURL('image/png')
}

onMounted(() => {
  generateWatermark()
})
</script>
