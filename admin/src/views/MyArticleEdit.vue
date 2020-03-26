<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <!--有id显示编辑，没有显示新建 -->
    <el-form @submit.native.prevent="save" label-width="120px">
      <!--表单 -->
      <el-form-item label="文章类型">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { VueEditor } from "vue2-editor";
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
        categories: []
      }
    },
    components: {
      VueEditor
    },
    methods: {
      async save() {
        //  let res
        if (this.id) {
          await this.$http.put(`rest/myArticles/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/myArticles', this.model)
        }
        this.$router.push('/myarticles/list')
        this.$message({
          type: "success",
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/myArticles/${this.id}`)//get到一个对象
        this.model = res.data
      },
      async fetchCategories() {
        const res = await this.$http.get(`rest/categories`)//get到一些对象，将它们存到数组中，再取出使用
        this.categories = res.data
      },
      //富文本编辑器中图片上传
      handleImageAdded: async function (file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('upload', formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);//cursorLocation光标位置，在文本编辑器选择的位置插入图片，图片是图片地址
        resetUploader();
        // axios({
        //   url: "https://fakeapi.yoursite.com/images",
        //   method: "POST",
        //   data: formData
        // })
        //   .then(result => {
        //     let url = result.data.url; // Get url from response
        //     Editor.insertEmbed(cursorLocation, "image", url);
        //     resetUploader();
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }
    },
    created() {
      this.fetchCategories()
      this.id && this.fetch()  //前面条件满足后执行后面语句
    }

  }

</script>