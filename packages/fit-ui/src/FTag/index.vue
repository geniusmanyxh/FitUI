<template>
  <span :class="tagClasses" :style="customStyle">
    <slot name="label">{{ label }}</slot>
    <span v-if="closable" class="close-btn" :class="{ disabled: disabled }" @click.stop="handleClose">
      <slot name="close">
        <FIcon icon="close"></FIcon>
      </slot>
    </span>
  </span>
</template>

<script setup lang="ts">
/**
 * FTag 标签组件
 * 
 * @description 用于标记和分类的标签组件,支持多种模式、类型和尺寸
 * @example
 * ```vue
 * <FTag label="默认标签" />
 * <FTag label="成功标签" type="success" mode="light" />
 * <FTag label="可关闭" closable @close="handleClose" />
 * <FTag label="圆角" round size="large" />
 * ```
 */
import { computed } from 'vue';
import FIcon from '@/FIcon';

defineOptions({
  name: 'FTag',
  inheritAttrs: false,
});

/**
 * 标签组件属性
 */
export interface TagProps {
  /**
   * 标签文本
   * @default ''
   */
  label?: string
  
  /**
   * 标签模式
   * @default 'dark'
   * @description 
   * - dark: 深色模式
   * - light: 浅色模式
   * - plain: 朴素模式
   */
  mode?: 'dark' | 'light' | 'plain'
  
  /**
   * 标签类型
   * @default 'default'
   */
  type?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default'
  
  /**
   * 标签尺寸
   * @default 'medium'
   */
  size?: 'mini' | 'small' | 'medium' | 'large'
  
  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean
  
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  
  /**
   * 是否圆角
   * @default false
   */
  round?: boolean
  
  /**
   * 自定义背景色
   * @default ''
   * @example '#409eff'
   */
  bgColor?: string
  
  /**
   * 自定义文本颜色
   * @default ''
   * @example '#ffffff'
   */
  textColor?: string
  
  /**
   * 自定义边框颜色
   * @default ''
   * @example '#409eff'
   */
  borderColor?: string
}

const props = withDefaults(defineProps<TagProps>(), {
  closable: false,
  disabled: false,
  mode: 'dark',
  type: 'default',
  size: 'medium',
  label: '',
  round: false,
  bgColor: '',
  textColor: '',
  borderColor: '',
});

/**
 * 标签组件事件
 */
interface TagEmits {
  /**
   * 关闭事件
   * @description 点击关闭按钮时触发
   */
  (e: 'close'): void
}

const emit = defineEmits<TagEmits>();

/**
 * 处理关闭事件
 */
const handleClose = () => {
  if (!props.disabled) {
    emit('close');
  }
};

/**
 * 计算标签的类名
 */
const tagClasses = computed(() => {
  const classes = ['tag'];
  
  // 添加类型和模式组合的类名
  classes.push(`tag-${props.type}-${props.mode}`);
  
  // 添加尺寸类名（medium 是默认值，不需要额外类名）
  if (props.size && props.size !== 'medium') {
    classes.push(`tag-${props.size}`);
  }
  
  // 添加圆角类名
  if (props.round) {
    classes.push('tag-round');
  }
  
  // 添加禁用类名
  if (props.disabled) {
    classes.push('tag-disabled');
  }
  
  return classes;
});

/**
 * 自定义样式（支持用户自定义颜色）
 */
const customStyle = computed(() => {
  const style: Record<string, string> = {};
  
  if (props.bgColor) {
    style.backgroundColor = props.bgColor;
  }
  
  if (props.textColor) {
    style.color = props.textColor;
  }
  
  if (props.borderColor) {
    style.borderColor = props.borderColor;
  }
  
  return style;
});
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
