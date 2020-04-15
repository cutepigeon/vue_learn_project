<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <a href="/">
                <!-- <img src="../assets/LOL/logo-public.png" height="30"> -->
            </a>
            <div class="px-1 pt-1 flex-1">
                <!--flex:1能让div填满-->
                <div class="text-white">LOL</div>
                <div class="text-grey-1 fs-xxs">传奇永不灭</div>
            </div>
            <router-link to="/" tag="div" class="d-flex">
                <span class="text-white fs-sm">更多英雄</span>
                <div class="iconfont icon-fanhui2 text-white"></div>
            </router-link>
        </div>
        <!--背景图没设置高度无法显示 -->
        <div class="top " :style="{'background-image':`url(${model.banner})`}">
            <div class="info p-3 d-flex flex-column jc-end h-100 text-white">
                <div class="text-light-1 fs-xs">{{model.title}}</div>
                <h2 class="text-light-1 my-2">{{model.name}}</h2>
                <div class="text-light-1 fs-xs">{{model.categories.map(v=>v.name).join('/')}}</div>
                <div class="d-flex jc-between pt-1">
                    <div class="scores d-lfex ai-center fs-sm" v-if="model.scores">
                        <span class="text-light-1">难度</span>
                        <span class="badge bg-primary-1">{{model.scores.difficult}}</span>
                        <span class="text-light-1">技能</span>
                        <span class="badge bg-primary">{{model.scores.skills}}</span>
                        <span class="text-light-1">攻击</span>
                        <span class="badge bg-danger">{{model.scores.attack}}</span>
                        <span class="text-light-1">生存</span>
                        <span class="badge bg-dark-1">{{model.scores.survive}}</span>
                    </div>
                    <router-link to="/" tag="div" class="text-grey fs-sm">皮肤 &gt;</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: { required: true }
        },
        data() {
            return {
                model: null
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`heroes/${this.id}`)
                this.model = res.data
            }
        },
        created() {
            this.fetch()
        },
    }
</script>