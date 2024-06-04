<template>
    <div class="show-components">
        <f-button  @click="showMessage()">默认时长2s</f-button>
        <f-button  @click="showMessage(3000)">设置时长3s</f-button>
        <f-button  @click="showMessage(0)">设置0s则不消失</f-button>
        <f-button  @click="showMessage('notime')">设置'notime'也不消失</f-button>
    </div>
</template>

<script setup lang="ts">
import { useMessage } from '@geniusmanyxh/fit-ui'
const MSG = useMessage()
const showMessage = (duration?: 'notime' | number) => {
    let tips = ''
    if (duration === 'notime') {
        tips = '设置\'notime\'也不消失'
    } else if (duration === 0) {
        tips = '设置0s则不消失'
    } else if(duration === undefined) {
        tips = '默认时长2s'
    } else {
        tips = `设置${duration/1000}s`
    }
    MSG.message({ msg: `我是一个${tips}的消息提示`,duration })
}

</script>

<style scoped></style>