<template>
    <div class="codeBox" :data-theme='theme'>
      <div class="codeBox-header">
        <div class="codeBox-header-title">{{ title }}</div>
        <div class="codeBox-header-tools">
          
            <span ref="copyButton">
              <f-icon icon="copy"></f-icon>
            </span>
            <f-icon class="tools-item" icon="baseline-code" style="font-size: 20px" @click.stop="hanldeViewSourceCode"></f-icon>
          
        </div>
      </div>
  
      <Transition
        appear
        name="fade-slide"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div v-show="isShowCode" class="content">
          <span class="lang">{{ lang }}</span>
          <div v-html="highlightedCode" :class="`language-${lang}`"></div>
        </div>
      </Transition>
  
      <div v-show="isShowCode" class="code-hide" @click.stop="hanldeViewSourceCode">
        <f-icon icon="caret-up"></f-icon>隐藏代码
      </div>
    </div>
  
  </template>
  
  <script setup lang="ts">
  import FIcon from '@/FIcon';
  import { ref, onMounted, watch, onBeforeUnmount,nextTick } from 'vue';
  import { createHighlighterCore } from 'shiki/core';
  import githubLight from 'shiki/themes/github-light.mjs';
  import ClipboardJS from 'clipboard'; // 引入 clipboard.js
  import { useMessage } from '@utils/tsHooks/useMessage'
  
  defineOptions({ name: 'FCodeBlock', inheritAttrs: false, })
  
  // Props
  const props = defineProps({
    title: {
      type: String,
      default: '代码示例',
    },
    code: String,
    lang: {
      type: String,
      default: 'js', // 默认语言 js,可选：js,html,ts,css
    },
    showCode: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: '', // 默认主题  light 可选：light,dark
    },
  });
  
  const $MSG = useMessage();
  // Data
  const highlightedCode = ref('');
  const isShowCode = ref(false);
  const highlighter = ref();
  const copyButton = ref(null); // 绑定按钮
  let clipboardInstance:any = null;
  
  // Function to highlight code
  const highlight = async () => {
    // 初始化高亮器时，先加载主题和语言
    highlighter.value = await createHighlighterCore({
      themes: [githubLight, async () => await import('shiki/themes/github-dark.mjs')],
      langs: [
        import('shiki/langs/js.mjs'),
        async () => await import('shiki/langs/html.mjs'),
        async () => await import('shiki/langs/ts.mjs'),
        async () => await import('shiki/langs/css.mjs'),
      ],
      loadWasm: async () => await import('shiki/wasm'),
    });
  
    changeHighlightedCode();
  };
  
  const changeHighlightedCode = () => {
    // 使用渲染函数生成 HTML
    highlightedCode.value = highlighter.value.codeToHtml(props.code, {
      lang: props.lang,
      // theme: 'github-dark',
      theme: props.theme === 'dark' ? 'github-dark' : 'github-light',
    });
  };
  
  const hanldeViewSourceCode = () => {
    isShowCode.value = !isShowCode.value;
  };
  const beforeEnter = (el: Element) => {
    // 初始状态，设置高度为0
    (el as HTMLElement).style.height = '0';
    (el as HTMLElement).style.opacity = '0';
    (el as HTMLElement).style.overflow = 'hidden'; // 确保内容在过渡期间不会超出容器
  };
  
  const enter = (el: Element, done: () => void) => {
    const height = el.scrollHeight; // 获取内容的实际高度
    (el as HTMLElement).style.transition = 'height 0.6s ease, opacity 0.6s ease';
    (el as HTMLElement).style.height = `${height}px`; // 逐渐增加到实际高度
    (el as HTMLElement).style.opacity = '1';
  
    el.addEventListener('transitionend', done, { once: true });
  };
  
  const afterEnter = (el: Element) => {
    (el as HTMLElement).style.height = 'auto'; // 过渡结束后恢复到自动高度
  };
  
  const beforeLeave = (el: Element) => {
    // 在离开之前，将高度设置为内容的实际高度，避免直接收缩为0
    (el as HTMLElement).style.height = `${el.scrollHeight}px`;
    (el as HTMLElement).style.opacity = '1';
  };
  
  const leave = (el: Element, done: () => void) => {
    // 设置为逐渐减少高度并隐藏
    (el as HTMLElement).style.transition = 'height 0.6s ease, opacity 0.6s ease';
    (el as HTMLElement).style.height = '0';
    (el as HTMLElement).style.opacity = '0';
  
    el.addEventListener('transitionend', done, { once: true });
  };
  
  const afterLeave = (el: Element) => {
    (el as HTMLElement).style.height = ''; // 清除内联高度设置，准备下次显示
  };
  
  // Watch for code changes
  watch(() => props.code, highlight);

  watch(() => props.showCode, (val) => {
    isShowCode.value = val;
  });

  watch(() => props.theme, changeHighlightedCode);
  watch(() => props.lang, changeHighlightedCode);
  
  // Highlight code on mounted
  onMounted(() => {
    highlight();
    nextTick(() => {
      if (props.showCode) {
        setTimeout(() => {
          isShowCode.value = props.showCode;
        }, 1000);
      }
    });
  
    // 将 ClipboardJS 实例绑定到真实按钮上
    clipboardInstance = new ClipboardJS(copyButton.value as unknown as Element, {
      text: () => props.code as string, // 返回需要复制的文本
    });
  
    // 监听复制成功事件
    clipboardInstance.on('success', (e:any) => {
      $MSG.success('复制成功!')
      e.clearSelection(); // 清除选中文本
    });
  
    // 监听复制失败事件
    clipboardInstance.on('error', (e:any) => {
      $MSG.error('复制失败，请手动复制!')
    });
  });
  
  onBeforeUnmount(() => {
    // 在组件卸载时销毁 ClipboardJS 实例
    if (clipboardInstance) {
      clipboardInstance.destroy();
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: height 0.3s ease, opacity 0.3s ease;
  }
  
  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    height: 0;
  }
  .codeBox {
    width: 100%;
    height: 100%;
    // padding: 15px 0;
    box-sizing: border-box;
    border: 1px solid var(--f-code-outside-border-color);
    border-radius: 5px;
    position: relative;

    ::v-deep(.el-tooltip__trigger) {
      display: flex;
    }
    .tooltip {
      display: flex;
    }
    .content {
      overflow: hidden;
      transition: height 0.6s ease, opacity 0.6s ease; /* 确保动画的平滑性 */
      position: relative;
      // background-color: #f6f6f7;
      background-color: #24292e;
      background-color: var(--f-code-bg-color);
  
      ::v-deep(.shiki) {
        background-color: transparent !important;
      }
  
      div[class*='language-'] {
        margin-top: 0;
        margin-bottom: 0;
        border-radius: 0;
      }
  
      .lang {
        position: absolute;
        right: 8px;
        top: 2px;
        color: var(--f-code-lang-color);
        z-index: 2;
      }
    }
  
    .code-hide {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 44px;
      box-sizing: border-box;
      border-top: 1px solid var(--f-code-outside-border-color);
      background-color: var(--f-code-outside-bg-color);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      margin-top: -1px;
      color: var(--f-code-outside-text-color);
      cursor: pointer;
      position: sticky;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    }
    .codeBox-header {
      width: 100%;
      height: 44px;
      padding: 5px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--f-code-outside-border-color);
      background-color: var(--f-code-outside-bg-color);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      box-sizing: border-box;
      color: var(--f-code-outside-text-color);
  
      &-title {
        font-weight: 600;
        letter-spacing: 2px;
      }
  
      &-tools {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 10px;
        cursor: pointer;
  
        .tools-item {
          cursor: pointer;
        }
      }
    }
  }
  /* pre {
    padding: 1em;
    overflow: auto;
    border-radius: 5px;
  } */
  </style>
  