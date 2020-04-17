<template>
    <div id="topbar" class="topbar">
        <div class="container py-2 px-3 d-flex ai-center" :style="topbarStyle">
            <slot></slot>
            <el-dropdown @command="handleCommand" >
                 <div class="pt-2" >
                     <img  v-if="avatar" class="topbar-img mr-2" :src="avatar" alt="">
                     <i v-else class="iconfont icon-logout-user mr-2" style="font-size:2.3rem;"></i>
                 </div>
                <el-dropdown-menu  slot="dropdown" style="  box-shadow: 0px 0px 10px black;
                background: rgba(0, 0, 0, 0.8);
                border-color: rgb(8, 8, 8);">
                  <el-dropdown-item command="personalMessage" style=" color: rgba(255, 255, 255, 0.911);">个人信息</el-dropdown-item>
                  <el-dropdown-item command="exit" style=" color: rgba(255, 255, 255, 0.911);">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>  
            <span v-if="controlNumber===1" class="iconfont icon-36 text-white" style="font-size: 1.6923rem" :style="navStyle" @click="show=!show"></span>
            <!-- <span v-else class="iconfont icon-36 text-white" style="font-size: 1.6923rem" @click="hideMenu"></span> -->
        </div>
        <div v-if="show" id="insideMenu" class="insideMenu" :style='insideMenuStyle'>
            <div class='navMenu p-1 d-flex'>
                <i class="iconfont icon-index-copy p-1" style="font-size: 0.875rem" ></i>
                <router-link to='/' tag="div" style="margin-top: 0.35rem">首页</router-link>
            </div>
            <div class='navMenu p-1 d-flex'>
                <i class="iconfont icon-xinde" style="font-size: 0.875rem"></i>
                <router-link to='/myArticle/index' tag="div">心得</router-link>
            </div>
            <div class='navMenu py-1 d-flex'>
                    <div class="iconfont icon-lol px-1" style="font-size: 0.9rem"></div>
                <router-link to='/lol/index' tag="div">LOL</router-link>
            </div>
            <div class='navMenu p-1 d-flex'>
                <div class="iconfont icon-VIP px-1" style="font-size: 0.875rem"></div>
                <router-link to='/vip/login' tag="div">VIP</router-link>
            </div>
            <div class='navMenu p-1 d-flex'>
                <i class="iconfont icon-dongwu px-1" style="font-size: 0.875rem"></i>
                <router-link to='/animalForest/index' tag="div">动物之森</router-link>
            </div>
            <div class='navMenu p-1 d-flex'>
                    <i class="iconfont icon-dongwu px-1" style="font-size: 0.875rem"></i>
                    <router-link to='/animalForest/index' tag="div">组件</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            insideMenuStyle:{type:String},
            navStyle:{type:String},
            topbarStyle:{type:String},
        },
        data() {
            return {
                avatar:'',
                controlNumber: 1,
                show: false
            }
        },
        methods: {
            handleOpen: function (key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose: function (key, keyPath) {
                console.log(key, keyPath);
            },
            addInsideMenu: function () {
                let topbar = this.$el;
                let newMenu = document.getElementById('insideMenu')
                if (topbar) {
                    newMenu.style = "height:120px;top:topbar.offsetHeight;"
                }
            },
            //下拉菜单
            handleCommand(command) {
              
              if(command==='personalMessage'){
                  this.$router.push('/person/message')
              }
              if(command==='exit'){
                localStorage.clear()
              this.$message({
                        message: command,
                        type: 'success'
               });
            }
          },
        },
        created() {
           this.fetchAvatar()
        },
        mounted() {
        },

    }
</script>
<style>
    .topbar {
        /*吸顶效果*/
        position: sticky;
        top: 0;
        z-index: 999;
    }

    .topbar .navMenu {
        height: 20%;
    }

    .topbar .container {
        height: 3.8462rem;
        box-shadow: 0px 0px 10px black;
        background: rgba(0, 0, 0, 0.8);
        border-color: rgb(8, 8, 8);
    }
    .dropdown{
       
        box-shadow: 0px 0px 10px black;
        background: rgba(0, 0, 0, 0.8);
        border-color: rgb(8, 8, 8);
    }
    .topbar .insideMenu {
        color: white;
        box-shadow: 0px 0px 10px black;
        background: rgba(0, 0, 0, 0.7);
        border-color: rgb(8, 8, 8);
    }
    .topbar .topbar-img{
        border-radius: 50%;
        height: 2.3rem;
        width: 2.3rem;
    }
</style>