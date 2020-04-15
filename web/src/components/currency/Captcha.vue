<template>
    <div>
        <el-form-item class="d-flex" label="验证码">
            <el-input type="password" v-model='localCaptcha' style="width: 50%; " :suffix-icon="changeIcon()"></el-input>
        </el-form-item>
        <div class="bg-white">
        </div>
        <el-form-item>
            <div v-html="captcha.img" class="bg-white h-100" style="width: 50%" ref="captcha" @click="fetchCaptcha">
            </div>
        </el-form-item>
        <div>
            <span>
                看不清？
                <strong class="text-primary">点击更换</strong>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                captcha: {},
                localCaptcha:'',
                control:true
            }
        },
        methods: {
            async fetchCaptcha() {
                const res = await this.$http.get('vip/captcha')
                console.log(res.data)
                this.captcha = res.data
            },
            //验证是否通过图标
            changeIcon() {
                if (this.localCaptcha === this.captcha.text) {
                    return 'iconfont icon-yanzheng '
                } else {
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
    .icon-yanzhengshibai {
        color: red;
    }

    .icon-yanzheng {
        color: rgb(68, 223, 89)
    }
</style>