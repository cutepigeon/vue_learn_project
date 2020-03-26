<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <!--有id显示编辑，没有显示新建 -->
    <el-form @submit.native.prevent="save">
      <!--表单 -->
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
        parents: []
      }
    },
    methods: {
      async save() {
        //  let res
        if (this.id) {
          await this.$http.put(`rest/admin_users/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/admin_users', this.model)
        }
        this.$router.push('/admin_users/list')
        this.$message({
          type: "success",
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/admin_users/${this.id}`)//get到一个对象
        this.model = res.data
      },
    },
    created() {
      this.id && this.fetch()  //前面条件满足后执行后面语句
    }

  }

</script>