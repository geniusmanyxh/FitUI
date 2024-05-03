<template>
  <div class="show-components icon">
    <f-icon icon="github"></f-icon>
    <f-icon icon="apple" class="icon_red"></f-icon>
    <f-icon icon="typescript" class="icon_blue"></f-icon>

  </div>
</template>

<script setup lang="ts">
import { FIcon } from "@geniusmanyxh/fit-ui";
</script>

<style scoped lang="scss">
.icon {
  &_red {
    color: red;
  }

  &_blue {
    color: rgb(19, 19, 217);
  }
}
</style>