<template>
  <div>
    <div class="show-components">
      <f-button size="small">Default</f-button>
      <f-button size="medium">Default</f-button>
      <f-button size="large">Default</f-button>
    </div>
    <div class="show-components">
      <f-button size="small" plain>Plain</f-button>
      <f-button size="medium" plain>Plain</f-button>
      <f-button size="large" plain>Plain</f-button>
    </div>
    <div class="show-components">
      <f-button size="small" type="primary">Plain</f-button>
      <f-button size="medium" type="primary">Plain</f-button>
      <f-button size="large" type="primary">Plain</f-button>
    </div>

    <div class="show-components">
      <f-button size="small" icon="apple" />
      <f-button size="medium" icon="apple" />
      <f-button size="large" icon="apple" />
    </div>
    <div class="show-components">
      <f-button size="small" icon="apple" type="danger" plain />
      <f-button size="medium" icon="apple" type="danger" plain />
      <f-button size="large" icon="apple" type="danger" plain />
    </div>

    <div class="show-components">
      <f-button size="small" icon="apple" type="success" plain round>Round</f-button>
      <f-button size="medium" icon="apple" type="success" plain round>Round</f-button>
      <f-button size="large" icon="apple" type="success" plain round>Round</f-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FButton } from '@geniusmanyxh/fit-ui'
</script>