<template>
        <m-card :icon="icon" :title="title">
                <div class="nav jc-between">
                   <div class="nav-item" :class="{active:active===index}"
                   v-for="(category,index) in categories" :key="index"
                   @click="$refs.list.swiper.slideTo(index)">
                     {{category.name}}
                   </div>
                </div>
                 <div class="pt-3">
                     <!--ref类似于html中的id，是vue用于寻找组件 -->
                     <swiper ref="list" @slide-change="()=>active=$refs.list.swiper.realIndex" :options="{autoHeight:true}">
                       <swiper-slide v-for="(category,index) in categories" :key="index">
                         <slot name="items" :category="category"></slot><!--子组件向父组件传值-->
                       </swiper-slide>
                     </swiper>
                 </div>
         </m-card>  
</template>
<script>
    export default{  
        props:{
            title:{type:String,required:true},//required表示必填
            icon:{type:String,required:true},
            categories:{type:Array}
        },
        data() {
            return {
                active:0
            }
        },
    }
</script>