<template>
  <div>
    <custom-nav title="FDescriptions"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础描述列表 -->
      <div class="section">
        <h3>基础描述列表</h3>
        <FDescriptions title="用户信息" :column="2">
          <template #name-label>用户名</template>
          <template #name-content>张三</template>
          <template #age-label>年龄</template>
          <template #age-content>28</template>
          <template #phone-label>手机号</template>
          <template #phone-content>13800138000</template>
          <template #email-label>邮箱</template>
          <template #email-content>zhangsan@example.com</template>
        </FDescriptions>
      </div>

      <!-- 场景二：边框模式 -->
      <div class="section">
        <h3>边框模式</h3>
        <FDescriptions title="订单信息" bordered :column="3">
          <template #order-label>订单号</template>
          <template #order-content>2026042600001</template>
          <template #status-label>订单状态</template>
          <template #status-content>
            <FButton type="success" size="small" text>已完成</FButton>
          </template>
          <template #amount-label>订单金额</template>
          <template #amount-content>¥ 1,299.00</template>
          <template #product-label>商品名称</template>
          <template #product-content>FitUI Pro 版授权</template>
          <template #time-label>下单时间</template>
          <template #time-content>2026-04-26 15:30</template>
          <template #address-label>收货地址</template>
          <template #address-content>北京市朝阳区xx街道xx号</template>
        </FDescriptions>
      </div>

      <!-- 场景三：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <FSpace direction="vertical" :size="16">
          <FDescriptions size="small" :column="2">
            <template #label-label>Small 尺寸</template>
            <template #label-content>小尺寸描述列表</template>
          </FDescriptions>
          <FDescriptions size="default" :column="2">
            <template #label-label>Default 尺寸</template>
            <template #label-content>默认尺寸描述列表</template>
          </FDescriptions>
          <FDescriptions size="large" :column="2">
            <template #label-label>Large 尺寸</template>
            <template #label-content>大尺寸描述列表</template>
          </FDescriptions>
        </FSpace>
      </div>

      <!-- 场景四：垂直方向 -->
      <div class="section">
        <h3>垂直方向</h3>
        <FDescriptions direction="vertical" :column="3">
          <template #product-label>商品</template>
          <template #product-content>FitUI Pro 版</template>
          <template #price-label>价格</template>
          <template #price-content>¥ 1,299.00</template>
          <template #count-label>数量</template>
          <template #count-content>1</template>
        </FDescriptions>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FDescriptions, FSpace, FButton } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FDescriptions-Demo', inheritAttrs: false })
</script>

<style scoped lang="scss">
</style>
