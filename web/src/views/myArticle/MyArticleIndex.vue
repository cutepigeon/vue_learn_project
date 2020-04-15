<template>
    <div class="myArticle-IndexPage">
        <topbar-menu>
            <div class="flex-1">
                <router-link to="/" tag="div">
                    <img src="../../assets/myArticle/title.jpg" alt="" style="height: 3.5rem;">
                </router-link>
            </div>
        </topbar-menu>
        <router-view/>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            fetch() {

            }
        },
    }
</script>
<style>
    .myArticle-IndexPage {
        background-image: url(../../assets/myArticle/banner.jpg);
        background-size: cover
    }
</style>