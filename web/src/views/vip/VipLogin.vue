<template>
    <div class="vip-login-page">
        <topbar-menu>
            <div class="flex-1">
                <router-link to="/" tag="div">
                    <img src="../../assets/VIP/title.png" alt="" style="height: 3.5rem;">
                </router-link>
            </div>
        </topbar-menu>
        <router-view/>
    </div>
</template>
<script>
</script>
<style >
    
.vip-login-page{
    background-image: url(../../assets/indexImage/index-snow.png);
    background-size: cover
}
</style>