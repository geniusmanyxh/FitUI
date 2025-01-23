<template>
    <ClientOnly>
        <div class="showDemo">

            <div v-if="hasDescSlots" class="show-desc">
                <slot name="desc"></slot>
            </div>
            <div v-else class="show-desc" v-show="desc">{{ desc }}</div>

            <div class="show-components" v-if="hasSlots">
                <slot></slot>
            </div>
            <component :is="dynamicComponent" v-else></component>
            <FCodeBlock :theme="codeTheme" :code="modules[fullPath]" :lang="lang" />
            <!-- <div class="is-show-code" :style="{ marginBottom: isShowCode ? '-5px' : '0px' }" @click="handleCodeSty">
          <span>{{ codeText }}</span>
        </div>
        <Transition>
        </Transition> -->
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent, shallowRef, useSlots } from 'vue';
import type { Component } from 'vue'
import { FCodeBlock } from '@geniusmanyxh/fit-ui'
import { useData } from 'vitepress';

const props = withDefaults(defineProps<{
    rootPath?: string
    filePath?: string
    desc?: string | null
    lang?: 'js' | 'ts' | 'html' | 'css'
}>(), {
    rootPath: '../../../examples',
    filePath: 'button/index.vue',
    desc: null,
    lang: 'js'
});

const vpData = useData();
const codeTheme = ref('')
// @ts-expect-error
const modules = import.meta.glob('../../../examples/*/*.vue', { as: 'raw', eager: true })
// 查看是否有插槽
const slots = useSlots()
const hasSlots = ref(slots.default !== undefined ? true : false)
const hasDescSlots = ref(slots.desc !== undefined ? true : false)
// @ts-expect-error
const components = import.meta.glob('../../../examples/*/*.vue')

// 渲染动态组件
const fullPath = ref(`${props.rootPath}/${props.filePath}`)
const dynamicComponent = shallowRef<Component>();
// const test = defineAsyncComponent(() => import(/* @vite-ignore */fullPath.value))

const loadDynamicComponent = async (path: string) => {
    // const { default: component } = await import(/* @vite-ignore */ path)
    dynamicComponent.value = defineAsyncComponent(components[path])
}

// 查看组件代码
const isShowCode = ref(false) // 默认不展示
const codeText = ref("显示代码")

const handleCodeSty = () => {
    isShowCode.value = !isShowCode.value
    if (isShowCode.value) {
        codeText.value = '隐藏代码'
    } else {
        codeText.value = '显示代码'
    }
}

watch([
    () => props.rootPath,
    () => props.filePath,
    () => props.desc
], ([path, name, desc]) => {
    fullPath.value = path + '/' + name
    loadDynamicComponent(fullPath.value)
}, {
    immediate: true,
    deep: true
});

watch(() => vpData.isDark.value, (newVal) => {
    // console.log('theme', newVal);
    codeTheme.value = newVal ? 'dark' : ''
}, { immediate: true })

</script>

<style scoped lang="scss">
.showDemo {
    margin: 10px 0px;
    padding: 5px;
    border-radius: 5px;
    background-color: rgba(200, 194, 194, .1);
    box-sizing: border-box;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);

    :deep(code) {
        color: white !important;
    }

    &>.show-desc {
        padding: 10px 5px;
        margin-bottom: 20px;
        // background-color: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid gainsboro;
    }

    .show-components {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 10px 0px;
    }
}

.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.is-show-code {
    width: 100%;
    background-color: rgb(168, 167, 192);
    transition: all 0.5s ease-in;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    color: black;
    position: relative;
    overflow: hidden;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 0;
        height: 100%;
        transform: skew(15deg);
        transition: all 0.5s;
        overflow: hidden;
        z-index: -1;
    }

    &::before {
        left: -10px;
        background: #240046;
    }

    &::after {
        right: -10px;
        background: #5a189a;
    }

    &:hover::before,
    &:hover::after {
        width: 58%;
    }

    &:hover span {
        color: #fff;
        transition: 0.3s;
    }

    & span {
        color: #03045e;
        font-size: 18px;
        transition: all 0.3s ease-in;
    }
}
</style>