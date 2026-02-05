<template>
  <div>
    <custom-nav title="FModal"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础对话框 -->
      <div class="section">
        <h3>基础对话框</h3>
        <div class="row">
          <FButton type="primary" @click="showBasicModal">打开基础对话框</FButton>
          <FModal v-model:visible="basicVisible" title="基础对话框">
            <div>这是一个基础的对话框内容</div>
          </FModal>
        </div>
      </div>

      <!-- 场景二：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FButton type="primary" @click="showSmallModal">小型对话框</FButton>
          <FButton type="primary" @click="showMediumModal">中型对话框</FButton>
          <FButton type="primary" @click="showLargeModal">大型对话框</FButton>
          
          <FModal v-model:visible="smallVisible" title="小型对话框" size="small">
            <div>这是一个小型对话框</div>
          </FModal>
          <FModal v-model:visible="mediumVisible" title="中型对话框" size="medium">
            <div>这是一个中型对话框</div>
          </FModal>
          <FModal v-model:visible="largeVisible" title="大型对话框" size="large">
            <div>这是一个大型对话框</div>
          </FModal>
        </div>
      </div>

      <!-- 场景三：确认/取消操作 -->
      <div class="section">
        <h3>确认/取消操作</h3>
        <div class="row">
          <FButton type="primary" @click="showConfirmModal">打开确认对话框</FButton>
          <FModal v-model:visible="confirmVisible" title="确认操作">
            <div>确定要执行此操作吗？</div>
            <template #footer>
              <FButton type="default" @click="confirmVisible = false">取消</FButton>
              <FButton type="primary" @click="handleConfirm">确定</FButton>
            </template>
          </FModal>
        </div>
      </div>

      <!-- 场景四：自定义内容 -->
      <div class="section">
        <h3>自定义内容</h3>
        <div class="row">
          <FButton type="primary" @click="showCustomModal">打开自定义对话框</FButton>
          <FModal v-model:visible="customVisible" title="自定义对话框">
            <div>
              <p>这是一个包含自定义内容的对话框</p>
              <FInput v-model="modalInput" placeholder="请输入内容" style="margin: 10px 0;" />
              <FCheckbox v-model="modalCheck">同意条款</FCheckbox>
            </div>
            <template #footer>
              <FButton type="default" @click="customVisible = false">取消</FButton>
              <FButton type="primary" @click="customVisible = false">确定</FButton>
            </template>
          </FModal>
        </div>
      </div>

      <!-- 场景五：全屏模式 -->
      <div class="section">
        <h3>全屏模式</h3>
        <div class="row">
          <FButton type="primary" @click="showFullscreenModal">打开全屏对话框</FButton>
          <FModal v-model:visible="fullscreenVisible" title="全屏对话框" fullscreen>
            <div>这是一个全屏对话框</div>
          </FModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FModal-Demo", inheritAttrs: false })

import { ref } from 'vue'

const basicVisible = ref(false)
const smallVisible = ref(false)
const mediumVisible = ref(false)
const largeVisible = ref(false)
const confirmVisible = ref(false)
const customVisible = ref(false)
const fullscreenVisible = ref(false)

const modalInput = ref('')
const modalCheck = ref(false)

const showBasicModal = () => {
  basicVisible.value = true
}

const showSmallModal = () => {
  smallVisible.value = true
}

const showMediumModal = () => {
  mediumVisible.value = true
}

const showLargeModal = () => {
  largeVisible.value = true
}

const showConfirmModal = () => {
  confirmVisible.value = true
}

const showCustomModal = () => {
  customVisible.value = true
}

const showFullscreenModal = () => {
  fullscreenVisible.value = true
}

const handleConfirm = () => {
  console.log('确认操作')
  confirmVisible.value = false
}
</script>

<style scoped lang="scss">
.demoBox {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  .section {
    width: 100%;
    
    h3 {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    align-items: center;
  }
}
</style>
