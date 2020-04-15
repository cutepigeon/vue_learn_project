<template>
    <div class="vip-login-main p-3">
        <el-form @submit.native.prevent="login">
            <!--表单 -->
            <span class="text-center text-white"> <h1>登录</h1></span>
            <el-form-item label="用户名:">
                <el-input v-model='model.username'></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input type="password" v-model='model.password'></el-input>
            </el-form-item>
            <el-form-item class="d-flex" label="验证码" >
                <el-input type="password" v-model='localCaptcha' style="width: 50%; " :suffix-icon="changeIcon()" ></el-input>
            </el-form-item>
            <div class="bg-white">
            </div>
            <el-form-item >
            <div v-html="captcha.img" class="bg-white h-100" style="width: 50%" ref="captcha" @click="fetchCaptcha">
            </div>
        </el-form-item>
            <div>
                <span>
                    看不清？
                    <strong class="text-primary">点击更换</strong>
                </span>
            </div>
            <el-form-item class="text-center m-3">
                <el-button type="primary" native-type="submit">登录</el-button>
                <router-link to='/vip/register' type="primary" tag="button" style="margin-left:2rem;
                          background-color: rgba(49, 54, 51, 0.3);
                          border-radius: 0.6rem">注册</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model:{},
                captcha: {},
                localCaptcha:'',
                control:false
            }
        },
        methods: {
            async login() {
                //  let res
                if(this.control===true){
             const res= await this.$http.post('vip/login', this.model)
             console.log(res.data)
                localStorage.id=res.data.id
                localStorage.token=res.data.token
                await this.$http.post(`person/create/${localStorage.id}`)
                this.$router.push('/')
                this.$message({
                    type: "success",
                    message: '登录成功'
                })
            }
            },
            async fetchCaptcha(){
                const res = await this.$http.get('vip/captcha')
                console.log(res.data)
                this.captcha=res.data
            },
            //验证是否通过图标
            changeIcon(){
              if(this.localCaptcha===this.captcha.text){
                this.control=true
                  return 'iconfont icon-yanzheng '
              }else{
                  return 'iconfont icon-yanzhengshibai'
              }
            }
        },
        created() {
            this.fetchCaptcha()
        },
    }
</script>
<style>
    .icon-yanzhengshibai{
        color: red;
    }
    .icon-yanzheng{
        color: rgb(68, 223, 89)
    }
</style>