<template>
  <div>
    <custom-nav title="FImage"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础图片 -->
      <div class="section">
        <h3>基础图片</h3>
        <FSpace :size="20" wrap>
          <FImage
            src="https://images.unsplash.com/photo-1700366857236-0e59310108a6?w=300"
            alt="示例图片"
            width="200"
            height="150"
          />
          <FImage
            src="https://images.unsplash.com/photo-1700366857236-0e59310108a6?w=300"
            alt="示例图片"
            width="200"
            height="150"
            fit="cover"
          />
          <FImage
            src="https://images.unsplash.com/photo-1700366857236-0e59310108a6?w=300"
            alt="示例图片"
            width="200"
            height="150"
            fit="contain"
          />
        </FSpace>
      </div>

      <!-- 场景二：不同填充模式 -->
      <div class="section">
        <h3>不同填充模式</h3>
        <FSpace :size="16" wrap>
          <div class="image-demo">
            <p class="image-label">fill</p>
            <FImage
              src="https://images.unsplash.com/photo-1700366857236-0e59310108a6?w=300"
              width="150"
              height="100"
              fit="fill"
            />
          </div>
          <div class="image-demo">
            <p class="image-label">contain</p>
            <FImage
              src="https://images.unsplash.com/photo-1700366857236-0e59310108a6?w=300"
              width="150"
              height="100"
              fit="contain"
            />
          </div>
          <div class="image-demo">
            <p class="image-label">cover</p>
            <FImage
              src="https://images.unsplash.com/photo-1700366857236-0e59310108a6?w=300"
              width="150"
              height="100"
              fit="cover"
            />
          </div>
          <div class="image-demo">
            <p class="image-label">scale-down</p>
            <FImage
              src="https://images.unsplash.com/photo-1700366857236-0e59310108a6?w=300"
              width="150"
              height="100"
              fit="scale-down"
            />
          </div>
        </FSpace>
      </div>

      <!-- 场景三：加载失败 -->
      <div class="section">
        <h3>加载失败</h3>
        <FImage
          src="https://example.com/invalid-image.jpg"
          alt="加载失败的图片"
          width="200"
          height="150"
          @error="handleImageError"
        />
      </div>

      <!-- 场景四：懒加载 -->
      <div class="section">
        <h3>懒加载</h3>
        <FImage
          src="https://images.unsplash.com/photo-1700366857236-0e59310108a6?w=300"
          alt="懒加载图片"
          width="300"
          height="200"
          lazy
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FImage, FSpace } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FImage-Demo', inheritAttrs: false })

const handleImageError = (event: Event) => {
  console.log('图片加载失败', event)
}
</script>

<style scoped lang="scss">
.image-demo {
  text-align: center;
}

.image-label {
  margin: 0 0 8px;
  font-size: 12px;
  color: #909399;
}
</style>
