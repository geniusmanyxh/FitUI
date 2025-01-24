<template>
    <div>
        <FCodeBlock 
        title="示例代码" 
        :code="`console.log('Hello, World!');`" 
        lang="js" 
        :showCode="true" 
        theme="dark" />
    </div>
</template>

<script setup lang="ts">
import { FCodeBlock} from '@geniusmanyxh/fit-ui'
</script>
