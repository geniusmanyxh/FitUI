<template>
  <div class="f-popconfirm" ref="triggerRef">
    <div @click="toggleVisible">
      <slot name="reference"></slot>
    </div>
    <transition name="f-popconfirm-fade">
      <div v-if="visible" class="f-popconfirm__popper" :style="popperStyle" role="dialog" aria-modal="true">
        <div class="f-popconfirm__content">
          <f-icon icon="circle-information" class="f-popconfirm__icon"></f-icon>
          <span class="f-popconfirm__message">{{ title }}</span>
        </div>
        <div class="f-popconfirm__footer">
          <button class="f-popconfirm__btn f-popconfirm__btn--cancel" @click="handleCancel">
            {{ cancelButtonText }}
          </button>
          <button class="f-popconfirm__btn f-popconfirm__btn--confirm" @click="handleConfirm">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { withInstall } from '@utils/install'
import FIcon from '@/FIcon'

defineOptions({ name: 'FPopconfirm', inheritAttrs: false })

export interface PopconfirmProps {
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  width?: string | number
  zIndex?: number
  trigger?: 'click' | 'hover'
}

export interface PopconfirmEmits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  width: '200px',
  zIndex: 2000,
  trigger: 'click'
})

const emit = defineEmits<PopconfirmEmits>()

const visible = ref(false)
const triggerRef = ref<HTMLElement>()

const popperStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  zIndex: props.zIndex
}))

const toggleVisible = () => {
  visible.value = !visible.value
}

const handleConfirm = () => {
  visible.value = false
  emit('confirm')
}

const handleCancel = () => {
  visible.value = false
  emit('cancel')
}

const handleClickOutside = (e: MouseEvent) => {
  if (triggerRef.value && !triggerRef.value.contains(e.target as Node)) {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.f-popconfirm {
  position: relative;
  display: inline-block;

  &__popper {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
    background: white;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    z-index: 2000;
    padding: 12px;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 12px;
  }

  &__icon {
    color: #e6a23c;
    flex-shrink: 0;
    margin-top: 2px;
  }

  &__message {
    font-size: 14px;
    color: #303133;
    line-height: 1.4;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  &__btn {
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    background: white;
    color: #606266;
    transition: all 0.2s;

    &--confirm {
      background: #409eff;
      border-color: #409eff;
      color: white;

      &:hover {
        background: #66b1ff;
        border-color: #66b1ff;
      }
    }

    &--cancel {
      &:hover {
        background: #f5f7fa;
      }
    }
  }
}

.f-popconfirm-fade-enter-active,
.f-popconfirm-fade-leave-active {
  transition: opacity 0.2s;
}

.f-popconfirm-fade-enter-from,
.f-popconfirm-fade-leave-to {
  opacity: 0;
}
</style>
