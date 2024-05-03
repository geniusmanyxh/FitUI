<template>
  <div>
    <div class="show-components">
      <f-button round>Default</f-button>
      <f-button type="primary" round>Primary</f-button>
      <f-button type="success" round>Success</f-button>
      <f-button type="info" round>Info</f-button>
      <f-button type="warning" round>Wrning</f-button>
      <f-button type="danger" round>Danger</f-button>
    </div>

    <div class="show-components">
      <f-button round plain>Default</f-button>
      <f-button type="primary" round plain>Primary</f-button>
      <f-button type="success" round plain>Success</f-button>
      <f-button type="info" round plain>Info</f-button>
      <f-button type="warning" round plain>Wrning</f-button>
      <f-button type="danger" round plain>Danger</f-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FButton } from '@geniusmanyxh/fit-ui'
</script>