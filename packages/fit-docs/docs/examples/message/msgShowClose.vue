<template>
    <div class="show-components">
        <f-button @click="showMessage">可以手动关闭的消息</f-button>
    </div>
</template>

<script setup lang="ts">
import { useMessage } from '@geniusmanyxh/fit-ui'
const MSG = useMessage()
const showMessage = () => {
    MSG.message({msg: '我是一个有关闭图标的消息提示',duration:5000,showClose:true})
}
</script>

<style scoped>

</style>