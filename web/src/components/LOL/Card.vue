<template>
    <div class="card bg-white p-3 mt-3">
        <div class="card-header d-flex ai-center pb-3">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="fs-xl flex-1 px-2">{{title}}</div>
            <i class="iconfont icon-shenglve"></i>
        </div>
        <div class="card-body mt-3">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: { type: String, required: true },//required表示必填
            icon: { type: String, required: true }
        },
        data() {
            return {
            }
        },
    }
</script>