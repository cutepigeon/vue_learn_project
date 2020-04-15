<template>
    <div class="index-body m-2">
        <div class="container">
           <div class="index-list">
             <router-link :to="`/articleCatalog/${category._id}`" tag="div" class="index-list-piece my-4 pb-2" v-for="(category,index) in model" :key="index" >
               <div class="list-piece-content pt-3 text-center" >
                 <span class="piece-content-myArticle-title text-white fs-lg p-1" >
                   {{category.name}}
                </span>        
              </div>
              <div class="list-piece-myArticle-content py-2 px-2 text-center ">
                 <span>
                     {{category.description}}
                 </span>
              </div>
             </router-link>
           </div>
        </div>
    </div>
</template>
<script>
  export default{
      data() {
          return {
              model:[]
          }
      },
      methods: {
          async fetchCategories(){
             const res=await this.$http.get('articleCategories') 
             this.model=res.data
             console.log(this.model)
          }
      },
      created() {
          this.fetchCategories()
      },
  }
</script>