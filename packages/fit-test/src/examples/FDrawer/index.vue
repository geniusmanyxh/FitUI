<template>
  <div>
    <custom-nav title="FDrawer"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础抽屉 -->
      <div class="section">
        <h3>基础抽屉</h3>
        <div class="row">
          <FButton type="primary" @click="showDrawer">打开抽屉</FButton>
          <FDrawer v-model:visible="drawerVisible" title="抽屉标题">
            <div>抽屉内容</div>
          </FDrawer>
        </div>
      </div>

      <!-- 场景二：位置 -->
      <div class="section">
        <h3>位置</h3>
        <div class="row">
          <FButton type="primary" @click="showLeftDrawer">左侧</FButton>
          <FButton type="primary" @click="showRightDrawer">右侧</FButton>
          <FButton type="primary" @click="showTopDrawer">顶部</FButton>
          <FButton type="primary" @click="showBottomDrawer">底部</FButton>
          
          <FDrawer v-model:visible="leftDrawerVisible" title="左侧抽屉" placement="left"></FDrawer>
          <FDrawer v-model:visible="rightDrawerVisible" title="右侧抽屉" placement="right"></FDrawer>
          <FDrawer v-model:visible="topDrawerVisible" title="顶部抽屉" placement="top"></FDrawer>
          <FDrawer v-model:visible="bottomDrawerVisible" title="底部抽屉" placement="bottom"></FDrawer>
        </div>
      </div>

      <!-- 场景三：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FButton type="primary" @click="showSmallDrawer">小型</FButton>
          <FButton type="primary" @click="showMediumDrawer">中型</FButton>
          <FButton type="primary" @click="showLargeDrawer">大型</FButton>
          
          <FDrawer v-model:visible="smallDrawerVisible" title="小型抽屉" size="small"></FDrawer>
          <FDrawer v-model:visible="mediumDrawerVisible" title="中型抽屉" size="medium"></FDrawer>
          <FDrawer v-model:visible="largeDrawerVisible" title="大型抽屉" size="large"></FDrawer>
        </div>
      </div>

      <!-- 场景四：自定义头部、底部 -->
      <div class="section">
        <h3>自定义头部、底部</h3>
        <div class="row">
          <FButton type="primary" @click="showCustomDrawer">自定义抽屉</FButton>
          <FDrawer v-model:visible="customDrawerVisible">
            <template #header>
              <div class="drawer-header">
                <span>自定义标题</span>
                <FButton type="text" @click="customDrawerVisible = false">关闭</FButton>
              </div>
            </template>
            <div>抽屉内容</div>
            <template #footer>
              <div class="drawer-footer">
                <FButton type="default" @click="customDrawerVisible = false">取消</FButton>
                <FButton type="primary" @click="customDrawerVisible = false">确定</FButton>
              </div>
            </template>
          </FDrawer>
        </div>
      </div>

      <!-- 场景五：遮罩关闭 -->
      <div class="section">
        <h3>遮罩关闭</h3>
        <div class="row">
          <FButton type="primary" @click="showMaskDrawer">点击遮罩关闭</FButton>
          <FButton type="primary" @click="showNoMaskDrawer">点击遮罩不关闭</FButton>
          
          <FDrawer v-model:visible="maskDrawerVisible" title="可遮罩关闭" @close="handleClose"></FDrawer>
          <FDrawer v-model:visible="noMaskDrawerVisible" title="不可遮罩关闭" :mask-closable="false"></FDrawer>
        </div>
      </div>

      <!-- 场景六：关闭前确认 (beforeClose) -->
      <div class="section">
        <h3>关闭前确认 (beforeClose)</h3>
        <div class="row">
          <FButton type="primary" @click="showBeforeCloseDrawer">打开带确认的抽屉</FButton>
          <FDrawer v-model:visible="beforeCloseDrawerVisible" title="关闭前确认" :before-close="handleBeforeClose">
            <div>关闭此抽屉前会弹出确认提示</div>
          </FDrawer>
        </div>
      </div>

      <!-- 场景七：关闭销毁 (destroyOnClose) -->
      <div class="section">
        <h3>关闭销毁 (destroyOnClose)</h3>
        <div class="row">
          <FButton type="primary" @click="showDestroyOnCloseDrawer">打开关闭销毁抽屉</FButton>
          <FDrawer v-model:visible="destroyOnCloseDrawerVisible" title="关闭销毁" destroy-on-close>
            <div>
              <p>关闭此抽屉后，内容会被销毁</p>
              <FInput v-model="destroyInput" placeholder="输入内容后关闭，再次打开会清空" style="margin-top: 10px;" />
            </div>
          </FDrawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FDrawer-Demo", inheritAttrs: false })

import { ref } from 'vue'
import { FMessage } from '@geniusmanyxh/fit-ui'

const drawerVisible = ref(false)
const leftDrawerVisible = ref(false)
const rightDrawerVisible = ref(false)
const topDrawerVisible = ref(false)
const bottomDrawerVisible = ref(false)
const smallDrawerVisible = ref(false)
const mediumDrawerVisible = ref(false)
const largeDrawerVisible = ref(false)
const customDrawerVisible = ref(false)
const maskDrawerVisible = ref(false)
const noMaskDrawerVisible = ref(false)
const beforeCloseDrawerVisible = ref(false)
const destroyOnCloseDrawerVisible = ref(false)

const destroyInput = ref('')

const showDrawer = () => {
  drawerVisible.value = true
}

const showLeftDrawer = () => {
  leftDrawerVisible.value = true
}

const showRightDrawer = () => {
  rightDrawerVisible.value = true
}

const showTopDrawer = () => {
  topDrawerVisible.value = true
}

const showBottomDrawer = () => {
  bottomDrawerVisible.value = true
}

const showSmallDrawer = () => {
  smallDrawerVisible.value = true
}

const showMediumDrawer = () => {
  mediumDrawerVisible.value = true
}

const showLargeDrawer = () => {
  largeDrawerVisible.value = true
}

const showCustomDrawer = () => {
  customDrawerVisible.value = true
}

const showMaskDrawer = () => {
  maskDrawerVisible.value = true
}

const showNoMaskDrawer = () => {
  noMaskDrawerVisible.value = true
}

const handleClose = () => {
  maskDrawerVisible.value = false
}

const handleBeforeClose = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    // 模拟异步确认
    setTimeout(() => {
      const confirmed = confirm('确定要关闭抽屉吗？')
      resolve(confirmed)
      if (confirmed) {
        FMessage.success('抽屉已关闭')
      } else {
        FMessage.info('已取消关闭')
      }
    }, 100)
  })
}

const showBeforeCloseDrawer = () => {
  beforeCloseDrawerVisible.value = true
}

const showDestroyOnCloseDrawer = () => {
  destroyOnCloseDrawerVisible.value = true
}
</script>

<style scoped lang="scss">
.demoBox {
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .drawer-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
}
</style>
