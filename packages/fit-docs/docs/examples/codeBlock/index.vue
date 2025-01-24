<template>
    <div class="vitepress-codeblock">
        <FCodeBlock 
        title="示例代码" 
        :code="`console.log('Hello, World!');`" 
        lang="js" 
        :showCode="true" 
        theme="light" />
    </div>
</template>

<script setup lang="ts">
import { FCodeBlock} from '@geniusmanyxh/fit-ui'
</script>

<style scoped lang="scss">
.vitepress-codeblock {
    ::v-deep(.codeBox){
        .content{
            .shiki{
                background-color: #f6f6f7 !important;
            }
        }
        
    }
}
</style>
