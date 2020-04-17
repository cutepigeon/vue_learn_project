<template>
    <div class="animal-forest-index">
        <topbar-menu topbarStyle="background:none" navStyle='color:rgb(122, 236, 122)' 
        insideMenuStyle='   box-shadow: 0px 0px 10px rgb(7, 109, 21,0.5);
        background: rgba(94, 233, 106, 0.4);
        border-color: rgb(56, 189, 96);'>
               <div class="flex-1" > 
                  <router-link to="/" tag="div">
                  
                  </router-link>
             </div>
        </topbar-menu>
        <router-view/>
    </div>
</template>
<style>
  .animal-forest-index{
    width: 100%;
        height:100vh;
    background-image: url(../../assets/animalForest/background.png);
    background-size:100% 100%;
  }

</style>