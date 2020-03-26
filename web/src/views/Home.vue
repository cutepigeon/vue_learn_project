<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(banner,index) in banners" :key="index">
        <img :src="banner" alt="" class="w-100">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- <swiper :options="swiperOption">
        <swiper-slide>
          <img class="w-100" src="../assets/53efa127918d462ccbf26881fc922fdb.820x340.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/7c103c2adc778e2681a2057d57c6b8ff.820x340.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/a1fe00fe2224e00785d2f347930b6949.jpeg" alt="">
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
      </swiper> -->
    <!--end of swiper-->

    <div class="nav-icons text-center bg-white mt-3  p-3 ">
      <div class=" d-flex flex-wrap">
        <div class="nav-item mb-2 text-dark-1" v-for="(item,index) in nav_icons_items" :key=index>
          <i class="sprite" :class="item.nav_class"></i>
          <div class="py-1">{{item.name}}</div>
        </div>
      </div>
    </div>
    <m-list-card icon="menu" title="新闻资讯" :categories="newsData">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${news._id}`" class="newsitem pt-1 pl-1 d-flex" v-for="(news,index) in category.newsList"
          :key="index">
          <span class="item-type ">{{news.CategoryName}}</span>
          <span class="ml-1 flex-1 text-ellipsis pr-2"> {{news.title}}</span>
          <span class="text-grey-1">{{news.createdAt| date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="yingxiong" title="英雄列表" :categories="heroData">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center" style="width: 20%;" v-for="(hero,index) in category.heroList"
            :key="index">
            <img :src="hero.avatar" alt="" class="w-100">
            <div class="text-grey-1 ">{{hero.name}}</div>
          </router-link>>
        </div>
      </template>
    </m-list-card>
    <m-list-card icon="menu" title="视频" :categories="newsData">

    </m-list-card>


  </div>

</template>

<script>
  import dayjs from 'dayjs'
  export default {
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return {
        //精灵图片
        nav_icons_items: [
          { nav_class: 'sprite-order', name: '秩序殿堂' },
          { nav_class: 'sprite-gameMessage', name: '游戏资料' },
          { nav_class: 'sprite-lolTop-1', name: '峡谷之巅' },
          { nav_class: 'sprite-lolTop-2', name: '云顶之弈' },
          { nav_class: 'sprite-strategy', name: '攻略中心' },
          { nav_class: 'sprite-universe', name: 'LoL宇宙' },
          { nav_class: 'sprite-weixin', name: '微信绑定' },
        ],
        //轮播图数据
        banners: [require("../assets/53efa127918d462ccbf26881fc922fdb.820x340.jpg"),
        require('../assets/7c103c2adc778e2681a2057d57c6b8ff.820x340.jpg'),
        require('../assets/a1fe00fe2224e00785d2f347930b6949.jpg')],
        swiperOption: {
          pagination: {
            el: '.pagination-home'
          },
          // some swiper options...
        },
        //新闻
        newsData: [],
        heroData: []
      }
    },
    methods: {
      async fetchNewsData() {
        const res = await this.$http.get('news/list')
        this.newsData = res.data
      },
      async fetchHeroData() {
        const res = await this.$http.get('heroes/list')
        this.heroData = res.data
      }
    },
    created() {
      this.fetchNewsData()
      this.fetchHeroData()
    },
  }
</script>