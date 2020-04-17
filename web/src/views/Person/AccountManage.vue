
<template>
    <div>
        <router-view/>
    </div>
</template>
<script>
   

</script>
<!-- <template>
    <div >
        <div class="bg-white account-management-topbar d-flex">
            <i class="iconfont icon-fanhui mt-3 ml-2"></i>
           <div class="text-center flex-1" >
               <span>
                  <h3>账号管理</h3>
               </span>
            </div>
        </div>
        <div class="account-management-main mt-2">
            <div class="p-2 text-grey">
                账号信息
            </div>
            <router-link tag="div" to='' class="account-management-main-item p-3">
               
            </div>
        </div>
            <div class="upload">
                    <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    >
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
            </div>
    </div>
</template>
<style scope="this api replaced by slot-scope in 2.5.0+">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
        export default {
          data() {
            return {
              model:{}
            };
          },
          methods: {
                  //上传图片
    afterUpload(res){
       this.$set(this.model,'icon',res.url) 
      //  this.model.icon=res.url   一致，但这么赋值有时候会赋值不上     
    },
            handleAvatarSuccess(res, file) {
              this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
              const isJPG = file.type === 'image/jpeg';
              const isLt2M = file.size / 1024 / 1024 < 2;
      
              if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
              }
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isJPG && isLt2M;
            }
          }
        }
</script> -->