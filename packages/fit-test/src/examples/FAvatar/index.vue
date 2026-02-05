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
          <FAvatar size="40" icon="user"></FAvatar>
          <FAvatar size="50" icon="user"></FAvatar>
          <FAvatar size="60" icon="user"></FAvatar>
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
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" size="40" />
          <FAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square" size="50" />
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
          <FAvatar size="40" shape="circle" src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square"></FAvatar>
          <FAvatar size="32" shape="square" icon="user"></FAvatar>
          <FAvatar size="24" shape="circle">A</FAvatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FAvatar-Demo", inheritAttrs: false })

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
