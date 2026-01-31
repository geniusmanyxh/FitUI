<template>
  <div>
    <div style="margin-top: 100px;margin-left: 100px;">
      <div class="row">
        <FTag label="555" type="success"></FTag>
        <FTag label="555" type="warning"></FTag>
        <FTag label="555" type="info"></FTag>
        <FTag label="555" type="primary"></FTag>
        <FTag label="555" type="default"></FTag>
        <FTag label="555" type="danger"></FTag>
      </div>
      <div class="row">
        <FTag label="555" mode="light" type="success"></FTag>
        <FTag label="555" mode="light" type="warning"></FTag>
        <FTag label="555" mode="light" type="info"></FTag>
        <FTag label="555" mode="light" type="primary"></FTag>
        <FTag label="555" mode="light" type="default"></FTag>
        <FTag label="555" mode="light" type="danger"></FTag>
      </div>
      <div class="row">
        <FTag label="555" mode="plain" type="success"></FTag>
        <FTag label="555" mode="plain" type="warning"></FTag>
        <FTag label="555" mode="plain" type="info"></FTag>
        <FTag label="555" mode="plain" type="primary"></FTag>
        <FTag label="555" mode="plain" type="default"></FTag>
        <FTag label="555" mode="plain" type="danger"></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="success" size="mini"></FTag>
        <FTag label="555" type="success" size="small"></FTag>
        <FTag label="555" type="success" size="medium"></FTag>
        <FTag label="555" type="success" size="large"></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="success" size="mini" closable></FTag>
        <FTag label="555" type="success" size="small" closable></FTag>
        <FTag label="555" type="success" size="medium" closable></FTag>
        <FTag label="555" type="success" size="large" closable></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="success" closable></FTag>
        <FTag label="555" type="warning" closable></FTag>
        <FTag label="555" type="info" closable></FTag>
        <FTag label="555" type="primary" closable></FTag>
        <FTag label="555" type="default" closable></FTag>
        <FTag label="555" type="danger" closable></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="success" mode="light" closable></FTag>
        <FTag label="555" type="warning" mode="light" closable></FTag>
        <FTag label="555" type="info" mode="light" closable></FTag>
        <FTag label="555" type="primary" mode="light" closable></FTag>
        <FTag label="555" type="default" mode="light" closable></FTag>
        <FTag label="555" type="danger" mode="light" closable></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="success" mode="plain" closable></FTag>
        <FTag label="555" type="warning" mode="plain" closable></FTag>
        <FTag label="555" type="info" mode="plain" closable></FTag>
        <FTag label="555" type="primary" mode="plain" closable></FTag>
        <FTag label="555" type="default" mode="plain" closable></FTag>
        <FTag label="555" type="danger" mode="plain" closable></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="success" disabled closable></FTag>
        <FTag label="555" type="warning" disabled closable></FTag>
        <FTag label="555" type="info" disabled closable></FTag>
        <FTag label="555" type="primary" disabled closable></FTag>
        <FTag label="555" type="default" disabled closable></FTag>
        <FTag label="555" type="danger" disabled closable></FTag>
      </div>
      <div class="row">
        <FTag label="555" type="success" mode="light" disabled closable></FTag>
        <FTag label="555" type="warning" mode="light" disabled closable></FTag>
        <FTag label="555" type="info" mode="light" disabled closable></FTag>
        <FTag label="555" type="primary" mode="light" disabled closable></FTag>
        <FTag label="555" type="default" mode="light" disabled closable></FTag>
        <FTag label="555" type="danger" mode="light" disabled closable></FTag>
      </div>

      <div class="row">
        <FTag label="555" type="success" mode="plain" disabled closable></FTag>
        <FTag label="555" type="warning" mode="plain" disabled closable></FTag>
        <FTag label="555" type="info" mode="plain" disabled closable></FTag>
        <FTag label="555" type="primary" mode="plain" disabled closable></FTag>
        <FTag label="555" type="default" mode="plain" disabled closable></FTag>
        <FTag label="555" type="danger" mode="plain" disabled closable></FTag>
      </div>
      <div class="row">
        <FTag label="标签" type="success" size="mini" round></FTag>
        <FTag label="标签" type="warning" size="small" round></FTag>
        <FTag label="标签" type="info" size="medium" round></FTag>
        <FTag label="标签" type="primary" size="large" round></FTag>
        <!-- <FTag label="555" type="default" round></FTag> -->
      </div>
    </div>
    <!-- <FButton type="success" icon="typescript"  size="large">Primary</FButton>
    <f-button size="small">small</f-button>
  <f-button size="medium">medium</f-button>
  <f-button size="large">large</f-button>
    <FIcon icon="typescript" :size="50"></FIcon>
    <div id="f-message-box1" @click="test1">111</div>
    <div id="f-message-box1" @click="test2">111</div>
    <div><FMessage duration="notime" :show-close="true" v-if="flag"></FMessage>
    </div>
    <div><FMessage type="success" :show-close="true" :duration="2000"></FMessage></div>
    
    <div style="margin-top: 100px;margin-left: 100px;">
      <FToolTip  position="right-end" content="left15151515left15151515left15151515left15151515left15151515left15151515left15151515left15151515left15151515left15151515left15151515left15151515left15151515" 
      :offset="2" :maxWidth="200"  trigger="click" mode="dark" >
      <FButton>top</FButton>
    </FToolTip>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import {useMessage} from '../utils/tsHooks/useMessage';
// import { FMessage,FCodeBlock,FToolTip,FButton,FTag } from './full'
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

<style scoped lang="scss">
.row{
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
