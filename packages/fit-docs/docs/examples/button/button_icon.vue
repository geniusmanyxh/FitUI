<template>
  <div>
    <div class="show-components">
      <f-button icon="google">Default</f-button>
      <f-button type="primary" icon="google">Primary</f-button>
      <f-button type="success" icon="google">Success</f-button>
      <f-button type="info" icon="google">Info</f-button>
      <f-button type="warning" icon="google">Wrning</f-button>
      <f-button type="danger" icon="google">Danger</f-button>
    </div>

    <div class="show-components">
      <f-button plain icon="google">Default</f-button>
      <f-button type="primary" plain icon="google">Primary</f-button>
      <f-button type="success" plain icon="google">Success</f-button>
      <f-button type="info" plain icon="google">Info</f-button>
      <f-button type="warning" plain icon="google">Wrning</f-button>
      <f-button type="danger" plain icon="google">Danger</f-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FButton } from '@geniusmanyxh/fit-ui'
</script>
