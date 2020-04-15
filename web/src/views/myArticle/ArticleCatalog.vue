<template>
    <div class="index-body m-1">
        <div class="container">
            <div class="catalog-title text-center">
                <span class="text-white ff-primary">
                    <h1>{{title.name}}</h1>
                </span>
            </div>
            <div class="index-list">
                <!-- 跳转至文章主页面 -->
                <router-link :to="`/myArticleMain/${catalog._id}`" tag="div" class="index-list-piece my-4 pb-2" v-for="(catalog,index) in model.slice(pagesize*(currentPage-1),pagesize*currentPage)"
                    :key="index">
                    <div class="list-piece-content pt-3 text-center">
                        <span class="piece-content-myArticle-title text-white fs-lg p-1">
                            {{catalog.title}}
                        </span>
                    </div>
                    <div class="list-piece-myArticle-content py-2 px-2 text-center ">
                        <span >
                            <p class="catalog-ellipsis">{{toText(catalog.body)}}</p>
                        </span>
                    </div>
                </router-link>
            </div>
            <div class="text-center">
                <el-pagination small background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="model.length">
                </el-pagination>
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
                title: {},
                model: [],
                currentPage: 1,
                pagesize: 10
            }
        },
        methods: {
            toText(HTML) {
                var input = HTML;
                return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');
            },
            //点击条数进行改变
            handleSizeChange(size) {
                this.pagesize = size
            },
            //点击页数进行改变
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
            },
            async fetchTitle() {
                const res = await this.$http.get(`catalog-title/${this.id}`)
                this.title = res.data
            },
            async fetchArticle() {
                const res = await this.$http.get(`catalog/${this.id}`)
                this.model = res.data
            },
        },
        created() {
            this.fetchTitle()
            this.fetchArticle()
        },
    }
</script>