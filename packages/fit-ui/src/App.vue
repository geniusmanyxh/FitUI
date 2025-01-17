<template>
  <div>App
    <!-- <FButton type="success" icon="typescript"  size="large">Primary</FButton>
    <f-button size="small">small</f-button>
  <f-button size="medium">medium</f-button>
  <f-button size="large">large</f-button>
    <FIcon icon="typescript" :size="50"></FIcon> -->
    <div id="f-message-box1" @click="test1">111</div>
    <div id="f-message-box1" @click="test2">111</div>
    <div><FMessage duration="notime" :show-close="true" v-if="flag"></FMessage>
    </div>
    <div><FMessage type="success" :show-close="true" :duration="2000"></FMessage></div>
    <div>
      <FCodeBlock
        title="代码示例"
        code="import { ref } from 'vue';"
        lang="js"
        theme="github-dark"
        showCode
      ></FCodeBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMessage} from '../utils/tsHooks/useMessage';
import { FMessage,FCodeBlock } from './entry'
import { ref } from 'vue';
const flag = ref(true);
const $Msg= useMessage();
const test1 = () => {
  $Msg.message({ type: 'success', msg: 'success', duration: 'notime',showClose: true,onShow:(res)=>{
    console.log('show',res);
  },onClose:(res)=>{
    console.log('close',res);}
})
}
const test2 = () => {
  $Msg.message({type:'warn',  msg: 'info', duration: 2000,showClose: true, })
}

const changeMsg = () => {
  flag.value = !flag.value
  console.log(flag.value);
}
// setTimeout(()=>{
//   flag.value = false
// },3000)
</script>

<style scoped></style>
