<template>
  <div class="page-article" v-if="articleData">
    <div class="d-flex py-2 px-2 border-bottom">
      <div class="icon-fanhui iconfont"></div>
      <strong class="flex-1 fs-lg text-primary">{{articleData.title}}</strong>
      <div class="text-grey  fs-xs">2020-2-22</div>
    </div>
    <div v-html="articleData.body" class="px-3 article-body"></div>
    <div class="border-top py-3">
      <div class="px-2 d-flex">
        <div class="iconfont icon-lianjie1 px-1"></div>
        <strong class="text-primary">相关资讯</strong>
      </div>
      <div class="px-2 fs-sm">
        <router-link class="py-1" tag="div" :to="`/articles/${item._id}`" v-for="item in articleData.related" :key="item._id">{{item.title}}
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
        articleData: [],
      }
    },
    watch: {
      //id改变触发
      id: 'fetchArticles',

    },
    methods: {
      async fetchArticles() {
        const res = await this.$http.get(`articles/${this.id}`)
        this.articleData = res.data
      }

    },
    created() {
      this.fetchArticles()
    },
  }
</script>