<template>
    <div ref="myarticlemainpage">
        <div class="d-flex">
            <router-link class="iconfont icon---- mt-2 ml-1" :to="`/articleCatalog/${model.categories._id}`" tag="div" style="color: pink"></router-link>
            <div class="my-article-title text-center flex-1">
                <h2>{{model.title}} </h2>
            </div>
        </div>
        <div class="my-article-function">
            <div class="px-2 d-flex">
                <div class="flex-1">
                    <span class="label">
                        <strong>字体大小: </strong>
                    </span>
                    <button class="my-article-btn fs-sm" @click="fsChange('big')">大</button>
                    <button class="my-article-btn fs-sm ml-1" @click="fsChange('middle')">中</button>
                    <button class="my-article-btn fs-sm ml-1" @click="fsChange('small')">小</button>
                    <button class="my-article-btn fs-sm ml-2" ref="bgChangeBtn" style="background-color: rgb(60, 226, 101)" @click="backgroundChange(bgControl)">护眼</button>
                </div>
                <i class="iconfont icon-shoucang pr-1" style="font-size: 1.2rem;color:pink"></i>
                <span class="label">
                    <strong>分类:</strong>
                </span>
                <router-link class="" :to="`/articleCatalog/${model.categories._id}`" tag="div" style="color: pink">{{model.categories.name}}</router-link>
            </div>
        </div>
        <div v-html="model.body" class="p-2 my-article-main" :class="fsControl"></div>
        <div class="another-my-article px-2 py-2">
            <div class="my-article-link py-2 px-2 ">
                <i class="iconfont icon-lianjie1 text-pink"> </i>
                <span class="label">相关文章:</span>
                <router-link class="py-2 text-pink" tag="div" :to="`/myArticleMain/${item._id}`" v-for="item in model.related" :key="item._id">
                    {{item.title}}
                </router-link>
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
                model: {
                    related: [],
                    categories: {}
                },
                fsControl: '',
                bgControl:1
            }
        },
        watch: {
            id: 'fetch'
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`myArticleMain/${this.id}`)
                this.model = res.data
                console.log(this.model)
            },
            //改变字体大小
            fsChange(size) {
                switch (size) {
                    case 'big':
                        this.fsControl = 'fs-xl';
                        break;
                    case 'middle':
                        this.fsControl = 'fs-md';
                        break;
                    case 'small':
                        this.fsControl = 'fs-sm';
                        break;
                }
            },
            //改变背景
            backgroundChange(contact){
                const page= this.$refs.myarticlemainpage
             if( contact===1){
                this.$refs.bgChangeBtn.style="background-color:none"
                 page.style="background-color:rgb(104, 241, 104,0.7)"
                 this.bgControl=0 
             }else{
                this.$refs.bgChangeBtn.style="background-color:rgb(60, 226, 101)"
                page.style="background-color:none"
                 this.bgControl=1
             }
            }
        },
        created() {
            this.fetch()
        },
    }
</script>
<style>
</style>