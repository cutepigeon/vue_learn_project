<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <!--有id显示编辑，没有显示新建 -->
    <el-form @submit.native.prevent="save" label-width="120px">
      <!--表单 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button size="small" type="text" @click="model.items.push({})">
        <i class="el-icon-plus"></i> 添加广告 </el-button>
      <el-row type="flex" style="flex-wrap: wrap">
        <!--flex-wrap让弹性盒元素在必要的时候拆行-->
        <el-col :md="24" v-for="(item,i) in model.items" :key="i">
          <el-form-item label="跳转链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="广告图" style="margin-top: 0.5rem">
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+'/upload'" :show-file-list="false" :on-success="res=>$set(item,'image',res.url)">
              <img v-if="item.image" :src="item.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" @click="model.items.splice(i,1)">删除</el-button>
            <!--删除，传入参数1为位置，2为个数-->
          </el-form-item>
        </el-col>
      </el-row>

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
        model: {
          items: []
        },
      }
    },
    methods: {
      async save() {
        //  let res
        if (this.id) {
          await this.$http.put(`rest/ads/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/ads', this.model)
        }
        this.$router.push('/ads/list')
        this.$message({
          type: "success",
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/ads/${this.id}`)//get到一个对象
        this.model = Object.assign({}, this.model, res.data)
      },

    },
    created() {
      this.id && this.fetch()  //前面条件满足后执行后面语句
    }

  }

</script>