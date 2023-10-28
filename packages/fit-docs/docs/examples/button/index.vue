<template>
  <div>
    <div class="show-components">
      <f-button>Default</f-button>
      <f-button type="primary">Primary</f-button>
      <f-button type="success">Success</f-button>
      <f-button type="info">Info</f-button>
      <f-button type="warning">Wrning</f-button>
      <f-button type="danger">Danger</f-button>
    </div>

    <div class="show-components">
      <f-button plain>Plain</f-button>
      <f-button type="primary" plain>Primary</f-button>
      <f-button type="success" plain>Success</f-button>
      <f-button type="info" plain>Info</f-button>
      <f-button type="warning" plain>Wrning</f-button>
      <f-button type="danger" plain>Danger</f-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FButton } from '@geniusmanyxh/fit-ui'
</script>
