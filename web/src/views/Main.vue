<template>
    <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
       <a href="/"><img src="../assets/logo-public.png" height="30"></a>
       <div class="px-1 pt-1 flex-1"><!--flex:1能让div填满-->
         <div class="text-white">LOL</div>
         <div class="text-grey-1 fs-xxs">传奇永不灭</div>
       </div>
       <button type="button" class="bg-primary-1 btn " >敬请期待</button>
    </div>
   <div class="bg-grey py-2">
    <div class="nav nav-inverse jc-around">
      <div class="nav-item active">
         <router-link class="nav-link" to='/' tag="div" >首页</router-link>
      </div>
      <div class="nav-item">
         <router-link class="nav-link" to='/' tag="div" >攻略</router-link>
      </div>
      <div class="nav-item">
         <router-link class="nav-link" to='/' tag="div" >赛事</router-link>
      </div>
    </div>
    </div>
     <router-view/>
     <div class="mt-2 text-center">
       <p>互联网ICP备案:
      <a style="text-decoration: none" href='http://www.beian.miit.gov.cn/' >闽ICP备20003983号</a>
      </p>
    </div>
    </div>
    
  </template>
  
<script>
     export default{

    }
</script>
<style>
  .topbar{
    /*吸顶效果*/
    position: sticky;
    top:0;
    z-index: 999;
  }
</style>
  