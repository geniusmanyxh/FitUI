<template>
  <div>
    <custom-nav title="FBreadcrumb"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础面包屑 -->
      <div class="section">
        <h3>基础面包屑</h3>
        <div class="row">
          <FBreadcrumb>
            <FBreadcrumbItem>首页</FBreadcrumbItem>
            <FBreadcrumbItem>分类</FBreadcrumbItem>
            <FBreadcrumbItem>产品</FBreadcrumbItem>
          </FBreadcrumb>
        </div>
      </div>

      <!-- 场景二：自定义分隔符 -->
      <div class="section">
        <h3>自定义分隔符</h3>
        <div class="row">
          <FBreadcrumb separator="/">
            <FBreadcrumbItem>首页</FBreadcrumbItem>
            <FBreadcrumbItem>分类</FBreadcrumbItem>
            <FBreadcrumbItem>产品</FBreadcrumbItem>
          </FBreadcrumb>
          <FBreadcrumb separator="|">
            <FBreadcrumbItem>首页</FBreadcrumbItem>
            <FBreadcrumbItem>分类</FBreadcrumbItem>
            <FBreadcrumbItem>产品</FBreadcrumbItem>
          </FBreadcrumb>
        </div>
      </div>

      <!-- 场景三：带图标 -->
      <div class="section">
        <h3>带图标</h3>
        <div class="row">
          <FBreadcrumb>
            <FBreadcrumbItem>
              <FIcon name="home" />
              <span>首页</span>
            </FBreadcrumbItem>
            <FBreadcrumbItem>
              <FIcon name="category" />
              <span>分类</span>
            </FBreadcrumbItem>
            <FBreadcrumbItem>
              <FIcon name="product" />
              <span>产品</span>
            </FBreadcrumbItem>
          </FBreadcrumb>
        </div>
      </div>

      <!-- 场景四：路由跳转 -->
      <div class="section">
        <h3>路由跳转</h3>
        <div class="row">
          <FBreadcrumb>
            <FBreadcrumbItem href="/">首页</FBreadcrumbItem>
            <FBreadcrumbItem href="/category">分类</FBreadcrumbItem>
            <FBreadcrumbItem href="/product">产品</FBreadcrumbItem>
          </FBreadcrumb>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FBreadcrumb-Demo", inheritAttrs: false })

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
