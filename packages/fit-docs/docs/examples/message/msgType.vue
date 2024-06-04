<template>
    <div class="show-components">
        <f-button type="primary" @click="showMessage('default')">default消息</f-button>
        <f-button type="info" @click="showMessage('info')">info消息</f-button>
        <f-button type="success" @click="showMessage('success')">success消息</f-button>
        <f-button type="warn" @click="showMessage('warning')">warning消息</f-button>
        <f-button type="danger" @click="showMessage('error')">error消息</f-button>
    </div>
</template>

<script setup lang="ts">
import { useMessage } from '@geniusmanyxh/fit-ui'
const MSG = useMessage()
const showMessage = (type: string) => {
    if (type === 'default') {
        MSG.message({ msg: '我是一个默认消息提示' })
    } else {
        MSG[type](`我是一个${type}消息提示`)
    }
}

</script>

<style scoped></style>