<template>
        <div class="bg-white account-management-topbar d-flex">
               <router-link :to="`${to}`" class="mt-3 ml-2" tag="div"> <i class="iconfont" :class="iconfont"></i></router-link>
               <div class="text-center flex-1" >
                   <span>
                      <h3>{{title}}</h3>
                   </span>
                </div>
            </div>
</template>

<script>
   export default{
       props:{
          title:{type:String},
          iconfont:{type:String},
          to:{type:String}
       },
       data() {
           return {
               
           }
       },
   }
</script>