<template>
  <div class="f-button-group" role="group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'FButtonGroup' })
</script>

<style scoped lang="scss">
@use './style/button' as *;
</style>
