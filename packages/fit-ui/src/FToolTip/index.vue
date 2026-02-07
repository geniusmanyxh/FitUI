<template>
    <div ref="wrapperRef" class="f-tooltip-wrapper" :class="modeClassRef" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click.stop="handleClick" @focus="handleFocus" @blur="handleBlur">
        <slot></slot> <!-- 允许用户自定义触发元素 -->

        <Teleport v-if="teleported && visible" to="body">
          <div class="f-tooltip-arrow" :class="arrowPosition" :style="arrowStyle"></div>
        </Teleport>
        <div v-else v-show="visible" class="f-tooltip-arrow" :class="arrowPosition" :style="arrowStyle"></div>
        <Teleport v-if="teleported" to="body">
          <div ref="contentRef" v-show="visible" class="f-tooltip-content" :class="popperClass" :style="tooltipStyle" @mouseenter="handleTooltipMouseEnter" @mouseleave="handleTooltipMouseLeave">
              <div class="f-tooltip-inner" :style="{minWidth:(maxWidth && maxWidth > 0)?'auto':'max-content', width: (maxWidth && maxWidth>0)? `${maxWidth}px`:'fit-content' }">
                  <span v-if="rawContent" v-html="content"></span>
                  <span v-else>{{ content }}</span>
              </div>
          </div>
        </Teleport>
        <div v-else ref="contentRef" v-show="visible" class="f-tooltip-content" :class="popperClass" :style="tooltipStyle" @mouseenter="handleTooltipMouseEnter" @mouseleave="handleTooltipMouseLeave">
            <div class="f-tooltip-inner" :style="{minWidth:(maxWidth && maxWidth > 0)?'auto':'max-content', width: (maxWidth && maxWidth>0)? `${maxWidth}px`:'fit-content' }">
                <span v-if="rawContent" v-html="content"></span>
                <span v-else>{{ content }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
/**
 * FToolTip 工具提示组件
 * 
 * @description 鼠标悬停或点击时显示的提示信息
 * @example
 * ```vue
 * <FToolTip content="这是提示信息" position="top">
 *   <FButton>悬停我</FButton>
 * </FToolTip>
 * 
 * <FToolTip content="点击提示" trigger="click" mode="dark">
 *   <span>点击我</span>
 * </FToolTip>
 * ```
 */
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';


defineOptions({ name: 'FToolTip', inheritAttrs: false, })

/**
 * ToolTip 组件属性
 */
export interface ToolTipProps {
  /**
   * 提示内容（必填）
   */
  content: string
  
  /**
   * 主题模式
   * @default 'light'
   * @description
   * - dark: 深色主题
   * - light: 浅色主题
   * - custom: 自定义主题（需配合 modeTextColor 和 modeBgColor）
   */
  mode?: 'dark' | 'light' | 'custom'
  
  /**
   * 自定义文本颜色
   * @default ''
   * @description 仅在 mode='custom' 时生效
   * @example '#ffffff'
   */
  modeTextColor?: string
  
  /**
   * 自定义背景颜色
   * @default ''
   * @description 仅在 mode='custom' 时生效
   * @example '#409eff'
   */
  modeBgColor?: string
  
  /**
   * 提示位置
   * @default 'left'
   * @example 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' 等
   */
  position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  
  /**
   * 触发方式
   * @default 'hover'
   * @description
   * - hover: 鼠标悬停触发
   * - click: 点击触发
   * - focus: 聚焦触发
   * - manual: 手动控制
   */
  trigger?: 'hover' | 'click' | 'focus' | 'manual'
  
  /**
   * 提示偏移量（像素）
   * @default 2
   */
  offset?: number
  
  /**
   * z-index 层级
   * @default 1001
   */
  zIndex?: number
  
  /**
   * 最大宽度（像素）
   * @default undefined
   * @description 不设置则根据内容自适应
   */
  maxWidth?: number
  
  /**
   * 是否禁用
   * @default false
   * @description 当设置为 true 时，tooltip 不会显示
   */
  disabled?: boolean
  
  /**
   * 显示延迟时间（毫秒）
   * @default 0
   */
  showAfter?: number
  
  /**
   * 隐藏延迟时间（毫秒）
   * @default 200
   */
  hideAfter?: number
  
  /**
   * 弹出层的自定义类名
   * @default undefined
   */
  popperClass?: string
  
  /**
   * 是否将内容作为 HTML 渲染
   * @default false
   */
  rawContent?: boolean
  
  /**
   * 是否持久化显示（鼠标移出后不消失）
   * @default false
   */
  persistent?: boolean
  
  /**
   * 是否使用 Teleport 传送
   * @default true
   */
  teleported?: boolean
  
  /**
   * 提示位置（position 的别名）
   * @default undefined
   */
  placement?: string
}

const props = withDefaults(defineProps<ToolTipProps>(), {
    content: '',
    mode: 'light',
    position: 'left',
    trigger: 'hover',
    offset: 2,
    zIndex: 1001,
    disabled: false,
    showAfter: 0,
    hideAfter: 200,
    popperClass: undefined,
    rawContent: false,
    persistent: false,
    teleported: true,
    placement: undefined
});

const wrapperRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const visible = ref(false);
const arrowPosition = ref('arrow-top');
const tooltipStyle = ref<Record<string, string | number>>({});
const arrowStyle = ref<Record<string, string | number>>({});
const modeClassRef = ref(`mode-${props.mode}`)
const showTimer = ref<number>()
const hideTimer = ref<number>()

// 计算实际位置（支持 placement 别名）
const actualPosition = computed(() => {
  return props.placement || props.position
})

const popperClass = computed(() => props.popperClass)

// 根据主题动态设置样式
const themeClassCPT = () => {
    if (props.mode === 'custom') {
        const position = arrowPosition.value.split('-')[1];
        switch (position) {
            case 'top':
                arrowStyle.value = {...arrowStyle.value,borderTopColor: props.modeBgColor || '#fff'}
                break;
            case 'bottom':
                arrowStyle.value = {...arrowStyle.value,borderBottomColor: props.modeBgColor || '#fff'}
                break;
            case 'left':
                arrowStyle.value = {...arrowStyle.value,borderLeftColor: props.modeBgColor || '#fff'}
                break;
            case 'right':
                arrowStyle.value = {...arrowStyle.value,borderRightColor: props.modeBgColor || '#fff'}
                break;
        }
        tooltipStyle.value = {...tooltipStyle.value,backgroundColor: props.modeBgColor || '#fff',color: props.modeTextColor || '#000'}
        // document.documentElement.style.setProperty('--f-tooltip-background', props.modeBgColor || '#fff');
        // document.documentElement.style.setProperty('--f-tooltip-text-color', props.modeTextColor || '#000');
        // document.documentElement.style.setProperty('--f-tooltip-border-color', props.modeBgColor || '#fff');
    }
    modeClassRef.value = `mode-${props.mode}`
    // return `mode-${props.mode}`
};

const handleMouseEnter = () => {
    if (props.disabled || props.trigger !== 'hover') return
    if (hideTimer.value) {
        clearTimeout(hideTimer.value)
        hideTimer.value = undefined
    }
    updateTooltipPosition()
    if (props.showAfter > 0) {
        if (showTimer.value) {
            clearTimeout(showTimer.value)
        }
        showTimer.value = window.setTimeout(() => {
            visible.value = true
        }, props.showAfter)
    } else {
        visible.value = true
    }
};

const handleMouseLeave = () => {
    if (props.disabled || props.trigger !== 'hover') return
    if (showTimer.value) {
        clearTimeout(showTimer.value)
        showTimer.value = undefined
    }
    if (!props.persistent) {
        if (props.hideAfter > 0) {
            hideTimer.value = window.setTimeout(() => {
                visible.value = false
            }, props.hideAfter)
        } else {
            visible.value = false
        }
    }
};

const handleClick = () => {
    if (props.disabled || props.trigger !== 'click') return
    updateTooltipPosition()
    visible.value = !visible.value
};

const handleFocus = () => {
    if (props.disabled || props.trigger !== 'focus') return
    updateTooltipPosition()
    visible.value = true
}

const handleBlur = () => {
    if (props.disabled || props.trigger !== 'focus') return
    visible.value = false
}

const handleTooltipMouseEnter = () => {
    if (props.persistent && props.trigger === 'hover') {
        if (hideTimer.value) {
            clearTimeout(hideTimer.value)
            hideTimer.value = undefined
        }
    }
}

const handleTooltipMouseLeave = () => {
    if (props.persistent && props.trigger === 'hover') {
        if (props.hideAfter > 0) {
            hideTimer.value = window.setTimeout(() => {
                visible.value = false
            }, props.hideAfter)
        } else {
            visible.value = false
        }
    }
}

// 根据 position 计算箭头和提示框的位置（使用 template ref 避免多实例选错节点）
const updateTooltipPosition = () => {
    const el = wrapperRef.value
    const tooltip = contentRef.value

    if (!el || !tooltip) return;
    // const tooltipRect = tooltip.getBoundingClientRect();
    // console.log('rect',rect);
    // console.log('tooltip',tooltipRect);


    const position = actualPosition.value
    switch (position) {
        case 'top':
            arrowPosition.value = 'arrow-top';
            tooltipStyle.value = {
                // left: `${rect.width / 2}px`,
                left: `50%`,
                top: `-${6 + props.offset}px`,
                transform: 'translate(-50%,-100%)',
            };
            arrowStyle.value = {
                left: `50%`,
                top: `-${props.offset}px`,
                transform: `translate(-50%,-100%)`,
                // left: `${(rect.width) / 2}px`,
            };
            break;
        case 'top-start':
            arrowPosition.value = 'arrow-top';
            tooltipStyle.value = {
                left: `0`,
                top: `-${6 + props.offset}px`,
                transform: 'translate(0,-100%)',
            };
            arrowStyle.value = {
                left: `50%`,
                // transform: `translateX(-50%)`,
                top: `-${props.offset}px`,
                transform: `translate(-50%,-100%)`,
            };
            break;
        case 'top-end':
            arrowPosition.value = 'arrow-top';
            tooltipStyle.value = {
                right: `0`,
                top: `-${6 + props.offset}px`,
                transform: `translate(0,-100%)`,
            };
            arrowStyle.value = {
                left: `50%`,
                // transform: `translateX(-50%)`,
                top: `-${props.offset}px`,
                transform: `translate(-50%,-100%)`,
            };
            break;
        case 'bottom':
            arrowPosition.value = 'arrow-bottom';
            tooltipStyle.value = {
                left: `50%`,
                // left: `${rect.width / 2}px`,
                bottom: `-${6 + props.offset}px`,
                transform: 'translate(-50%,100%)',
            };
            arrowStyle.value = {
                left: `50%`,
                bottom: `-${ props.offset}px`,
                transform: `translate(-50%,100%)`,
                // left: `${(rect.width) / 2}px`,
            };
            break;
        case 'bottom-start':
            arrowPosition.value = 'arrow-bottom';
            tooltipStyle.value = {
                left: `0`,
                // left: `${rect.width / 2}px`,
                bottom: `-${6 + props.offset}px`,
                transform: 'translate(0,100%)',
            };
            arrowStyle.value = {
                left: `50%`,
                bottom: `-${ props.offset}px`,
                transform: `translate(-50%,100%)`,
                // left: `${(rect.width) / 2}px`,
            };
            break;
        case 'bottom-end':
            arrowPosition.value = 'arrow-bottom';
            tooltipStyle.value = {
                right: `0`,
                bottom: `-${6 + props.offset}px`,
                transform: 'translate(0,100%)',
            };
            arrowStyle.value = {
                left: `50%`,
                bottom: `-${ props.offset}px`,
                transform: `translate(-50%,100%)`,
                // left: `${(rect.width) / 2}px`,
            };
            break;
        case 'left':
            arrowPosition.value = 'arrow-left';
            tooltipStyle.value = {
                //   left: `-${rect.width + 6 + props.offset }px`,
                left: `-${6 + props.offset}px`,
                top: `50%`,
                transform: 'translate(-100%,-50%)',
            };
            arrowStyle.value = {
                left: `-${1 + props.offset}px`,
                top: `50%`,
                transform: `translate(-100%,-50%)`,
            };
            break;
        case 'left-start':
            arrowPosition.value = 'arrow-left';
            tooltipStyle.value = {
                //   left: `-${rect.width + 6 + props.offset }px`,
                left: `-${6 + props.offset}px`,
                top: `0`,
                transform: 'translate(-100%,0)',
            };
            arrowStyle.value = {
                left: `-${1 + props.offset}px`,
                top: `50%`,
                transform: `translate(-100%,-50%)`,
            };
            break;
        case 'left-end':
            arrowPosition.value = 'arrow-left';
            tooltipStyle.value = {
                //   left: `-${rect.width + 6 + props.offset }px`,
                left: `-${6 + props.offset}px`,
                bottom: `0`,
                transform: 'translate(-100%,0)',
            };
            arrowStyle.value = {
                left: `-${1 + props.offset}px`,
                top: `50%`,
                transform: `translate(-100%,-50%)`,
            };
            break;
        case 'right':
            arrowPosition.value = 'arrow-right';
            tooltipStyle.value = {
                //   left: `-${rect.width + 6 + props.offset }px`,
                right: `-${6 + props.offset}px`,
                top: `50%`,
                transform: 'translate(100%,-50%)',
            };
            arrowStyle.value = {
                right: `-${1 + props.offset}px`,
                top: `50%`,
                transform: `translate(100%,-50%)`,
            };
            break;
        case 'right-start':
            arrowPosition.value = 'arrow-right';
            tooltipStyle.value = {
                //   left: `-${rect.width + 6 + props.offset }px`,
                right: `-${6 + props.offset}px`,
                top: `0`,
                transform: 'translate(100%,0)',
            };
            arrowStyle.value = {
                right: `-${1 + props.offset}px`,
                top: `50%`,
                transform: `translate(100%,-50%)`,
            };
            break;
        case 'right-end':
            arrowPosition.value = 'arrow-right';
            tooltipStyle.value = {
                //   left: `-${rect.width + 6 + props.offset }px`,
                right: `-${6 + props.offset}px`,
                bottom: `0`,
                transform: 'translate(100%,0)',
            };
            arrowStyle.value = {
                right: `-${1 + props.offset}px`,
                top: `50%`,
                transform: `translate(100%,-50%)`,
            };
            break;
    }
    tooltipStyle.value = {
        ...tooltipStyle.value,
        zIndex: props.zIndex
    };

    arrowStyle.value = {
        ...arrowStyle.value,
        zIndex: props.zIndex + 1
    };

    themeClassCPT();
};

onMounted(() => {
    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateTooltipPosition);
    if (showTimer.value) {
        clearTimeout(showTimer.value)
    }
    if (hideTimer.value) {
        clearTimeout(hideTimer.value)
    }
});

watch(
    [
        () => actualPosition.value,
        () => props.mode,
        () => props.offset,
        () => props.zIndex,
        () => props.modeBgColor,
        () => props.modeTextColor,
    ],
    () => updateTooltipPosition(),
    { immediate: true }
);

// 监听 disabled 变化
watch(() => props.disabled, (newVal) => {
    if (newVal) {
        visible.value = false
        if (showTimer.value) {
            clearTimeout(showTimer.value)
            showTimer.value = undefined
        }
        if (hideTimer.value) {
            clearTimeout(hideTimer.value)
            hideTimer.value = undefined
        }
    }
})

// 监听 trigger 变化，重置状态
watch(() => props.trigger, () => {
    if (props.trigger === 'manual') {
        // manual 模式需要外部控制
    } else {
        visible.value = false
    }
})
</script>

<style lang="scss" scoped>
@use './style/index' as *;
</style>