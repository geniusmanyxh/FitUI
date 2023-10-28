<template>
  <div>App
    <FButton type="success" icon="typescript"  size="large">Primary</FButton>
    <f-button size="small">small</f-button>
  <f-button size="medium">medium</f-button>
  <f-button size="large">large</f-button>
    <FIcon icon="typescript" :size="50"></FIcon>
  </div>
</template>

<script setup lang="ts">
import {FButton,FIcon} from './entry'

</script>

<style scoped></style>
