<template>
    <div>
        <div :class="testFlag ? darkTheme : lightTheme">
        <span :class="buttonStyles">button</span>
    </div>

        <button @click="testFlag = !testFlag">切换主题</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { lightTheme, darkTheme } from '@/themes/index.css';
import {buttonStyles} from './style/index.css';
defineOptions({ name: 'FButton', inheritAttrs: false })

const testFlag = ref(false)
</script>