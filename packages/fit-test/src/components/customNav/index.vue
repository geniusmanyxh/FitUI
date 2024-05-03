<template>
  <nav class="custom-nav">
    <div class="custom-nav-item">
      <f-button icon="chevron-left" size="medium" type="primary" @click="router.back()">
        <span>返回</span></f-button>
    </div>
    <div class="custom-nav-item">{{ title }}</div>
    <div class="custom-nav-item"></div>
  </nav>
</template>

<script setup lang="ts">
defineOptions({ name: 'custom-nav', inheritAttrs: false })
defineProps<{
  title?: String,
}>()

const router = useRouter()

</script>

<style scoped lang="scss">
.custom-nav {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  position: relative;
  padding: 0px 20px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);

  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, rgb(140, 140, 200) 25%, rgb(57, 57, 170) 50%, rgb(201, 138, 138) 100%);
    // filter: blur(1px);
    z-index: -1;
  }

  &-item {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>