<template>
  <div>
    <custom-nav title="FAvatar"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FAvatar size="small" icon="user"></FAvatar>
          <FAvatar size="medium" icon="user"></FAvatar>
          <FAvatar size="large" icon="user"></FAvatar>
          <FAvatar :size="40" icon="user"></FAvatar>
          <FAvatar :size="50" icon="user"></FAvatar>
          <FAvatar :size="60" icon="user"></FAvatar>
        </div>
      </div>

      <!-- 场景二：不同形状 -->
      <div class="section">
        <h3>不同形状</h3>
        <div class="row">
          <FAvatar shape="circle" icon="user"></FAvatar>
          <FAvatar shape="square" icon="user"></FAvatar>
        </div>
      </div>

      <!-- 场景三：图片模式 -->
      <div class="section">
        <h3>图片模式</h3>
        <div class="row">
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" />
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" :size="40" />
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" :size="50" />
        </div>
      </div>

      <!-- 场景四：图标模式 -->
      <div class="section">
        <h3>图标模式</h3>
        <div class="row">
          <FAvatar icon="user"></FAvatar>
          <FAvatar icon="setting"></FAvatar>
          <FAvatar icon="star"></FAvatar>
          <FAvatar icon="mail"></FAvatar>
          <FAvatar icon="search"></FAvatar>
        </div>
      </div>

      <!-- 场景五：文字模式 -->
      <div class="section">
        <h3>文字模式</h3>
        <div class="row">
          <FAvatar>U</FAvatar>
          <FAvatar>用户</FAvatar>
          <FAvatar>Admin</FAvatar>
          <FAvatar>测试</FAvatar>
          <FAvatar text="Text" />
        </div>
      </div>

      <!-- 场景六：fit 属性 -->
      <div class="section">
        <h3>fit 属性</h3>
        <div class="row">
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" fit="fill"></FAvatar>
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" fit="contain"></FAvatar>
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" fit="cover"></FAvatar>
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" fit="none"></FAvatar>
        </div>
      </div>

      <!-- 场景七：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="row">
          <FAvatar :size="40" shape="circle" src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square"></FAvatar>
          <FAvatar :size="32" shape="square" icon="user"></FAvatar>
          <FAvatar :size="24" shape="circle">A</FAvatar>
        </div>
      </div>

      <!-- 场景八：事件示例 -->
      <div class="section">
        <h3>事件示例</h3>
        <div class="row">
          <FAvatar icon="user" @click="handleClick"></FAvatar>
          <FAvatar src="invalid-url" @error="handleError"></FAvatar>
        </div>
        <div class="row" v-if="eventLog.length > 0">
          <div class="event-log">
            <p v-for="(log, index) in eventLog" :key="index">{{ log }}</p>
          </div>
        </div>
      </div>

      <!-- 文字间距 -->
      <div class="section">
        <h3>文字间距 (gap)</h3>
        <div class="row">
          <FAvatar :gap="4">User</FAvatar>
          <FAvatar :gap="10">User</FAvatar>
          <FAvatar :gap="20">User</FAvatar>
          <FAvatar :gap="4">用户</FAvatar>
          <FAvatar :gap="10">用户</FAvatar>
          <FAvatar :gap="20">用户</FAvatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: "FAvatar-Demo", inheritAttrs: false })

const eventLog = ref<string[]>([])

function handleClick(event: MouseEvent) {
  eventLog.value.push(`点击事件触发: ${new Date().toLocaleTimeString()}`)
}

function handleError(event: Event) {
  eventLog.value.push(`图片加载错误: ${new Date().toLocaleTimeString()}`)
}

</script>

<style scoped lang="scss">
.demoBox {
  .event-log {
    width: 100%;
    padding: 10px;
    background-color: var(--f-bg-tertiary, #f5f5f5);
    border-radius: 4px;
    
    p {
      margin: 5px 0;
      font-size: 14px;
      color: var(--f-text-secondary, #666);
    }
  }
}
</style>
