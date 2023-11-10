<template>
  <div class="source-code-box">
    <div v-html="curCodeStr"></div>
    <div class="copy-code" @click="copyCode">复制</div>
    <Transition>
      <div class="copy-code-tip" :class="isCopy?'':'fail'" v-if="isCopy">{{ copyTip }}</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { type CurLangType, highlightCode } from './util'
import * as clipboard from "clipboard-polyfill";
import 'prismjs/themes/prism-okaidia.min.css'

// @ts-expect-error
const modules = import.meta.glob('../../../examples/*/*.vue', { as: 'raw', eager: true })

const props = withDefaults(defineProps<{
  filePath?: string
  lang?: CurLangType
}>(), {
  filePath: '../../../examples/button/index.vue',
  lang: 'html'
})

const curCodeStr = ref<string>('')
const isCopy = ref(false)
const copyTip = ref('复制失败!')
const copyCode = async () => {
  try {
    // await navigator.clipboard.writeText(modules[props.filePath]);
    await clipboard.writeText(modules[props.filePath]);
    // console.log('Text copied successfully!');
    copyTip.value = '复制成功!'
    isCopy.value = true
  } catch (error) {
    copyTip.value = '复制失败!'
    isCopy.value = false
    // console.error('Failed to copy text:', error);
  } finally {
    setTimeout(() => {
      isCopy.value = false
    }, 2000);
  }
}


watch(() => props.filePath, (path) => {
  if (path) {
    curCodeStr.value = highlightCode(modules[path], props.lang)
  }
}, {
  immediate: true,
  deep: true
})
</script>

<style scoped lang="scss">
 .v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.source-code-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .copy-code {
    padding: 10px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, .2);
    color: white;
    position: absolute;
    left: auto;
    bottom: auto;
    right: 2px;
    top: 10px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: greenyellow;
    }
  }

  & .copy-code-tip {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: rgba(10, 199, 10,.5);
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    user-select: none;
    padding: 10px;
    border-radius: 5px;
    z-index: 10;
    color: white;

    &.fail {
      background-color: rgba(161, 6, 6,.5);
    }
  }
}
</style>