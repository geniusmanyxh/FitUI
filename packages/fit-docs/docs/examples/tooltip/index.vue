<template>
    <div class="tooltip-demo">
        <div class="row">
            <f-tool-tip content="提示位置:top" position="top">
                <f-button>top</f-button>
            </f-tool-tip>
            <f-tool-tip content="提示位置:top-start" position="top-start">
                <f-button>top-start</f-button>
            </f-tool-tip>
            <f-tool-tip content="提示位置:top-end" position="top-end">
                <f-button>top-end</f-button>
            </f-tool-tip>
        </div>
        <div class="row">
            <div>
                <f-tool-tip content="提示位置:left" position="left">
                <f-button>left</f-button>
            </f-tool-tip>
            <f-tool-tip content="提示位置:left-start" position="left-start">
                <f-button>left-start</f-button>
            </f-tool-tip>
            <f-tool-tip content="提示位置:left-end" position="left-end">
                <f-button>left-end</f-button>
            </f-tool-tip>
            </div>
            <div><f-tool-tip content="提示位置:right" position="right">
                <f-button>right</f-button>
            </f-tool-tip>
            <f-tool-tip content="提示位置:right-start" position="right-start">
                <f-button>right-start</f-button>
            </f-tool-tip>
            <f-tool-tip content="提示位置:right-end" position="right-end">
                <f-button>right-end</f-button>
            </f-tool-tip></div>
        </div>
        <div class="row"><f-tool-tip content="提示位置:bottom" position="bottom">
                <f-button>bottom</f-button>
            </f-tool-tip>
            <f-tool-tip content="提示位置:bottom-start" position="bottom-start">
                <f-button>bottom-start</f-button>
            </f-tool-tip>
            <f-tool-tip content="提示位置:bottom-end" position="bottom-end">
                <f-button>bottom-end</f-button>
            </f-tool-tip></div>

    </div>
</template>
<script setup lang="ts">
import { FButton, FToolTip } from '@geniusmanyxh/fit-ui';
</script>
<style scoped lang="scss">
.tooltip-demo {
    min-width: 300px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 20px;

        &:nth-of-type(2) {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            &>div {
                width: 50%;
                min-height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 20px;
            }
        }
    }
}
</style>