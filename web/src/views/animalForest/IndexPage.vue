<template>
        <div class="text-center">
                <div class="animal-forest-index-body d-flex flex-wrap jc-center">
                  <div class="animal-forest-index-body-item" :style=item.style
                  ref="afIndexBodyItem" v-for="(item,index) in itemBgStyle" :key="index">
                  <span class="text-white"><strong> {{item.name}}</strong></span>
                    <div>
                    <router-link to='/'><img :src="item.src" alt=""></router-link>
                    </div>
                  </div>

                </div>
             </div>
</template>
<style>
</style>
<script>
   export default{
     data() {
       return {
         itemBgStyle:[{
           name:'护照',
           style:'background:rgba(136, 197, 137, 1)',
           src:require('../../assets/animalForest/护照.jpg')
           },
         {name:'我的设计',
           style:'background:rgba(248, 166, 178,1)',
         src:require('../../assets/animalForest/design.jpg')},
         { name:'最佳好友',
           style:'background:rgba(248, 141, 97,1)',
           src:require('../../assets/animalForest/bestFriend.jpg')},
         {name:'鱼类图鉴',
           style:'background:rgba(105, 199, 243,1)'}]
       }
     },

   }
</script>
<style>
  
</style>