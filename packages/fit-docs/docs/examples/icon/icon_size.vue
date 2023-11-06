<template>
  <div class="show-components">
    <f-icon icon="google" size="small"></f-icon>
    <f-icon icon="google" size="medium"></f-icon>
    <f-icon icon="google" size="large"></f-icon>
  </div>

  <div class="show-components">
    <f-icon icon="google" :size="20"></f-icon>
    <f-icon icon="google" :size="30"></f-icon>
    <f-icon icon="google" :size="40"></f-icon>
  </div>

  <div class="show-components fontsize">
    <f-icon icon="google" class="fontsize_25"></f-icon>
    <f-icon icon="google" class="fontsize_35"></f-icon>
    <f-icon icon="google" class="fontsize_45"></f-icon>
  </div>
</template>

<script setup lang="ts">
import { FIcon } from '@geniusmanyxh/fit-ui'
</script>

<style scoped lang="scss">
.fontsize {
  &_25 {
    font-size: 25px;
  }

  &_35 {
    font-size: 35px;
  }

  &_45 {
    font-size: 45px;
  }
}
</style>