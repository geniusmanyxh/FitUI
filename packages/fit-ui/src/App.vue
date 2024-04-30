<template>
  <div>App
    <!-- <FButton type="success" icon="typescript"  size="large">Primary</FButton>
    <f-button size="small">small</f-button>
  <f-button size="medium">medium</f-button>
  <f-button size="large">large</f-button>
    <FIcon icon="typescript" :size="50"></FIcon> -->
    <div id="f-message-box" @click="changeMsg">111</div>
    <FMessage duration="notime" :show-close="true" v-if="flag"></FMessage>
    <FMessage type="success" :show-close="true" :duration="2000"></FMessage>
  </div>
</template>

<script setup lang="ts">
import { FMessage } from './entry'
import { ref } from 'vue';
const flag = ref(true);

const changeMsg = () => {
  flag.value = !flag.value
  console.log(flag.value);
}
// setTimeout(()=>{
//   flag.value = false
// },3000)
</script>

<style scoped></style>
