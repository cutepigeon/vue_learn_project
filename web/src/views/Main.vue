<template>
  <div class="entire-page">
    <!-- 导航菜单 -->
    <topbar-menu>
      <div class="flex-1" > 
        <router-link to="/" tag="div">
          <img src="../assets/indexImage/index-logo1.png" alt="" style="height: 2.5rem;">
        </router-link>
      </div>
    </topbar-menu>
    <!-- 导航菜单结束 -->
    <!-- 主体 -->
    <div class="index-body m-2">
        <div class="container">
           <div class="index-list">
             <div  class="index-list-piece my-4 pb-2" v-for="(item,index) in model" :key="index" >
               <div class="list-piece-content pt-3 text-center" >
                 <span class="piece-content-index-title text-white fs-lg p-1" >
                   {{item.title}}
               </span>        
              </div>
              <div class="list-piece-image py-2 px-2 text-center ">
                <router-link :to="item.enterPage" tag="div" style="position: relative;" > 
                 <img :src="item.banners" alt=""  
                 @mouseover="handleOver(index)" @mouseout="handleOut(index)">
                 <transition  name="image-content" >
                   <span v-if="show[index]" class="fs-xl" :key="index" style="overflow: hidden;">{{item.article}}</span>
                 </transition>
                </router-link>
              </div>
             </div>
           </div>
        </div>
    </div>
    <div class=" text-center">
      <p>互联网ICP备案:
        <a style="text-decoration: none" href='http://www.beian.miit.gov.cn/'>闽ICP备20003983号</a>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        model:[],
        show:[]
      }
    },
    methods: {
      //show默认
      showStatic:function(){
        for(let i=0;i<this.model.length;i++){
          this.show.push(false)
        }
      },
      //移入移出事件
      handleOver:function(index){
        this.$set(this.show,index,!this.show[index]) 
      },
      handleOut:function(index){
        this.$set(this.show,index,!this.show[index]) 
      },
      //请求数据
      fetch:async function(){
       const res=await this.$http.get('main')
        this.model=res.data
        console.log(this.model)
      },
    },
    created() {
      this.fetch()
    },
    mounted() {
      this.showStatic()
    },
  }
</script>
<style>
  .image-content-enter-active{
    transition: all  1s ease
  }
  .image-content-enter{
    transform-style:preserve-3d;
    transform: rotateY(-90deg) rotateX(-90deg)
  }
  .image-content-leave-active{
    transition: all 1s ease
  }
  .image-content-leave-to{
    transform: rotateY(90deg) rotateX(90deg)
  }
  .entire-page{
    padding: 0;
    margin: 0;
    background-image: url(../assets/indexImage/index-snow.png);
    background-size: cover
  }
</style>