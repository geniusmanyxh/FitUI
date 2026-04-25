<template>
  <div>
    <custom-nav title="FWatermark"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础文字水印 -->
      <div class="section">
        <h3>基础文字水印</h3>
        <FWatermark content="内部资料 请勿外传">
          <div class="watermark-content">
            <p>这是一段带有水印的内容区域</p>
            <p>可以包含各种文本、图片和其他元素</p>
            <p>水印会覆盖在整个区域上</p>
          </div>
        </FWatermark>
      </div>

      <!-- 场景二：自定义水印样式 -->
      <div class="section">
        <h3>自定义水印样式</h3>
        <FWatermark
          content="FitUI"
          :rotate="-30"
          :opacity="0.2"
          :font-size="18"
          :gap="[80, 80]"
        >
          <div class="watermark-content">
            <p>自定义水印参数：旋转角度、透明度、字体大小、间距</p>
            <p>这些参数可以让水印更清晰或更模糊</p>
          </div>
        </FWatermark>
      </div>

      <!-- 场景三：图片水印 -->
      <div class="section">
        <h3>图片水印</h3>
        <FWatermark
          image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzkwOTM5OSIgb3BhY2l0eT0iMC4zIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Rml0VUkgTG9nbzwvdGV4dD48L3N2Zz4="
          :gap="[120, 120]"
        >
          <div class="watermark-content">
            <p>使用自定义图片作为水印</p>
            <p>图片水印会重复铺满整个区域</p>
          </div>
        </FWatermark>
      </div>

      <!-- 场景四：不同密度水印 -->
      <div class="section">
        <h3>不同密度水印</h3>
        <FSpace direction="vertical" :size="16">
          <FWatermark content="高密度" :gap="[60, 60]" :font-size="12">
            <div class="watermark-content">
              <p>高密度水印 - 间距 60px</p>
            </div>
          </FWatermark>
          <FWatermark content="低密度" :gap="[200, 200]" :font-size="20">
            <div class="watermark-content">
              <p>低密度水印 - 间距 200px</p>
            </div>
          </FWatermark>
        </FSpace>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FWatermark, FSpace } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FWatermark-Demo', inheritAttrs: false })
</script>

<style scoped lang="scss">
.watermark-content {
  padding: 20px;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  min-height: 120px;

  p {
    margin: 8px 0;
    font-size: 14px;
    color: #303133;
  }
}
</style>
