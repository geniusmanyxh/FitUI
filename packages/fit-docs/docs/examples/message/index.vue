<template>
    <div class="show-components">
        <f-button @click="showMessage">普通使用</f-button>
    </div>
</template>

<script setup lang="ts">
import { useMessage } from '@geniusmanyxh/fit-ui'
const MSG = useMessage()
const showMessage = () => {
    MSG.message({msg: '我是一个消息提示'})
}
</script>

<style scoped>

</style>