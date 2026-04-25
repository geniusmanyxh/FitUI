<template>
  <div>
    <custom-nav title="FBacktop"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础回到顶部 -->
      <div class="section">
        <h3>基础回到顶部</h3>
        <p class="tip">向下滚动页面后，右下角会出现回到顶部按钮</p>
        <div class="scroll-container" ref="containerRef">
          <div v-for="i in 50" :key="i" class="scroll-item">
            内容项 {{ i }}
          </div>
          <FBacktop :target="targetSelector" :visibility-height="200" />
        </div>
      </div>

      <!-- 场景二：自定义位置 -->
      <div class="section">
        <h3>自定义位置</h3>
        <p class="tip">自定义 right 和 bottom 位置</p>
        <div class="scroll-container" ref="customContainerRef">
          <div v-for="i in 50" :key="i" class="scroll-item">
            自定义位置内容项 {{ i }}
          </div>
          <FBacktop
            :target="customTargetSelector"
            :right="20"
            :bottom="80"
            :visibility-height="100"
          />
        </div>
      </div>

      <!-- 场景三：自定义内容 -->
      <div class="section">
        <h3>自定义内容</h3>
        <p class="tip">通过默认插槽自定义回到顶部按钮的内容</p>
        <div class="scroll-container" ref="contentContainerRef">
          <div v-for="i in 50" :key="i" class="scroll-item">
            自定义内容项 {{ i }}
          </div>
          <FBacktop
            :target="contentTargetSelector"
            :visibility-height="150"
            label="返回顶部"
          >
            <div class="custom-backtop">Top</div>
          </FBacktop>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { FBacktop } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FBacktop-Demo', inheritAttrs: false })

const containerRef = ref<HTMLElement>()
const customContainerRef = ref<HTMLElement>()
const contentContainerRef = ref<HTMLElement>()

const targetSelector = ref('')
const customTargetSelector = ref('')
const contentTargetSelector = ref('')

onMounted(() => {
  targetSelector.value = `.${containerRef.value?.className}`
  customTargetSelector.value = `.${customContainerRef.value?.className}`
  contentTargetSelector.value = `.${contentContainerRef.value?.className}`
})
</script>

<style scoped lang="scss">
.tip {
  font-size: 13px;
  color: #909399;
  margin-bottom: 12px;
}

.scroll-container {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 8px;
  position: relative;
}

.scroll-item {
  padding: 8px 12px;
  font-size: 13px;
  color: #606266;
  border-bottom: 1px solid #f5f7fa;
}

.custom-backtop {
  width: 36px;
  height: 36px;
  background-color: #409eff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
}
</style>
