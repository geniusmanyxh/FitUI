<template>
    <div class="f-tooltip-wrapper" :class="themeClassCPT" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click.stop="handleClick">
        <!-- <div class="f-tooltip-trigger" @click.stop="handleClick">
            
        </div> -->

        <slot></slot> <!-- 允许用户自定义触发元素 -->

        <div v-show="visible" class="f-tooltip-arrow" :class="arrowPosition" :style="arrowStyle"></div>
        <div v-show="visible" class="f-tooltip-content" :style="tooltipStyle">
            <!-- <div class="f-tooltip-arrow" :class="arrowPosition" :style="arrowStyle"></div> -->
            <div class="f-tooltip-inner" :style="{ maxWidth: `${maxWidth}px` }">
                {{ content }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';


defineOptions({ name: 'FToolTip', inheritAttrs: false, })
const props = withDefaults(defineProps<{
    content: string;
    mode?: 'dark' | 'light' | 'custom';
    modeTextColor?: string;
    modeBgColor?: string;
    position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
    trigger?: 'hover' | 'click';
    offset?: number,
    zIndex?: number,
    maxWidth?: number,
}>(), {
    maxWidth:200,
    content: '',
    mode: 'light',
    position: 'left',
    trigger: 'hover',
    offset: 2,
    zIndex: 1001,
});

const visible = ref(false);
const arrowPosition = ref('arrow-top');
const tooltipStyle = ref({});
const arrowStyle = ref({});

// 根据主题动态设置样式
const themeClassCPT = computed(() => {
    if (props.mode === 'custom') {
        document.documentElement.style.setProperty('--f-tooltip-background', props.modeBgColor || '#fff');
        document.documentElement.style.setProperty('--f-tooltip-text-color', props.modeTextColor || '#000');
        document.documentElement.style.setProperty('--f-tooltip-border-color', props.modeBgColor || '#fff');
    }

    return `mode-${props.mode}`
});

const handleMouseEnter = () => {
    console.log(111);
    updateTooltipPosition()
    if (props.trigger === 'hover') {
        visible.value = true;
    }
};

const handleMouseLeave = () => {
    if (props.trigger === 'hover') {
        visible.value = false;
    }
};

const handleClick = () => {
    console.log(222);
    updateTooltipPosition()
    if (props.trigger === 'click') {
        visible.value = !visible.value;
    }
};

// 根据 position 计算箭头和提示框的位置
const updateTooltipPosition = () => {
    const el = document.querySelector('.f-tooltip-wrapper') as HTMLElement;
    const tooltip = document.querySelector('.f-tooltip-content') as HTMLElement;

    // 检查 el、tooltip 是否存在
    if (!el || !tooltip) return;

    const rect = el.getBoundingClientRect();
    // const tooltipRect = tooltip.getBoundingClientRect();
    // console.log('rect',rect);
    // console.log('tooltip',tooltipRect);


    switch (props.position) {
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
};

onMounted(() => {
    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateTooltipPosition);
});

watch(() => props, (val) => {
    // alert(JSON.stringify(val))
    updateTooltipPosition();
}, {
    deep: true,
    immediate: true
});
</script>

<style lang="scss" scoped>
.f-tooltip-wrapper {
    display: inline-block;
    position: relative;
}

.mode {
    &-dark {
        --f-tooltip-background: #404040;
        /* 文本提示框背景颜色 */
        --f-tooltip-text-color: #ffffff;
        /* 文本提示框文字颜色 */
        --f-tooltip-border-color: #404040;
        /* 文本提示框边框颜色 */

    }

    &-light {
        --f-tooltip-background: #ffffff;
        /* 文本提示框背景颜色 */
        --f-tooltip-text-color: #000000;
        /* 文本提示框文字颜色 */
        --f-tooltip-border-color: #ffffff;
        /* 文本提示框边框颜色 */

    }
}

.f-tooltip-content {
    position: absolute;
    z-index: 1000;
    padding: 8px;
    border-radius: 4px;
    white-space: nowrap;
    background: var(--f-tooltip-background);
    color: var(--f-tooltip-text-color);

}

.f-tooltip-trigger {
    display: inline-block;
    position: relative;
}

.f-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    z-index: 1000;
}

.f-tooltip-arrow.arrow-top {
    border-width: 6px 6px 0;
    border-color: var(--f-tooltip-border-color) transparent transparent transparent;
    // bottom: -6px;
}

.f-tooltip-arrow.arrow-bottom {
    border-width: 0 6px 6px;
    border-color: transparent transparent var(--f-tooltip-border-color) transparent;
    // top: -6px;
}

.f-tooltip-arrow.arrow-left {
    border-width: 6px 0 6px 6px; // 修改为箭头朝右
    border-color: transparent transparent transparent var(--f-tooltip-border-color); // 修改为箭头朝右
    // right: -6px;
}

.f-tooltip-arrow.arrow-right {
    border-width: 6px 6px 6px 0; // 修改为箭头朝左
    border-color: transparent var(--f-tooltip-border-color) transparent transparent; // 修改为箭头朝左
    // left: -6px;
}

.f-tooltip-inner {
    // padding: 5px 10px;
    max-width: 200px; /* 限定最大宽度 */
    word-wrap: break-word; /* 允许单词换行 */
    white-space: normal; /* 允许文本换行 */
}

/* UnoCSS styles */
@layer unocss {
    .f-tooltip-wrapper {
        cursor: pointer;
    }

    .f-tooltip-content {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
}
</style>