<template>
        <div >
            <m-topbar title="账号管理" iconfont="icon-fanhui" to="/person/message"></m-topbar>
            <div class="account-management-main mt-3">
                <div class="p-2 text-grey border-bottom">
                    账号信息
                </div>
                <router-link tag="div" to='/Nickname' class="account-management-main-item p-3 d-flex border-bottom">
                   <span>昵称</span>
                   <div  v-if="nickname!=''" class="flex-1 ml-2">{{nickname}}</div>
                   <div v-else class="flex-1 ml-2 text-grey">修改昵称</div>
                   <span class="fs-xl">&gt;</span>
                </router-link>
                <router-link tag="div" to='' class="account-management-main-item p-3 d-flex border-bottom">
                        <span>个性签名</span>
                        <div  v-if="model.autograph" class="flex-1 ml-2"></div>
                        <div v-else class="flex-1 ml-2 text-grey">编辑个性签名</div>
                        <span class="fs-xl">&gt;</span>
                     </router-link>
                     <div  class="account-management-main-item p-3 d-flex border-bottom">
                            <span>注册时间</span>
                                               <div  v-if="model.autograph" class="flex-1 ml-2"></div>
                        <div v-else class="flex-1 ml-2 text-grey">xx</div>
                        <span class="fs-xl">&gt;</span>
                     </div>
            </div>
            <div class="account-management-main mt-3">
                    <div class="p-2 text-grey border-bottom">
                        个人信息
                    </div>
            </div>
        </div>
    </template>
 
    <script>
            export default {
              data() {
                return {
                  model:{},
                  nickname:''
                };
              },
              methods: {
        //               //上传图片
        // afterUpload(res){
        //    this.$set(this.model,'icon',res.url) 
        //   //  this.model.icon=res.url   一致，但这么赋值有时候会赋值不上     
        // },
        //         handleAvatarSuccess(res, file) {
        //           this.imageUrl = URL.createObjectURL(file.raw);
        //         },
        //         beforeAvatarUpload(file) {
        //           const isJPG = file.type === 'image/jpeg';
        //           const isLt2M = file.size / 1024 / 1024 < 2;
          
        //           if (!isJPG) {
        //             this.$message.error('上传头像图片只能是 JPG 格式!');
        //           }
        //           if (!isLt2M) {
        //             this.$message.error('上传头像图片大小不能超过 2MB!');
        //           }
        //           return isJPG && isLt2M;
        //         }
        //       }
            },
            created() {
                this.fetchNickname()
            },
        }
    </script>